import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { createInitialBrief, briefToMarkdown } from './prompts.mjs';
import { executeTurn } from './llm.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKBENCH_DIR = join(__dirname, '..');
const ROOT_DIR = join(WORKBENCH_DIR, '..');
const PUBLIC_DIR = join(WORKBENCH_DIR, 'public');
const STORAGE_DIR = join(ROOT_DIR, '.learning-machine');
const SESSIONS_DIR = join(STORAGE_DIR, 'sessions');
const SETTINGS_FILE = join(STORAGE_DIR, 'settings.json');

const PORT = Number(process.env.PORT || 3456);

const DEFAULT_SETTINGS = {
  provider: 'devin', // 'devin' | 'agy' | 'openai'
  cliModel: '',
  agyModel: '',
  openaiBaseUrl: 'https://api.openai.com/v1',
  openaiApiKey: '',
  openaiModel: 'gpt-4o'
};

async function ensureDirectories() {
  await mkdir(SESSIONS_DIR, { recursive: true, mode: 0o700 });
}

function safeSlug(text) {
  const cleaned = (text || 'topic')
    .trim()
    .replace(/[\\/:*?"<>|\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return cleaned || 'session';
}

function todayDateStr() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function loadSettings() {
  try {
    if (!existsSync(SETTINGS_FILE)) {
      return { ...DEFAULT_SETTINGS };
    }
    const raw = await readFile(SETTINGS_FILE, 'utf8');
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

async function saveSettings(newSettings) {
  await ensureDirectories();
  const current = await loadSettings();
  const merged = { ...current, ...newSettings };
  await writeFile(SETTINGS_FILE, JSON.stringify(merged, null, 2), { encoding: 'utf8', mode: 0o600 });
  return merged;
}

function assertValidSessionId(sessionId) {
  if (typeof sessionId !== 'string' || !/^[a-zA-Z0-9_-]{1,64}$/.test(sessionId)) {
    throw new Error('Invalid session ID');
  }
}

async function saveSession(session) {
  await ensureDirectories();
  assertValidSessionId(session.id);
  session.updatedAt = new Date().toISOString();

  // 1. Save structured session state in .learning-machine/sessions/<id>.json
  const sessionFilePath = join(SESSIONS_DIR, `${session.id}.json`);
  await writeFile(sessionFilePath, JSON.stringify(session, null, 2), { encoding: 'utf8', mode: 0o600 });

  // 2. Also write the canonical Markdown Brief in .learning-machine/<topic>-<YYYY-MM-DD>.md
  if (session.markdownFileName) {
    const mdPath = join(STORAGE_DIR, session.markdownFileName);
    const mdContent = briefToMarkdown(session.brief);
    await writeFile(mdPath, mdContent, { encoding: 'utf8', mode: 0o600 });
  }

  return session;
}

async function loadSession(sessionId) {
  assertValidSessionId(sessionId);
  const sessionFilePath = join(SESSIONS_DIR, `${sessionId}.json`);
  const raw = await readFile(sessionFilePath, 'utf8');
  return JSON.parse(raw);
}

async function listSessions() {
  await ensureDirectories();
  const files = await readdir(SESSIONS_DIR);
  const sessions = [];
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    try {
      const raw = await readFile(join(SESSIONS_DIR, file), 'utf8');
      const data = JSON.parse(raw);
      sessions.push({
        id: data.id,
        topic: data.brief?.topic || '未命名主题',
        mode: data.brief?.mode || 'learn',
        entryQuestion: data.brief?.entryQuestion || '',
        messageCount: Array.isArray(data.messages) ? data.messages.length : 0,
        knownCount: Array.isArray(data.brief?.known) ? data.brief.known.length : 0,
        markdownFileName: data.markdownFileName || '',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      });
    } catch {
      // ignore malformed file
    }
  }
  sessions.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  return sessions;
}

/**
 * Detect explicit mode-switch intent in natural text when not negated or quoted,
 * matching SKILL.md Section 2.
 */
function detectNaturalModeSwitch(currentMode, text) {
  const t = (text || '').trim();
  if (!t) return null;
  // Ignore if negated
  if (/(don't|do not|not yet|先别|不要|别|不用|稍后)/i.test(t)) {
    return null;
  }
  if (currentMode === 'learn') {
    if (/^(answer now|开始回答|直接回答|现在回答)$/i.test(t)) {
      return 'learned';
    }
  } else if (currentMode === 'learned') {
    if (/^(ask me|继续问我|继续提问|回到提问)$/i.test(t)) {
      return 'learn';
    }
  }
  return null;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

function isLoopbackAddress(addr) {
  return addr === '127.0.0.1' || addr === '::1' || addr === '::ffff:127.0.0.1';
}

function isAllowedLocalHostHeader(hostHeader) {
  if (!hostHeader) return false;
  return /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(hostHeader.trim());
}

const server = createServer(async (req, res) => {
  try {
    // 1. Enforce loopback-only client IP (never expose to external LAN peers)
    if (!isLoopbackAddress(req.socket.remoteAddress)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden: Localhost access only');
      return;
    }

    // 2. Prevent DNS rebinding via Host header validation
    if (!isAllowedLocalHostHeader(req.headers.host)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden: Invalid Host header');
      return;
    }

    // 3. Prevent cross-origin CSRF on mutating API calls
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.headers.origin) {
      try {
        const originUrl = new URL(req.headers.origin);
        if (!isAllowedLocalHostHeader(originUrl.host)) {
          return sendJson(res, 403, { error: 'Forbidden cross-origin request' });
        }
      } catch {
        return sendJson(res, 403, { error: 'Invalid Origin header' });
      }
    }

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    // API Routes
    if (pathname === '/api/settings' && req.method === 'GET') {
      const settings = await loadSettings();
      return sendJson(res, 200, {
        settings: {
          ...settings,
          hasOpenaiKey: Boolean(settings.openaiApiKey),
          openaiApiKey: settings.openaiApiKey ? '••••••••' : ''
        }
      });
    }

    if (pathname === '/api/settings' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const current = await loadSettings();
      const updated = {
        provider: body.provider || current.provider,
        cliModel: typeof body.cliModel === 'string' ? body.cliModel : current.cliModel,
        agyModel: typeof body.agyModel === 'string' ? body.agyModel : current.agyModel,
        openaiBaseUrl: body.openaiBaseUrl || current.openaiBaseUrl,
        openaiModel: body.openaiModel || current.openaiModel,
        openaiApiKey:
          body.openaiApiKey && body.openaiApiKey !== '••••••••'
            ? body.openaiApiKey
            : current.openaiApiKey
      };
      await saveSettings(updated);
      return sendJson(res, 200, {
        settings: {
          ...updated,
          hasOpenaiKey: Boolean(updated.openaiApiKey),
          openaiApiKey: updated.openaiApiKey ? '••••••••' : ''
        }
      });
    }

    // List historical sessions (never auto-loaded into a new session)
    if (pathname === '/api/sessions' && req.method === 'GET') {
      const sessions = await listSessions();
      return sendJson(res, 200, { sessions });
    }

    // Create a brand new isolated session
    if (pathname === '/api/sessions' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const topic = (body.topic || '').trim();
      const entryQuestion = (body.entryQuestion || '').trim();
      if (!topic) {
        return sendJson(res, 400, { error: '请输入探索主题（Topic）' });
      }

      const id = randomUUID().slice(0, 8);
      const dateStr = todayDateStr();
      const slug = safeSlug(topic);
      let markdownFileName = `${slug}-${dateStr}.md`;
      if (existsSync(join(STORAGE_DIR, markdownFileName))) {
        markdownFileName = `${slug}-${dateStr}-${id.slice(0, 4)}.md`;
      }

      const brief = createInitialBrief(topic, entryQuestion);
      const initialUserText = entryQuestion
        ? `我想探讨的主题是「${topic}」。我的初始问题是：${entryQuestion}`
        : `我想探讨的主题是「${topic}」。`;

      const session = {
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        markdownFileName,
        brief,
        lastDiff: {},
        messages: [
          {
            id: `m_${Date.now()}`,
            role: 'user',
            mode: 'learn',
            content: initialUserText,
            timestamp: new Date().toISOString()
          }
        ]
      };

      await saveSession(session);

      // Run initial Learn turn if autoStart !== false
      if (body.autoStart !== false) {
        const settings = await loadSettings();
        const result = await executeTurn({
          mode: 'learn',
          brief: session.brief,
          messages: session.messages,
          isInitialTurn: true,
          settings,
          workdir: ROOT_DIR
        });

        session.brief = result.brief;
        session.lastDiff = result.diff;
        session.messages.push({
          id: `m_${Date.now() + 1}`,
          role: 'assistant',
          mode: 'learn',
          content: result.reply,
          timestamp: new Date().toISOString()
        });
        await saveSession(session);
      }

      return sendJson(res, 200, {
        session,
        markdownPreview: briefToMarkdown(session.brief)
      });
    }

    // Load a specific session by ID (explicit user action)
    const sessionMatch = pathname.match(/^\/api\/sessions\/([^/]+)$/);
    if (sessionMatch && req.method === 'GET') {
      const sessionId = sessionMatch[1];
      const session = await loadSession(sessionId);
      return sendJson(res, 200, {
        session,
        markdownPreview: briefToMarkdown(session.brief)
      });
    }

    // Toggle mode ONLY (no LLM call, as requested: "仅切换状态，发消息再响应")
    const modeMatch = pathname.match(/^\/api\/sessions\/([^/]+)\/mode$/);
    if (modeMatch && req.method === 'POST') {
      const sessionId = modeMatch[1];
      const body = await readJsonBody(req);
      const nextMode = body.mode === 'learned' ? 'learned' : 'learn';

      const session = await loadSession(sessionId);
      session.brief.mode = nextMode;
      if (nextMode === 'learned') {
        session.brief.readyToAnswerHint = false;
      }
      await saveSession(session);

      return sendJson(res, 200, {
        session,
        markdownPreview: briefToMarkdown(session.brief)
      });
    }

    // Update Brief directly from the right-hand structured UI (inline edits, confirm/reject inference, add item)
    const briefMatch = pathname.match(/^\/api\/sessions\/([^/]+)\/brief$/);
    if (briefMatch && req.method === 'PUT') {
      const sessionId = briefMatch[1];
      const body = await readJsonBody(req);
      const session = await loadSession(sessionId);

      if (body.brief && typeof body.brief === 'object') {
        session.brief = {
          ...session.brief,
          ...body.brief,
          mode: body.brief.mode || session.brief.mode
        };
      }
      session.lastDiff = {};
      await saveSession(session);

      return sendJson(res, 200, {
        session,
        markdownPreview: briefToMarkdown(session.brief)
      });
    }

    // Send a chat message in the current mode
    const messageMatch = pathname.match(/^\/api\/sessions\/([^/]+)\/messages$/);
    if (messageMatch && req.method === 'POST') {
      const sessionId = messageMatch[1];
      const body = await readJsonBody(req);
      const content = (body.content || '').trim();
      if (!content) {
        return sendJson(res, 400, { error: '消息内容不能为空' });
      }

      const session = await loadSession(sessionId);

      // Sync any latest client-side brief edits or mode state
      if (body.brief && typeof body.brief === 'object') {
        session.brief = { ...session.brief, ...body.brief };
      }

      let activeMode = body.mode || session.brief.mode || 'learn';
      const naturalSwitch = detectNaturalModeSwitch(activeMode, content);
      if (naturalSwitch) {
        activeMode = naturalSwitch;
      }
      session.brief.mode = activeMode;

      session.messages.push({
        id: `m_${Date.now()}`,
        role: 'user',
        mode: activeMode,
        content,
        timestamp: new Date().toISOString()
      });

      const settings = await loadSettings();
      const result = await executeTurn({
        mode: activeMode,
        brief: session.brief,
        messages: session.messages,
        isInitialTurn: session.messages.length === 1,
        settings,
        workdir: ROOT_DIR
      });

      session.brief = result.brief;
      session.lastDiff = result.diff;
      session.messages.push({
        id: `m_${Date.now() + 1}`,
        role: 'assistant',
        mode: activeMode,
        content: result.reply,
        timestamp: new Date().toISOString()
      });

      await saveSession(session);

      return sendJson(res, 200, {
        session,
        markdownPreview: briefToMarkdown(session.brief)
      });
    }

    // Serve static files from public/
    const filePath = pathname === '/' ? join(PUBLIC_DIR, 'index.html') : join(PUBLIC_DIR, pathname);
    if (!filePath.startsWith(PUBLIC_DIR) || !existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const fileContent = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(fileContent);
  } catch (err) {
    console.error('[Server Error]', err);
    sendJson(res, 500, {
      error: err.message || '服务器内部错误'
    });
  }
});

function openBrowser(url) {
  if (process.env.NO_OPEN === '1' || process.env.CI) return;
  try {
    const cmd =
      process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
        ? 'cmd'
        : 'xdg-open';
    const args = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
    const child = spawn(cmd, args, { stdio: 'ignore', detached: true });
    child.unref();
  } catch {
    // ignore if browser auto-open is unavailable
  }
}

const BIND_HOST = process.env.HOST || '127.0.0.1';
let activePort = PORT;
const MAX_PORT = PORT + 10;

server.on('error', async (err) => {
  if (err.code === 'EADDRINUSE') {
    // Check if an existing Learning Machine Workbench is already running on this port
    try {
      const res = await fetch(`http://127.0.0.1:${activePort}/api/settings`);
      const data = await res.json();
      if (data && data.settings) {
        const url = `http://127.0.0.1:${activePort}`;
        console.log(`Learning Machine Workbench is already running at ${url}`);
        openBrowser(url);
        process.exit(0);
      }
    } catch {
      // Occupied by a different process; try the next port
    }

    if (activePort < MAX_PORT) {
      activePort += 1;
      server.listen(activePort, BIND_HOST);
      return;
    }
  }
  console.error('[Server Fatal]', err);
  process.exit(1);
});

server.listen(activePort, BIND_HOST, () => {
  const url = `http://127.0.0.1:${activePort}`;
  console.log(`Learning Machine Workbench running (loopback-only) at:`);
  console.log(`  -> ${url}`);
  openBrowser(url);
});
