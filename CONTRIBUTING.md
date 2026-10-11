# Contributing

Help make the questions worth answering.

For a behavior issue, include the host, model if known, skill version, a short redacted conversation, what happened, and what you expected. Report the smallest reproduction you can. Do not paste real Briefs containing private information.

For an improvement:

1. Describe an observed failure or a concrete usability problem.
2. Change the smallest part of the protocol that addresses it.
3. Run `python3 scripts/check.py` and `python3 -m unittest discover -s tests -v`.
4. If behavior changed, use relevant cases from [evals/cases.json](evals/cases.json) in fresh sessions. Keep expectations away from the executing model and retain redacted outputs.
5. State what you tested and what remains untested.

The runtime core lives in `skills/learning-machine/SKILL.md`. Project docs, examples, and development scripts stay outside the installed skill. Do not add a database, telemetry, a fixed questionnaire, or cross-session retrieval to solve a prompt-level problem.

Keep English and Chinese introductions consistent. Preserve the MIT license. Small pull requests with evidence are easier to review than a broad redesign.
