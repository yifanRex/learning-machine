# Learning Machine specification

Version: 0.1.0. The normative runtime instructions are [SKILL.md](../skills/learning-machine/SKILL.md). This document explains the product contract and its acceptance criteria.

## Purpose

Explore a topic within one session, build an accurate working Brief, and use it to inform subsequent answers. The entry question may start the conversation without becoming its permanent destination.

The primitive loop is **think → ask → integrate → think again**. Integration includes correcting or removing an earlier interpretation. More text is not inherently more understanding.

## Scope

The runtime has two modes and one Brief. It does not require scripts, a database, long-term profiles, retrieval infrastructure, or a separate agent.

The user's current explicit direction takes precedence over the protocol. Host permissions and higher-priority instructions still apply. “Learned” names an interaction mode, not a guarantee of sufficient knowledge.

## Modes

| Current mode | Input | Behavior | Next mode |
|---|---|---|---|
| New session | Start with a topic | Confirm topic, mention answering, ask an open question | Learn |
| Learn | Answer or correction | Integrate, reconsider, ask one main question | Learn |
| Learn | Casual “what do you think?” | One or two provisional sentences, then a question | Learn |
| Learn | Explicit request to answer | Update Brief, confirm, show a compact snapshot, answer | Learned |
| Learned | New request | Use relevant Brief and independent reasoning | Learned |
| Learned | Decisive information gap | Ask one focused clarification | Learned |
| Learned | Explicit request to explore | Confirm, show snapshot, ask from an open thread | Learn |
| Either | Quoted/negated mode words | Treat as content, not a command | Unchanged |

Do not automatically switch because the model thinks it has learned enough. Suggest the option gently when foundational context is covered or questions yield little new information. If no worthwhile question remains, wait for direction instead of manufacturing one.

## Question selection

Choose information with leverage: it is likely to influence several plausible future answers within the topic. Follow meaningful new clues without exhausting a questionnaire. Consider effort and relevance qualitatively, not through invented numerical scores.

Ask motives, beliefs, goals, and tastes openly, without supplied choices. For factual details, offer a tentative guess only if existing evidence supports it. Ask one main question; at most three short, independent factual questions can be grouped.

Before a question, one or two sentences may reflect understanding or identify tension. Do not sneak in a solution. Read provided material before asking the user to repeat it. Lightweight checking can improve a question; substantial research belongs in Learned.

## Brief

| Section | Meaning | Update rule |
|---|---|---|
| Topic and entry question | Topic, mode, optional entry question, pending question | Keep current |
| Known | Explicit user statements and provided information; external facts attributed | Rewrite as evidence changes |
| Inferences | Unconfirmed interpretations and their basis | Revise or remove |
| Open threads | Worthwhile unknowns, tensions, and lateral directions | Reprioritize |
| Revisions | Old understanding → correction, with basis | Append for actual corrections |

Beliefs stay attributed as beliefs. A correction outranks an inference. Conflicting statements may describe different contexts; do not automatically choose the last one. Skipping or uncertainty is not confirmation.

Keep the Brief editable and separate from the installed skill. Use a host artifact/session directory, or `.learning-machine/<topic>-<date>.md`, with a unique suffix when needed. Without file access, keep the logical Brief in conversation. Do not claim failed saves succeeded.

Show it on a significant change, mode switch, or request, rather than every turn. Read the active file after user edits. Where supported, retain its location/content, mode, topic, and pending question through compaction. Do not pretend lost information is available.

Saved Briefs may survive the session, but must not be automatically discovered or loaded in a new one. Explicit user designation permits reuse. This is a protocol boundary; it does not control the host's own memory system.

## Answering

Answer the current request, falling back to the entry question only when there is no newer request. A topic without an answerable request may need one clarification.

Use the Brief as context alongside independent knowledge and appropriate tools. Respect goals, constraints, and tastes; challenge beliefs with reasons. State material assumptions. Label an inference when using it. Integrate new user information quietly.

For small gaps, proceed under a stated assumption. For a decisive gap, ask one question without changing modes. For many gaps, suggest returning to Learn but wait for the user.

## Acceptance and limits

See [evaluation cases](../evals/cases.json). Release checks must verify the format, installation overwrite protection, package contents, and checksum. Behavioral checks must examine both replies and Brief updates; successful formatting alone is insufficient.

The initial release has no claim of calibrated question selection, superior outcomes, guaranteed adherence, or universal host compatibility. Add rules in response to observed failures, not hypothetical completeness.
