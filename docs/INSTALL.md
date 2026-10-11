# Installation

Learning Machine needs an LLM host that can follow skill instructions. The skill itself requires no API key, server, package manager, or executable script.

## Skills CLI

The optional third-party [Skills CLI](https://github.com/vercel-labs/skills) discovers this repository's `skills/learning-machine` folder:

```bash
npx skills add yifanRex/learning-machine --skill learning-machine
```

Follow its prompts to choose an agent and installation scope. Node.js/npm is required for this route, not for the skill. This command follows the repository's default branch; use a tagged source checkout for a fixed version.

## Fixed-version local installation

Clone the release, review the skill, then copy it using the included local installer:

```bash
git clone --branch v0.1.0 --depth 1 https://github.com/yifanRex/learning-machine.git
cd learning-machine
python3 scripts/install.py --dest ~/.agents/skills/learning-machine
```

The installer needs Python 3.10+ and uses only the standard library. It does not call the network and refuses to overwrite an existing destination. For Windows, use `python` instead of `python3` and quote the full destination path.

Choose the correct destination:

| Host | User-level destination | Invoke |
|---|---|---|
| Codex local CLI/IDE | `~/.agents/skills/learning-machine` | `$learning-machine`, followed by your topic |
| Claude Code local | `~/.claude/skills/learning-machine` | `/learning-machine`, followed by your topic |
| Pi | `~/.agents/skills/learning-machine` | `/skill:learning-machine`, followed by your topic |

Use `.agents/skills/learning-machine` or `.claude/skills/learning-machine` inside your project for the corresponding project-level installation. If the new skill does not appear, reload skills or restart the host as its documentation requires.

For hosts with an upload/import interface, use the release's `learning-machine-v0.1.0.zip` only if that interface supports Agent Skills archives. Different desktop and web products expose different import mechanisms; local directories do not automatically sync to cloud sessions.

## Manual copy

Copy `skills/learning-machine/` into the destination above. The license notice is included in that folder. No installer is required. The core is `SKILL.md`; `agents/openai.yaml` is optional display metadata.

For updates, move your old installed skill to a backup outside the host's scanned skills directories before installing the new release. Keep your session Briefs separately. Avoid having two installed copies named `learning-machine`.

To uninstall, remove only the installed `learning-machine` skill directory. Remove saved Briefs separately if you want to; this does not erase the host's chat history.

## Plain chat fallback

Open `skills/learning-machine/SKILL.md`, copy the body after the YAML frontmatter into a new chat, and add your topic. This is prompt-based use, not a native installation. Start a fresh conversation to avoid carrying over unrelated instructions.

## Compatibility

| Surface | Evidence |
|---|---|
| Development host | Four independent synthetic sessions, 13 turns, using the unchanged core |
| Local install and archive | Checked by this repository's Python tests |
| Codex local paths | Official documentation checked; separate CLI run not performed |
| Claude Code | Official documentation checked; behavior not tested in Claude Code |
| Pi | Official documentation checked; behavior not tested in Pi |
| Other Agent Skills hosts / plain chat | Intended portability; not individually tested |
| Skills CLI remote install | Documented supported layout; verify after public repository availability |

Official references, checked 2026-10-11:

- [OpenAI skill documentation](https://learn.chatgpt.com/docs/build-skills)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Pi skills](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md)
- [Skills CLI](https://github.com/vercel-labs/skills)
