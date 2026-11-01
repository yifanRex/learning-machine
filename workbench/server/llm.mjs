import { spawn } from 'node:child_process';
import { writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir, homedir } from 'node:os';
import { join, delimiter } from 'node:path';
import { randomUUID } from 'node:crypto';
import { buildTurnPrompt } from './prompts.mjs';

function resolveCliBin(name) {
  const candidates = [
    join(homedir(), '.local', 'bin', name),
    `/opt/homebrew/bin/${name}`,
    `/usr/local/bin/${name}`
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return name;
}

/**
 * Parse raw model output into { reply, briefUpdate }.
 */
export function parseModelOutput(rawText, currentBrief, activeMode) {
  const text = (rawText || '').trim();
  const tagRegex = /<brief_update>([\s\S]*?)<\/brief_update>/i;
  const match = text.match(tagRegex);

  let reply = text;
  let parsedBrief = null;

  if (match) {
    reply = text.replace(tagRegex, '').trim();
    let jsonCandidate = match[1].trim();
    // Strip markdown code fences if the model included them inside <brief_update>
    jsonCandidate = jsonCandidate
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    try {
      parsedBrief = JSON.parse(jsonCandidate);
    } catch {
      // Fallback: find first { and last }
      const firstBrace = jsonCandidate.indexOf('{');
      const lastBrace = jsonCandidate.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        try {
          parsedBrief = JSON.parse(jsonCandidate.slice(firstBrace, lastBrace + 1));
        } catch {
          parsedBrief = null;
        }
      }
    }
  }

  const { mergedBrief, diff } = mergeAndDiffBrief(currentBrief, parsedBrief, activeMode);
  return {
    reply: reply || '（已完成上下文更新）',
    brief: mergedBrief,
    diff
  };
}

/**
 * Safely normalize and diff the previous Brief and the newly returned Brief.
 */
export function mergeAndDiffBrief(oldBrief, newBriefRaw, activeMode) {
  const diff = {
    pendingQuestionChanged: false,
    known: {},
    inferences: {},
    threads: {},
    revisions: {}
  };

  if (!newBriefRaw || typeof newBriefRaw !== 'object') {
    return {
      mergedBrief: { ...oldBrief, mode: activeMode },
      diff
    };
  }

  const normalizeList = (list, prefix, oldList = [], diffMap = {}) => {
    if (!Array.isArray(list)) return oldList;
    const oldById = new Map(oldList.map((item) => [item.id, item]));
    const oldByContent = new Map(oldList.map((item) => [item.content?.trim(), item]));

    return list
      .filter((item) => item && typeof item.content === 'string' && item.content.trim())
      .map((item, idx) => {
        const content = item.content.trim();
        const existingById = item.id ? oldById.get(item.id) : null;
        const existingByContent = oldByContent.get(content);
        const id =
          item.id ||
          existingByContent?.id ||
          `${prefix}_${Date.now().toString(36)}_${idx}`;

        if (!existingById && !existingByContent) {
          diffMap[id] = 'new';
        } else if (
          existingById &&
          (existingById.content?.trim() !== content ||
            existingById.category !== item.category ||
            existingById.basis !== item.basis ||
            existingById.note !== item.note)
        ) {
          diffMap[id] = 'updated';
        }

        const normalized = {
          id,
          content
        };

        if (prefix === 'k') {
          const validCategories = ['fact', 'constraint', 'goal', 'opinion', 'external'];
          normalized.category = validCategories.includes(item.category)
            ? item.category
            : existingById?.category || 'fact';
          if (
            normalized.category === 'opinion' &&
            !/^(用户认为|用户觉得|用户判断|User believes|User thinks)/i.test(normalized.content)
          ) {
            normalized.content = `用户认为：${normalized.content}`;
          }
        } else if (prefix === 'i') {
          normalized.basis = (item.basis || existingById?.basis || '').trim();
        } else if (prefix === 't') {
          normalized.note = (item.note || existingById?.note || '').trim();
        }

        return normalized;
      });
  };

  const known = normalizeList(newBriefRaw.known, 'k', oldBrief.known || [], diff.known);
  const inferences = normalizeList(
    newBriefRaw.inferences,
    'i',
    oldBrief.inferences || [],
    diff.inferences
  );
  const threads = normalizeList(newBriefRaw.threads, 't', oldBrief.threads || [], diff.threads);

  // Revisions are strictly append-only
  const existingRevisions = Array.isArray(oldBrief.revisions) ? [...oldBrief.revisions] : [];
  const existingRevSignatures = new Set(
    existingRevisions.map((r) => `${r.oldUnderstanding}::${r.newUnderstanding}`)
  );

  if (Array.isArray(newBriefRaw.revisions)) {
    for (const rev of newBriefRaw.revisions) {
      if (!rev || (!rev.oldUnderstanding && !rev.from) || (!rev.newUnderstanding && !rev.to)) {
        continue;
      }
      const oldU = (rev.oldUnderstanding || rev.from || '').trim();
      const newU = (rev.newUnderstanding || rev.to || '').trim();
      const reason = (rev.reason || '').trim();
      const sig = `${oldU}::${newU}`;
      if (oldU && newU && !existingRevSignatures.has(sig)) {
        const revId = rev.id && !existingRevisions.some((r) => r.id === rev.id)
          ? rev.id
          : `r_${Date.now().toString(36)}_${existingRevisions.length + 1}`;
        existingRevisions.push({
          id: revId,
          oldUnderstanding: oldU,
          newUnderstanding: newU,
          reason
        });
        existingRevSignatures.add(sig);
        diff.revisions[revId] = 'new';
      }
    }
  }

  const newPending =
    typeof newBriefRaw.pendingQuestion === 'string'
      ? newBriefRaw.pendingQuestion.trim()
      : oldBrief.pendingQuestion;

  if (newPending !== oldBrief.pendingQuestion && newPending) {
    diff.pendingQuestionChanged = true;
  }

  const mergedBrief = {
    topic: (newBriefRaw.topic || oldBrief.topic || '').trim(),
    mode: activeMode,
    entryQuestion: (oldBrief.entryQuestion || newBriefRaw.entryQuestion || '').trim(),
    pendingQuestion: newPending,
    readyToAnswerHint: Boolean(newBriefRaw.readyToAnswerHint),
    known,
    inferences,
    threads,
    revisions: existingRevisions
  };

  return { mergedBrief, diff };
}

/**
 * Run a turn against the configured backend engine:
 * - 'devin': Local Devin CLI (`devin -p --prompt-file ...`)
 * - 'agy': Local Antigravity CLI (`agy -p ...`)
 * - 'openai': OpenAI-compatible HTTP API (`/v1/chat/completions`)
 */
export async function executeTurn({
  mode,
  brief,
  messages,
  isInitialTurn,
  settings,
  workdir
}) {
  const fullPrompt = buildTurnPrompt({
    mode,
    brief,
    messages,
    isInitialTurn
  });

  const provider = settings?.provider || 'devin';

  let rawOutput = '';
  if (provider === 'openai') {
    rawOutput = await callOpenAICompatible(fullPrompt, settings);
  } else if (provider === 'agy') {
    rawOutput = await callAgyCli(fullPrompt, settings, workdir);
  } else {
    rawOutput = await callDevinCli(fullPrompt, settings, workdir);
  }

  return parseModelOutput(rawOutput, brief, mode);
}

async function callDevinCli(promptText, settings, workdir) {
  const bin = settings?.devinBin || resolveCliBin('devin');
  const tmpFile = join(tmpdir(), `lm-prompt-${randomUUID()}.txt`);
  await writeFile(tmpFile, promptText, { encoding: 'utf8', mode: 0o600 });

  const args = [
    '--respect-workspace-trust',
    'false',
    '--permission-mode',
    'auto',
    '--verbosity',
    '0',
    '--prompt-file',
    tmpFile,
    '-p'
  ];

  if (settings?.cliModel && settings.cliModel.trim()) {
    args.unshift('--model', settings.cliModel.trim());
  }

  try {
    return await spawnAndCollect(bin, args, { cwd: workdir });
  } finally {
    await unlink(tmpFile).catch(() => {});
  }
}

async function callAgyCli(promptText, settings, workdir) {
  const bin = settings?.agyBin || resolveCliBin('agy');
  const args = ['--disable-slash-commands'];
  if (settings?.agyModel && settings.agyModel.trim()) {
    args.push('--model', settings.agyModel.trim());
  }
  args.push('-p', promptText);

  return await spawnAndCollect(bin, args, { cwd: workdir });
}

async function callOpenAICompatible(promptText, settings) {
  const baseUrl = (settings?.openaiBaseUrl || 'https://api.openai.com/v1').replace(/\/+$/, '');
  const apiKey = (settings?.openaiApiKey || process.env.OPENAI_API_KEY || '').trim();
  const model = (settings?.openaiModel || 'gpt-4o').trim();

  if (!apiKey) {
    throw new Error('未配置 OpenAI 兼容接口的 API Key。请在右上角“引擎设置”中填写 API Key，或切换为本地 Devin CLI 模式。');
  }

  const endpoint = baseUrl.endsWith('/chat/completions')
    ? baseUrl
    : `${baseUrl}/chat/completions`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.5,
      messages: [
        {
          role: 'user',
          content: promptText
        }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`OpenAI 接口返回错误 (${response.status}): ${errText.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI 接口未返回有效内容。');
  }
  return content;
}

function spawnAndCollect(bin, args, options = {}) {
  return new Promise((resolve, reject) => {
    const extraPath = join(homedir(), '.local', 'bin');
    const currentPath = process.env.PATH || '';
    const mergedPath = currentPath.includes(extraPath)
      ? currentPath
      : `${extraPath}${delimiter}${currentPath}`;

    const child = spawn(bin, args, {
      cwd: options.cwd || process.cwd(),
      env: { ...process.env, PATH: mergedPath, NO_COLOR: '1' },
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    const timeout = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error(`调用本地 CLI (${bin}) 超时（180s）`));
    }, 180_000);

    child.on('error', (err) => {
      clearTimeout(timeout);
      reject(new Error(`无法启动本地 CLI (${bin}): ${err.message}`));
    });

    child.on('close', (code) => {
      clearTimeout(timeout);
      if (code !== 0 && !stdout.trim()) {
        reject(
          new Error(
            `本地 CLI (${bin}) 执行失败 (exit ${code}): ${(stderr || '未知错误').trim()}`
          )
        );
        return;
      }
      resolve(stdout.trim());
    });
  });
}
