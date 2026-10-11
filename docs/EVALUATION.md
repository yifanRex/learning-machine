# Evaluation

## What the current evidence supports

The unchanged v0.1.0 core was exercised in the development host in four independent synthetic conversations, totaling 13 turns. These were agent-led executions of the skill with test-user follow-ups, not real-user trials or a comparison against an unassisted model.

The exercises covered:

- Starting with a topic and an open question.
- A casual request for an opinion while staying in Learn.
- Correcting a model inference and a previously stated constraint.
- Quoted and negated mode commands.
- Updating a numerical fact with a revision trail.
- Answering a current request with newly supplied constraints.
- Challenging a user's unsupported belief.
- Switching back to Learn and following another thread within the topic.
- Reading a manually edited active Brief.
- Starting a fresh Brief in a directory containing an older one.
- Keeping context in conversation only.
- Asking for necessary evidence without restarting Learn.

No blocking failures were found in those selected samples. The first development run sometimes wrapped its candidate reply in agent-to-agent coordination text; it was not a direct end-user UI trial. No cross-model or cross-host success rate is claimed.

The development record was checked during preparation of this release. The private working transcripts are not shipped. [EXAMPLES.md](EXAMPLES.md) contains authored illustrations, not verbatim evaluation evidence.

## Re-run the behavior checks

[cases.json](../evals/cases.json) supplies prompts and reviewer criteria. For an honest run:

1. Start a fresh host session with this skill.
2. Give the executing model only the case's user messages, one at a time. Do not include the `reviewer_checks` field.
3. Save each visible response and a redacted Brief snapshot.
4. Have a reviewer assess mode, relevance, source attribution, corrections, and user effort.
5. Record host, model/version if known, skill commit, date, and failures. Report untested cases separately.

Do not treat the number of question marks as the number of questions. A single sentence can contain several demands.

## Compare against direct conversation

Use 5–10 real topics where the participant's circumstances matter. Keep the model and final task comparable. Compare constraint violations, incorrect assumptions, relevant use of context, elapsed effort, and the participant's assessment of usefulness.

Do not score longer answers, larger Briefs, or more interview turns as improvements. This comparison has **not** been performed for v0.1.0.

## Repository checks

```bash
python3 scripts/check.py
python3 -m unittest discover -s tests -v
python3 scripts/build_release.py
```

These checks validate release mechanics, not interview intelligence. They need Python 3.10+ and no third-party Python packages.

Local release checks on 2026-10-11: all six distribution tests passed with Python 3.12 on Linux; structural, local-link, metadata, and SVG checks passed. The core matched the previously exercised version byte for byte. GitHub CI results are reported separately by the workflow, not assumed from the local run.
