# Examples

These examples illustrate intended behavior. They are authored examples, not benchmark transcripts or promises of exact wording.

## Product exploration

**User:** Explore our team's internal tool with me. My first question was whether to use a queue.

**Learn:** What would you like this tool to change about your colleagues' day?

**User:** I want them to stop staying late to watch tasks finish. A failed task can wait until the next morning.

**Learn:** What makes them feel they still need to keep watching?

**User:** They can't tell whether a task failed or vanished. We have about 300 tasks a day.

**Learn:** What happens when someone discovers that a submitted task has no visible result?

**User:** Correction: 30 tasks a day, not 300. Answer now: give us a minimal acceptance checklist. We only have two development days.

**Learned:** Switched to Learned. The Brief now reflects 30 tasks a day, next-day recovery, and two development days. The correction from 300 to 30 is recorded.

The checklist should demonstrate that every accepted task has a visible status, someone can leave without keeping the interface open, and failures can be accounted for and handled the next morning. Include one unattended run with deliberate failures. Do not treat the word “queue” as a guarantee that work cannot disappear.

**User:** Ask me. Another issue within this topic: our requirements change halfway through development.

**Learn:** Back in Learn. Tell me about the most recent time that happened.

The exploration has moved to a different part of the same topic. The entry question does not force the conversation back to queue selection.

## Correcting an inference

**User:** I want to make things other people use.

**Assistant, tentative view:** It sounds like creative ownership may matter to you.

**User:** No—I mainly want to reduce tedious work for colleagues.

The Brief should remove the unsupported creative-ownership inference, record the stated aim, and retain a short correction. The assistant should not keep steering toward creative roles.

## Starting without a question

**User:** Use learning-machine to explore my photography. I only have a topic.

**Learn:** What made you want to explore your photography now?

**User:** Answer now.

**Learned:** Switched to Learned. So far the Brief contains the topic but no specific request. What would you like me to answer about your photography?

This is a clarification within Learned, not an automatic return to interviewing.

## Inspecting the Brief

Ask “Show me the Brief.” An early one might look like:

```markdown
# Brief: Internal tool
## Topic and entry question
- Topic: Our team's internal tool
- Mode: Learn
- Entry question: Do we need a queue?
- Pending question: Why do colleagues need to watch tasks?
## Known
- User's goal: colleagues can leave without watching tasks.
- Failed work can wait until the next morning.
## Inferences
- Unconfirmed: task visibility may matter more than speed.
## Open threads
- What prevents people from leaving?
- How are failures discovered and resolved?
## Revisions
- No corrections yet.
```

You can correct a statement directly or edit the active file. An inference is not a fact until its basis supports that treatment.
