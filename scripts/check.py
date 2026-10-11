#!/usr/bin/env python3
"""Project-specific structural checks; not an LLM behavior evaluator."""
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import unquote, urlsplit
from build_release import ROOT, payload


def check(root=ROOT):
    skill = root / "skills/learning-machine/SKILL.md"
    text = skill.read_text(encoding="utf-8")
    if not text.startswith("---\n") or "\n---\n" not in text[4:]:
        raise ValueError("Missing YAML frontmatter")
    front, body = text[4:].split("\n---\n", 1)
    keys = re.findall(r"^([a-z_-]+):", front, flags=re.M)
    if keys != ["name", "description"]:
        raise ValueError("Keep this skill's frontmatter to name and description")
    if not re.search(r"^name: learning-machine$", front, re.M):
        raise ValueError("Skill name does not match its folder")
    # This project deliberately uses a small, folded-scalar metadata subset.
    desc = front.partition("description: >-\n")[2]
    if not desc or any(not line.startswith("  ") for line in desc.splitlines()):
        raise ValueError("Use the documented folded description format")
    if not 1 <= len(" ".join(line.strip() for line in desc.splitlines())) <= 1024:
        raise ValueError("Description length outside Agent Skills bounds")
    if not body.strip() or len(text.splitlines()) >= 500:
        raise ValueError("Missing or oversized core instructions")
    metadata = (root / "skills/learning-machine/agents/openai.yaml").read_text(encoding="utf-8")
    if "$learning-machine" not in metadata:
        raise ValueError("UI starter must explicitly invoke this skill")
    for asset in re.findall(r"^\s+icon_(?:small|large):\s*[\"']?([^\"'\s]+)", metadata, re.M):
        asset_path = (skill.parent / asset).resolve()
        if not asset_path.is_relative_to(skill.parent.resolve()) or not asset_path.is_file():
            raise ValueError(f"Missing or out-of-scope UI asset: {asset}")
    expected = {"SKILL.md", "agents/openai.yaml", "LICENSE"}
    actual = {p.relative_to(skill.parent).as_posix() for p in skill.parent.rglob("*") if p.is_file()}
    if actual != expected:
        raise ValueError(f"Unexpected runtime files: {actual ^ expected}")
    payload(root)
    if (skill.parent / "LICENSE").read_bytes() != (root / "LICENSE").read_bytes():
        raise ValueError("Runtime and repository license notices must match")
    version = (root / "VERSION").read_text(encoding="utf-8").strip()
    if not (root / f"docs/releases/v{version}.md").is_file():
        raise ValueError("Missing release notes for VERSION")
    cases = json.loads((root / "evals/cases.json").read_text(encoding="utf-8"))
    identifiers = [case["id"] for case in cases]
    if len(identifiers) != len(set(identifiers)) or not cases:
        raise ValueError("Empty or duplicate evaluation cases")
    for case in cases:
        if not case["user_messages"] or not case["reviewer_checks"]:
            raise ValueError(f"Incomplete evaluation case: {case['id']}")
    for markdown in root.rglob("*.md"):
        if ".git" in markdown.parts or "dist" in markdown.parts:
            continue
        contents = markdown.read_text(encoding="utf-8")
        for target in re.findall(r"!?\[[^\]]*\]\(([^\s)]+)\)", contents):
            parts = urlsplit(target)
            if parts.scheme or parts.netloc or not parts.path:
                continue
            path = (markdown.parent / unquote(parts.path)).resolve()
            if not path.is_relative_to(root.resolve()) or not path.exists():
                raise ValueError(f"Broken local link in {markdown.relative_to(root)}: {target}")
    hero = ET.parse(root / "docs/assets/hero.svg").getroot()
    if any(element.tag.endswith("script") for element in hero.iter()):
        raise ValueError("Hero SVG must be static")
    print("Project structure, metadata, evaluation cases, local links, and SVG: OK")


if __name__ == "__main__":
    try:
        check()
    except (OSError, ValueError, KeyError, ET.ParseError) as exc:
        sys.exit(f"Check failed: {exc}")
