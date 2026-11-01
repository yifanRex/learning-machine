const I18N = {
  zh: {
    newTopic: '新话题',
    archive: '归档',
    readyBadge: '就绪',
    enginePrefix: '引擎',
    startTitle: 'New Topic / Thought / Mind',
    startKicker: '新主题 · 思绪 · 心智',
    topicLabel: '主题 / TOPIC',
    entryQuestionLabel: '初始问题 / QUESTION',
    optionalMark: 'OPTIONAL · 可选',
    topicPlaceholder: '例如：个人投资配置 / 消息队列架构选型 / 独立产品冷启动',
    entryPlaceholder: '从一个问题开始这段旅途，或留白直接出发…',
    presetHeading: '常见主题 / TOPICS',
    preset1: '个人资产配置',
    preset2: '系统架构设计',
    preset3: '产品方向与策略',
    preset4: '研究课题梳理',
    startBtn: '开始 / START',
    startingBtn: '正在准备…',
    quickFillHint: '带入待解问题：',
    sendBtn: '发送',
    statKnownLabel: '已知',
    statInfLabel: '推测',
    statThreadLabel: '线索',
    sec1Title: '主题与问题',
    sec2Title: '已知',
    sec3Title: '推测',
    sec4Title: '待探索线索',
    sec5Title: '修正记录',
    reframedBadge: '已更新',
    qTopic: '主题',
    qEntry: '初始问题',
    qPending: '当前核心问题',
    editBtn: '编辑',
    addBtn: '新增',
    saveBtn: '保存',
    cancelBtn: '取消',
    confirmBtn: '确认',
    rejectBtn: '否定',
    discussBtn: '展开',
    catFact: '事实/处境',
    catConstraint: '硬约束/排除',
    catGoal: '目标/偏好',
    catOpinion: '用户观点',
    catExternal: '外部查证',
    addKnownPlaceholder: '添加已知信息、约束或观点…',
    settingsTitle: '模型引擎配置',
    providerSelectLabel: '调用方式 / PROVIDER',
    devinDesc: '本机非交互直连 (devin -p)，免配 API Key。',
    openaiDesc: '兼容 OpenAI / DeepSeek / OpenRouter / Ollama 等接口。',
    agyDesc: '调用本机 agy -p 返回对话结果。',
    cliModelLabel: '选择模型 / MODEL',
    agyModelLabel: '选择模型 / MODEL',
    openaiModelLabel: '选择模型 / MODEL',
    defaultCliModel: 'Default (跟随 CLI 默认模型)',
    copyMdBtn: '复制 Markdown',
    copiedMdBtn: '已复制',
    historyTitle: '归档会话 / ARCHIVE',
    historyHint: '新建话题不会自动读取旧档，仅在你主动选择时载入。',
    loadSessionBtn: '载入',
    noActiveSession: 'NO ACTIVE SESSION',
    entryNone: '未指定初始问题',
    pendingNone: '待定',
    emptyKnown: '暂无记录',
    emptyInferences: '暂无记录',
    emptyThreads: '暂无记录',
    emptyRevisions: '暂无记录',
    emptyHistory: '暂无归档会话。',
    basisPrefix: '依据：',
    reasonPrefix: '原因：',
    modeStatusLearn: 'LEARN',
    modeStatusLearned: 'LEARNED',
    inputPlaceholderLearn: '输入你的想法或补充信息… (Enter 发送，Shift+Enter 换行)',
    inputPlaceholderLearned: '输入你的问题… (Enter 发送，Shift+Enter 换行)',
    dividerToLearned: 'LEARNED',
    dividerToLearn: 'LEARN',
    loadingLearn: '思考中…',
    loadingLearned: '生成回答中…'
  },
  en: {
    newTopic: 'New Topic',
    archive: 'Archive',
    readyBadge: 'READY',
    enginePrefix: 'Engine',
    startTitle: 'New Topic / Thought / Mind',
    startKicker: 'INQUIRY · DIALOGUE · CLARITY',
    topicLabel: 'TOPIC',
    entryQuestionLabel: 'QUESTION',
    optionalMark: 'OPTIONAL',
    topicPlaceholder: 'e.g., Personal Portfolio Allocation / Queue Architecture / Indie Launch',
    entryPlaceholder: 'Begin the journey with a question, or leave blank to set off…',
    presetHeading: 'TOPICS',
    preset1: 'Asset Allocation',
    preset2: 'System Architecture',
    preset3: 'Product Strategy',
    preset4: 'Research Framing',
    startBtn: 'START',
    startingBtn: 'Starting…',
    quickFillHint: 'Insert pending question:',
    sendBtn: 'SEND',
    statKnownLabel: 'KNOWN',
    statInfLabel: 'INFER',
    statThreadLabel: 'THREADS',
    sec1Title: 'Topic & Question',
    sec2Title: 'Known',
    sec3Title: 'Inferences',
    sec4Title: 'Threads',
    sec5Title: 'Revisions',
    reframedBadge: 'UPDATED',
    qTopic: 'TOPIC',
    qEntry: 'INITIAL QUESTION',
    qPending: 'CORE QUESTION',
    editBtn: 'Edit',
    addBtn: 'Add',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',
    confirmBtn: 'Confirm',
    rejectBtn: 'Reject',
    discussBtn: 'Expand',
    catFact: 'Fact',
    catConstraint: 'Constraint',
    catGoal: 'Goal',
    catOpinion: 'Opinion',
    catExternal: 'Verified',
    addKnownPlaceholder: 'Add fact, constraint, or opinion…',
    settingsTitle: 'Engine Configuration',
    providerSelectLabel: 'PROVIDER',
    devinDesc: 'Local non-interactive Devin CLI (devin -p), zero API key setup.',
    openaiDesc: 'Compatible with OpenAI / DeepSeek / OpenRouter / Ollama.',
    agyDesc: 'Local Antigravity CLI (agy -p).',
    cliModelLabel: 'MODEL',
    agyModelLabel: 'MODEL',
    openaiModelLabel: 'MODEL',
    defaultCliModel: 'Default (Use CLI configured model)',
    copyMdBtn: 'Copy Markdown',
    copiedMdBtn: 'Copied',
    historyTitle: 'ARCHIVE',
    historyHint: 'New topics start clean unless a prior session is loaded here.',
    loadSessionBtn: 'Load',
    noActiveSession: 'NO ACTIVE SESSION',
    entryNone: 'None',
    pendingNone: 'Pending',
    emptyKnown: 'None',
    emptyInferences: 'None',
    emptyThreads: 'None',
    emptyRevisions: 'None',
    emptyHistory: 'No archived sessions.',
    basisPrefix: 'Basis: ',
    reasonPrefix: 'Reason: ',
    modeStatusLearn: 'LEARN',
    modeStatusLearned: 'LEARNED',
    inputPlaceholderLearn: 'Type your response or context… (Enter to send, Shift+Enter for newline)',
    inputPlaceholderLearned: 'Ask a question… (Enter to send, Shift+Enter for newline)',
    dividerToLearned: 'LEARNED',
    dividerToLearn: 'LEARN',
    loadingLearn: 'Thinking…',
    loadingLearned: 'Generating response…'
  }
};

const state = {
  lang: localStorage.getItem('lm_lang') || 'zh',
  theme: localStorage.getItem('lm_theme') || 'light',
  inputExpanded: false,
  session: null,
  markdownPreview: '',
  settings: {
    provider: 'devin',
    cliModel: '',
    agyModel: '',
    openaiBaseUrl: 'https://api.openai.com/v1',
    openaiApiKey: '',
    openaiModel: 'gpt-4o'
  },
  sessionsList: [],
  loading: false
};

function t(key) {
  return I18N[state.lang]?.[key] ?? I18N.zh[key] ?? key;
}

const el = {
  btnNewSession: document.getElementById('btnNewSession'),
  btnHistory: document.getElementById('btnHistory'),
  sessionCountBadge: document.getElementById('sessionCountBadge'),
  btnModeLearn: document.getElementById('btnModeLearn'),
  btnModeLearned: document.getElementById('btnModeLearned'),
  readyHintBadge: document.getElementById('readyHintBadge'),
  btnMarkdownModal: document.getElementById('btnMarkdownModal'),
  btnSettingsModal: document.getElementById('btnSettingsModal'),
  currentProviderLabel: document.getElementById('currentProviderLabel'),
  btnLangToggle: document.getElementById('btnLangToggle'),
  langLabelZh: document.getElementById('langLabelZh'),
  langLabelEn: document.getElementById('langLabelEn'),
  btnThemeToggle: document.getElementById('btnThemeToggle'),

  startSessionView: document.getElementById('startSessionView'),
  startSessionForm: document.getElementById('startSessionForm'),
  inputTopic: document.getElementById('inputTopic'),
  inputEntryQuestion: document.getElementById('inputEntryQuestion'),
  btnStartSubmit: document.getElementById('btnStartSubmit'),

  chatMessages: document.getElementById('chatMessages'),
  chatComposerWrap: document.getElementById('chatComposerWrap'),
  learnedQuickPromptBar: document.getElementById('learnedQuickPromptBar'),
  btnFillPendingQuestion: document.getElementById('btnFillPendingQuestion'),
  fillPendingText: document.getElementById('fillPendingText'),
  chatForm: document.getElementById('chatForm'),
  btnExpandInput: document.getElementById('btnExpandInput'),
  iconExpand: document.getElementById('iconExpand'),
  iconCollapse: document.getElementById('iconCollapse'),
  chatInput: document.getElementById('chatInput'),
  composerGeoMark: document.getElementById('composerGeoMark'),
  composerModeTag: document.getElementById('composerModeTag'),
  btnSendChat: document.getElementById('btnSendChat'),

  briefFilePath: document.getElementById('briefFilePath'),
  statKnown: document.getElementById('statKnown'),
  statInferences: document.getElementById('statInferences'),
  statThreads: document.getElementById('statThreads'),
  badgeQuestionChanged: document.getElementById('badgeQuestionChanged'),
  briefTopicText: document.getElementById('briefTopicText'),
  briefEntryQuestionText: document.getElementById('briefEntryQuestionText'),
  briefPendingQuestionText: document.getElementById('briefPendingQuestionText'),
  btnEditPendingQuestion: document.getElementById('btnEditPendingQuestion'),

  btnToggleAddKnown: document.getElementById('btnToggleAddKnown'),
  formAddKnown: document.getElementById('formAddKnown'),
  selectKnownCategory: document.getElementById('selectKnownCategory'),
  inputKnownContent: document.getElementById('inputKnownContent'),
  listKnown: document.getElementById('listKnown'),
  listInferences: document.getElementById('listInferences'),
  listThreads: document.getElementById('listThreads'),
  listRevisions: document.getElementById('listRevisions'),

  modalSettings: document.getElementById('modalSettings'),
  btnCloseSettings: document.getElementById('btnCloseSettings'),
  btnCancelSettings: document.getElementById('btnCancelSettings'),
  formSettings: document.getElementById('formSettings'),
  sectionDevinConfig: document.getElementById('sectionDevinConfig'),
  sectionAgyConfig: document.getElementById('sectionAgyConfig'),
  sectionOpenaiConfig: document.getElementById('sectionOpenaiConfig'),
  inputCliModel: document.getElementById('inputCliModel'),
  inputAgyModel: document.getElementById('inputAgyModel'),
  inputOpenaiBaseUrl: document.getElementById('inputOpenaiBaseUrl'),
  inputOpenaiApiKey: document.getElementById('inputOpenaiApiKey'),
  inputOpenaiModel: document.getElementById('inputOpenaiModel'),

  modalMarkdown: document.getElementById('modalMarkdown'),
  btnCloseMarkdown: document.getElementById('btnCloseMarkdown'),
  markdownPreviewContent: document.getElementById('markdownPreviewContent'),
  btnCopyMarkdown: document.getElementById('btnCopyMarkdown'),

  modalHistory: document.getElementById('modalHistory'),
  btnCloseHistory: document.getElementById('btnCloseHistory'),
  historySessionList: document.getElementById('historySessionList')
};

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSimpleMarkdown(text) {
  const escaped = escapeHtml(text);
  let html = escaped.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const paragraphs = html.split(/\n{2,}/);
  return paragraphs
    .map((block) => {
      const lines = block.trim().split('\n');
      if (lines.every((l) => /^[-*]\s+/.test(l.trim()))) {
        const lis = lines.map((l) => `<li>${l.trim().replace(/^[-*]\s+/, '')}</li>`).join('');
        return `<ul>${lis}</ul>`;
      }
      if (lines.every((l) => /^\d+\.\s+/.test(l.trim()))) {
        const lis = lines.map((l) => `<li>${l.trim().replace(/^\d+\.\s+/, '')}</li>`).join('');
        return `<ol>${lis}</ol>`;
      }
      return `<p>${lines.join('<br/>')}</p>`;
    })
    .join('');
}

async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

function applyThemeAndLang() {
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.setAttribute('lang', state.lang === 'en' ? 'en' : 'zh-CN');

  el.langLabelZh.classList.toggle('active', state.lang === 'zh');
  el.langLabelEn.classList.toggle('active', state.lang === 'en');

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (key) node.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    const key = node.getAttribute('data-i18n-placeholder');
    if (key) node.setAttribute('placeholder', t(key));
  });
}

function renderProviderLabel() {
  const map = {
    devin: 'Devin CLI',
    agy: 'Agy CLI',
    openai: 'OpenAI API'
  };
  const p = state.settings.provider || 'devin';
  const base = map[p] || 'Devin CLI';
  const model =
    p === 'devin'
      ? state.settings.cliModel
      : p === 'agy'
      ? state.settings.agyModel
      : state.settings.openaiModel;
  el.currentProviderLabel.textContent = model ? `${base} · ${model}` : base;
}

function renderModeUI() {
  const mode = state.session?.brief?.mode || 'learn';
  const isLearned = mode === 'learned';

  el.btnModeLearn.classList.toggle('active-learn', !isLearned);
  el.btnModeLearned.classList.toggle('active-learned', isLearned);

  const showHint = !isLearned && Boolean(state.session?.brief?.readyToAnswerHint);
  el.readyHintBadge.classList.toggle('hidden', !showHint);

  if (isLearned) {
    el.chatInput.placeholder = t('inputPlaceholderLearned');
    el.composerModeTag.textContent = t('modeStatusLearned');
    el.composerGeoMark.className = 'geo-prim geo-circle';
    el.composerGeoMark.style.background = 'var(--sup-ultramarine)';
  } else {
    el.chatInput.placeholder = t('inputPlaceholderLearn');
    el.composerModeTag.textContent = t('modeStatusLearn');
    el.composerGeoMark.className = 'geo-prim geo-square';
    el.composerGeoMark.style.background = 'var(--sup-vermilion)';
  }

  const pendingQ = state.session?.brief?.pendingQuestion || state.session?.brief?.entryQuestion || '';
  if (isLearned && pendingQ && state.session) {
    el.learnedQuickPromptBar.classList.remove('hidden');
    el.fillPendingText.textContent = `${pendingQ.slice(0, 36)}${pendingQ.length > 36 ? '…' : ''}`;
  } else {
    el.learnedQuickPromptBar.classList.add('hidden');
  }
}

function renderChat() {
  if (!state.session) {
    el.startSessionView.classList.remove('hidden');
    el.chatMessages.classList.add('hidden');
    el.chatComposerWrap.classList.add('hidden');
    return;
  }

  el.startSessionView.classList.add('hidden');
  el.chatMessages.classList.remove('hidden');
  el.chatComposerWrap.classList.remove('hidden');

  const messages = state.session.messages || [];
  const htmlParts = [];
  let prevMode = null;

  for (const msg of messages) {
    if (prevMode && msg.mode && msg.mode !== prevMode) {
      const switchText = msg.mode === 'learned' ? t('dividerToLearned') : t('dividerToLearn');
      htmlParts.push(`<div class="mode-divider">${escapeHtml(switchText)}</div>`);
    }
    prevMode = msg.mode || prevMode;

    const isUser = msg.role === 'user';
    htmlParts.push(`
      <article class="turn-item ${isUser ? 'turn-user' : 'turn-assistant'}">
        <div class="turn-prose">
          ${renderSimpleMarkdown(msg.content)}
        </div>
      </article>
    `);
  }

  if (state.loading) {
    const activeMode = state.session.brief?.mode || 'learn';
    const loadingText = activeMode === 'learned' ? t('loadingLearned') : t('loadingLearn');
    htmlParts.push(`
      <article class="turn-item turn-assistant">
        <div class="loading-indicator">
          <span class="loading-sq" aria-hidden="true"></span>
          <span>${escapeHtml(loadingText)}</span>
        </div>
      </article>
    `);
  }

  el.chatMessages.innerHTML = htmlParts.join('');
  el.chatMessages.scrollTop = el.chatMessages.scrollHeight;
}

function getCategoryMeta(cat) {
  const map = {
    fact: { label: t('catFact'), bar: 'bar-ultramarine' },
    constraint: { label: t('catConstraint'), bar: 'bar-vermilion' },
    goal: { label: t('catGoal'), bar: 'bar-ultramarine' },
    opinion: { label: t('catOpinion'), bar: 'bar-ochre' },
    external: { label: t('catExternal'), bar: 'bar-ink' }
  };
  return map[cat] || map.fact;
}

function renderBrief() {
  const brief = state.session?.brief;
  const diff = state.session?.lastDiff || {};

  if (!brief) {
    el.briefFilePath.textContent = t('noActiveSession');
    el.statKnown.textContent = '0';
    el.statInferences.textContent = '0';
    el.statThreads.textContent = '0';
    el.briefTopicText.textContent = '—';
    el.briefTopicText.classList.add('muted');
    el.briefEntryQuestionText.textContent = '—';
    el.briefEntryQuestionText.classList.add('muted');
    el.briefPendingQuestionText.textContent = '—';
    el.briefPendingQuestionText.classList.add('muted');
    el.btnEditPendingQuestion.classList.add('hidden');
    el.btnToggleAddKnown.classList.add('hidden');
    el.listKnown.innerHTML = `<div class="empty-hint">${escapeHtml(t('emptyKnown'))}</div>`;
    el.listInferences.innerHTML = `<div class="empty-hint">${escapeHtml(t('emptyInferences'))}</div>`;
    el.listThreads.innerHTML = `<div class="empty-hint">${escapeHtml(t('emptyThreads'))}</div>`;
    el.listRevisions.innerHTML = `<div class="empty-hint">${escapeHtml(t('emptyRevisions'))}</div>`;
    return;
  }

  el.briefFilePath.textContent = `.learning-machine/${state.session.markdownFileName || ''}`;
  el.statKnown.textContent = String((brief.known || []).length);
  el.statInferences.textContent = String((brief.inferences || []).length);
  el.statThreads.textContent = String((brief.threads || []).length);

  el.btnEditPendingQuestion.classList.remove('hidden');
  el.btnToggleAddKnown.classList.remove('hidden');

  el.badgeQuestionChanged.classList.toggle('hidden', !diff.pendingQuestionChanged);

  el.briefTopicText.textContent = brief.topic || '—';
  el.briefTopicText.classList.remove('muted');

  el.briefEntryQuestionText.textContent = brief.entryQuestion || t('entryNone');
  el.briefEntryQuestionText.classList.toggle('muted', !brief.entryQuestion);

  el.briefPendingQuestionText.textContent = brief.pendingQuestion || t('pendingNone');
  el.briefPendingQuestionText.classList.toggle('muted', !brief.pendingQuestion);

  // 02. Known
  const known = brief.known || [];
  if (!known.length) {
    el.listKnown.innerHTML = `<div class="empty-hint">${escapeHtml(t('emptyKnown'))}</div>`;
  } else {
    el.listKnown.innerHTML = known
      .map((item) => {
        const meta = getCategoryMeta(item.category);
        const itemDiff = diff.known?.[item.id];
        const barCls = itemDiff === 'new' ? 'bar-vermilion' : meta.bar;
        const diffBadge =
          itemDiff === 'new'
            ? '<span class="state-tag tag-vermilion">NEW</span>'
            : itemDiff === 'updated'
            ? '<span class="state-tag tag-ultramarine">UPD</span>'
            : '';

        return `
          <div class="brief-item ${barCls}" data-id="${escapeHtml(item.id)}">
            <div class="item-top">
              <div class="item-main">
                <span class="cat-tag">[${escapeHtml(meta.label)}]</span>
                <span>${escapeHtml(item.content)}</span>
                ${diffBadge}
              </div>
              <div class="item-actions">
                <button type="button" class="act-btn" data-action="edit-known" data-id="${escapeHtml(item.id)}">${escapeHtml(t('editBtn'))}</button>
                <button type="button" class="act-btn act-reject" data-action="delete-known" data-id="${escapeHtml(item.id)}" aria-label="Delete">
                  <svg class="icon-svg-sm" viewBox="0 0 12 12"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // 03. Inferences
  const inferences = brief.inferences || [];
  if (!inferences.length) {
    el.listInferences.innerHTML = `<div class="empty-hint">${escapeHtml(t('emptyInferences'))}</div>`;
  } else {
    el.listInferences.innerHTML = inferences
      .map((item) => {
        return `
          <div class="brief-item bar-ochre">
            <div class="item-top">
              <div class="item-main">
                <span>${escapeHtml(item.content)}</span>
              </div>
              <div class="item-actions">
                <button type="button" class="act-btn act-confirm" data-action="confirm-inference" data-id="${escapeHtml(item.id)}">
                  <svg class="icon-svg-sm" viewBox="0 0 12 12"><path d="M2 6.5l2.5 2.5L10 3" /></svg>
                  <span>${escapeHtml(t('confirmBtn'))}</span>
                </button>
                <button type="button" class="act-btn act-reject" data-action="reject-inference" data-id="${escapeHtml(item.id)}">
                  <svg class="icon-svg-sm" viewBox="0 0 12 12"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" /></svg>
                  <span>${escapeHtml(t('rejectBtn'))}</span>
                </button>
              </div>
            </div>
            ${item.basis ? `<div class="item-sub">${escapeHtml(t('basisPrefix'))}${escapeHtml(item.basis)}</div>` : ''}
          </div>
        `;
      })
      .join('');
  }

  // 04. Threads to Explore
  const threads = brief.threads || [];
  if (!threads.length) {
    el.listThreads.innerHTML = `<div class="empty-hint">${escapeHtml(t('emptyThreads'))}</div>`;
  } else {
    el.listThreads.innerHTML = threads
      .map((item) => {
        return `
          <div class="brief-item bar-ultramarine">
            <div class="item-top">
              <div class="item-main">
                <span>${escapeHtml(item.content)}</span>
              </div>
              <div class="item-actions">
                <button type="button" class="act-btn" data-action="chat-thread" data-id="${escapeHtml(item.id)}">
                  <svg class="icon-svg-sm" viewBox="0 0 12 12"><path d="M2 6h8M7 3l3 3-3 3" /></svg>
                  <span>${escapeHtml(t('discussBtn'))}</span>
                </button>
                <button type="button" class="act-btn act-reject" data-action="delete-thread" data-id="${escapeHtml(item.id)}" aria-label="Delete">
                  <svg class="icon-svg-sm" viewBox="0 0 12 12"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" /></svg>
                </button>
              </div>
            </div>
            ${item.note ? `<div class="item-sub">${escapeHtml(item.note)}</div>` : ''}
          </div>
        `;
      })
      .join('');
  }

  // 05. Revisions
  const revisions = brief.revisions || [];
  if (!revisions.length) {
    el.listRevisions.innerHTML = `<div class="empty-hint">${escapeHtml(t('emptyRevisions'))}</div>`;
  } else {
    el.listRevisions.innerHTML = revisions
      .map((rev) => {
        return `
          <div class="brief-item bar-ink">
            <div class="revision-line">
              <span class="revision-old">${escapeHtml(rev.oldUnderstanding)}</span>
              <span class="revision-sep">→</span>
              <strong>${escapeHtml(rev.newUnderstanding)}</strong>
            </div>
            ${rev.reason ? `<div class="item-sub">${escapeHtml(t('reasonPrefix'))}${escapeHtml(rev.reason)}</div>` : ''}
          </div>
        `;
      })
      .join('');
  }
}

function renderAll() {
  applyThemeAndLang();
  renderProviderLabel();
  renderModeUI();
  renderChat();
  renderBrief();
  el.sessionCountBadge.textContent = String(state.sessionsList.length);
}

// Expand / Collapse Input Pod (60% - 70% height)
el.btnExpandInput.addEventListener('click', () => {
  state.inputExpanded = !state.inputExpanded;
  el.chatComposerWrap.classList.toggle('pod-expanded', state.inputExpanded);
  el.btnExpandInput.setAttribute('aria-expanded', String(state.inputExpanded));
  el.iconExpand.classList.toggle('hidden', state.inputExpanded);
  el.iconCollapse.classList.toggle('hidden', !state.inputExpanded);
  el.chatInput.focus();
});

// Language & Theme Switchers
el.btnLangToggle.addEventListener('click', () => {
  state.lang = state.lang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('lm_lang', state.lang);
  renderAll();
});

el.btnThemeToggle.addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('lm_theme', state.theme);
  renderAll();
});

// Persist client-side Brief edits to server
async function saveBriefToServer(updatedBrief) {
  if (!state.session) return;
  const data = await apiFetch(`/api/sessions/${state.session.id}/brief`, {
    method: 'PUT',
    body: JSON.stringify({ brief: updatedBrief })
  });
  state.session = data.session;
  state.markdownPreview = data.markdownPreview;
  renderAll();
}

// Start Session
el.startSessionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const topic = el.inputTopic.value.trim();
  const entryQuestion = el.inputEntryQuestion.value.trim();
  if (!topic || state.loading) return;

  state.loading = true;
  el.btnStartSubmit.disabled = true;
  el.btnStartSubmit.querySelector('span').textContent = t('startingBtn');

  try {
    const data = await apiFetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({ topic, entryQuestion })
    });
    state.session = data.session;
    state.markdownPreview = data.markdownPreview;
    await refreshSessionsList();
    renderAll();
  } catch (err) {
    alert(err.message);
  } finally {
    state.loading = false;
    el.btnStartSubmit.disabled = false;
    el.btnStartSubmit.querySelector('span').textContent = t('startBtn');
    renderAll();
  }
});

// Specimen preset buttons
document.querySelectorAll('.specimen-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const labelSpan = btn.querySelector('[data-i18n]');
    el.inputTopic.value = (labelSpan ? labelSpan.textContent : btn.dataset.topic || '').trim();
    el.inputEntryQuestion.value = btn.dataset.question || '';
    el.inputTopic.focus();
  });
});

// Mode Switcher (Switch state only, respond on next message)
async function handleModeSwitch(targetMode) {
  if (!state.session) return;
  if (state.session.brief.mode === targetMode) return;

  try {
    const data = await apiFetch(`/api/sessions/${state.session.id}/mode`, {
      method: 'POST',
      body: JSON.stringify({ mode: targetMode })
    });
    state.session = data.session;
    state.markdownPreview = data.markdownPreview;
    renderAll();
    el.chatInput.focus();
  } catch (err) {
    alert(err.message);
  }
}

el.btnModeLearn.addEventListener('click', () => handleModeSwitch('learn'));
el.btnModeLearned.addEventListener('click', () => handleModeSwitch('learned'));

el.btnFillPendingQuestion.addEventListener('click', () => {
  const pendingQ =
    state.session?.brief?.pendingQuestion ||
    state.session?.brief?.entryQuestion ||
    '请结合目前的 Brief 给我一套完整的分析与建议。';
  el.chatInput.value = pendingQ;
  el.chatInput.focus();
});

// Send Chat Message
async function submitChatMessage() {
  if (!state.session || state.loading) return;
  const content = el.chatInput.value.trim();
  if (!content) return;

  el.chatInput.value = '';
  if (state.inputExpanded) {
    state.inputExpanded = false;
    el.chatComposerWrap.classList.remove('pod-expanded');
    el.iconExpand.classList.remove('hidden');
    el.iconCollapse.classList.add('hidden');
  }

  const activeMode = state.session.brief.mode || 'learn';

  state.session.messages.push({
    id: `temp_${Date.now()}`,
    role: 'user',
    mode: activeMode,
    content
  });
  state.loading = true;
  el.btnSendChat.disabled = true;
  renderAll();

  try {
    const data = await apiFetch(`/api/sessions/${state.session.id}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        content,
        mode: activeMode,
        brief: state.session.brief
      })
    });
    state.session = data.session;
    state.markdownPreview = data.markdownPreview;
    await refreshSessionsList();
  } catch (err) {
    state.session.messages.pop();
    el.chatInput.value = content;
    alert(err.message);
  } finally {
    state.loading = false;
    el.btnSendChat.disabled = false;
    renderAll();
    el.chatInput.focus();
  }
}

el.chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitChatMessage();
});

el.chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
    e.preventDefault();
    submitChatMessage();
  }
});

// New Session (Strict Isolation)
el.btnNewSession.addEventListener('click', () => {
  state.session = null;
  state.markdownPreview = '';
  el.inputTopic.value = '';
  el.inputEntryQuestion.value = '';
  renderAll();
});

// Pending Question Edit
el.btnEditPendingQuestion.addEventListener('click', async () => {
  if (!state.session) return;
  const current = state.session.brief.pendingQuestion || '';
  const next = prompt(t('qPending'), current);
  if (next === null) return;
  const brief = structuredClone(state.session.brief);
  brief.pendingQuestion = next.trim();
  await saveBriefToServer(brief);
});

// Add Known Item
el.btnToggleAddKnown.addEventListener('click', () => {
  el.formAddKnown.classList.toggle('hidden');
  if (!el.formAddKnown.classList.contains('hidden')) {
    el.inputKnownContent.focus();
  }
});

el.formAddKnown.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!state.session) return;
  let content = el.inputKnownContent.value.trim();
  const category = el.selectKnownCategory.value;
  if (!content) return;

  if (
    category === 'opinion' &&
    !/^(用户认为|用户觉得|用户判断|User believes)/i.test(content)
  ) {
    content = state.lang === 'en' ? `User believes: ${content}` : `用户认为：${content}`;
  }

  const brief = structuredClone(state.session.brief);
  brief.known.push({
    id: `k_${Date.now().toString(36)}`,
    category,
    content
  });

  el.inputKnownContent.value = '';
  el.formAddKnown.classList.add('hidden');
  await saveBriefToServer(brief);
});

// Delegated Actions in Brief Body
document.getElementById('briefBody').addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn || !state.session) return;

  const action = btn.dataset.action;
  const id = btn.dataset.id;
  const brief = structuredClone(state.session.brief);

  if (action === 'delete-known') {
    brief.known = brief.known.filter((k) => k.id !== id);
    await saveBriefToServer(brief);
  } else if (action === 'edit-known') {
    const target = brief.known.find((k) => k.id === id);
    if (!target) return;
    const next = prompt(t('editBtn'), target.content);
    if (next === null || !next.trim()) return;
    target.content = next.trim();
    await saveBriefToServer(brief);
  } else if (action === 'confirm-inference') {
    const idx = brief.inferences.findIndex((i) => i.id === id);
    if (idx === -1) return;
    const [inf] = brief.inferences.splice(idx, 1);
    brief.known.push({
      id: `k_${Date.now().toString(36)}`,
      category: 'fact',
      content: inf.content
    });
    await saveBriefToServer(brief);
  } else if (action === 'reject-inference') {
    const idx = brief.inferences.findIndex((i) => i.id === id);
    if (idx === -1) return;
    const [inf] = brief.inferences.splice(idx, 1);
    brief.revisions.push({
      id: `r_${Date.now().toString(36)}`,
      oldUnderstanding: inf.content,
      newUnderstanding: state.lang === 'en' ? 'Rejected by user' : '用户明确否定该推测',
      reason: state.lang === 'en' ? 'Manual rejection in Brief panel' : '在右侧 Brief 面板手动否定'
    });
    await saveBriefToServer(brief);
  } else if (action === 'chat-thread') {
    const thread = brief.threads.find((tItem) => tItem.id === id);
    if (!thread) return;
    el.chatInput.value =
      state.lang === 'en'
        ? `Regarding "${thread.content}": `
        : `关于「${thread.content}」，我的情况是：`;
    el.chatInput.focus();
  } else if (action === 'delete-thread') {
    brief.threads = brief.threads.filter((tItem) => tItem.id !== id);
    await saveBriefToServer(brief);
  }
});

// Settings Modal
function syncSettingsFormVisibility() {
  const selected = document.querySelector('input[name="provider"]:checked')?.value || 'devin';
  el.sectionDevinConfig.classList.toggle('hidden', selected !== 'devin');
  el.sectionAgyConfig.classList.toggle('hidden', selected !== 'agy');
  el.sectionOpenaiConfig.classList.toggle('hidden', selected !== 'openai');
}

document.querySelectorAll('input[name="provider"]').forEach((radio) => {
  radio.addEventListener('change', syncSettingsFormVisibility);
});

el.btnSettingsModal.addEventListener('click', () => {
  const radio = document.querySelector(
    `input[name="provider"][value="${state.settings.provider}"]`
  );
  if (radio) radio.checked = true;
  el.inputCliModel.value = state.settings.cliModel || '';
  el.inputAgyModel.value = state.settings.agyModel || '';
  el.inputOpenaiBaseUrl.value = state.settings.openaiBaseUrl || 'https://api.openai.com/v1';
  el.inputOpenaiApiKey.value = state.settings.openaiApiKey || '';
  el.inputOpenaiModel.value = state.settings.openaiModel || 'gpt-4o';
  syncSettingsFormVisibility();
  el.modalSettings.classList.remove('hidden');
});

el.btnCloseSettings.addEventListener('click', () => el.modalSettings.classList.add('hidden'));
el.btnCancelSettings.addEventListener('click', () => el.modalSettings.classList.add('hidden'));

el.formSettings.addEventListener('submit', async (e) => {
  e.preventDefault();
  const provider = document.querySelector('input[name="provider"]:checked')?.value || 'devin';
  const payload = {
    provider,
    cliModel: el.inputCliModel.value.trim(),
    agyModel: el.inputAgyModel.value.trim(),
    openaiBaseUrl: el.inputOpenaiBaseUrl.value.trim(),
    openaiApiKey: el.inputOpenaiApiKey.value.trim(),
    openaiModel: el.inputOpenaiModel.value.trim()
  };
  try {
    const data = await apiFetch('/api/settings', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    state.settings = data.settings;
    el.modalSettings.classList.add('hidden');
    renderAll();
  } catch (err) {
    alert(err.message);
  }
});

// Markdown Modal
el.btnMarkdownModal.addEventListener('click', () => {
  el.markdownPreviewContent.textContent =
    state.markdownPreview || t('noActiveSession');
  el.modalMarkdown.classList.remove('hidden');
});

el.btnCloseMarkdown.addEventListener('click', () => el.modalMarkdown.classList.add('hidden'));

el.btnCopyMarkdown.addEventListener('click', async () => {
  if (!state.markdownPreview) return;
  await navigator.clipboard.writeText(state.markdownPreview);
  el.btnCopyMarkdown.textContent = t('copiedMdBtn');
  setTimeout(() => {
    el.btnCopyMarkdown.textContent = t('copyMdBtn');
  }, 1500);
});

// History Modal
async function refreshSessionsList() {
  try {
    const data = await apiFetch('/api/sessions');
    state.sessionsList = data.sessions || [];
    el.sessionCountBadge.textContent = String(state.sessionsList.length);
  } catch {
    // ignore
  }
}

el.btnHistory.addEventListener('click', async () => {
  await refreshSessionsList();
  if (!state.sessionsList.length) {
    el.historySessionList.innerHTML = `<div class="empty-hint">${escapeHtml(t('emptyHistory'))}</div>`;
  } else {
    el.historySessionList.innerHTML = state.sessionsList
      .map(
        (s) => `
        <div class="history-item" data-session-id="${escapeHtml(s.id)}">
          <div>
            <strong>${escapeHtml(s.topic)}</strong>
            <div class="item-sub">
              ${s.mode === 'learned' ? 'LEARNED' : 'LEARN'} · ${s.messageCount} turns · ${s.knownCount} known
            </div>
          </div>
          <span class="act-btn">${escapeHtml(t('loadSessionBtn'))}</span>
        </div>
      `
      )
      .join('');
  }
  el.modalHistory.classList.remove('hidden');
});

el.btnCloseHistory.addEventListener('click', () => el.modalHistory.classList.add('hidden'));

el.historySessionList.addEventListener('click', async (e) => {
  const row = e.target.closest('.history-item');
  if (!row) return;
  const sessionId = row.dataset.sessionId;
  try {
    const data = await apiFetch(`/api/sessions/${sessionId}`);
    state.session = data.session;
    state.markdownPreview = data.markdownPreview;
    el.modalHistory.classList.add('hidden');
    renderAll();
  } catch (err) {
    alert(err.message);
  }
});

async function init() {
  try {
    const [settingsData, sessionsData] = await Promise.all([
      apiFetch('/api/settings'),
      apiFetch('/api/sessions')
    ]);
    state.settings = settingsData.settings;
    state.sessionsList = sessionsData.sessions || [];
  } catch (err) {
    console.error('Init error:', err);
  }
  renderAll();
}

init();
