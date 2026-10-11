#!/usr/bin/env python3
"""Build an allowlisted, byte-reproducible skill ZIP using the standard library."""
import argparse
import hashlib
import re
from pathlib import Path
from zipfile import ZIP_STORED, ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parents[1]
FILES = {
    "SKILL.md": "skills/learning-machine/SKILL.md",
    "agents/openai.yaml": "skills/learning-machine/agents/openai.yaml",
    "LICENSE": "LICENSE",
}


def payload(root=ROOT):
    result = {}
    for destination, source in sorted(FILES.items()):
        path = root / source
        if path.is_symlink() or not path.is_file():
            raise ValueError(f"Expected a regular file: {source}")
        result[destination] = path.read_bytes()
    return result


def build(root=ROOT, output=None):
    version = (root / "VERSION").read_text(encoding="utf-8").strip()
    if not re.fullmatch(r"[0-9]+\.[0-9]+\.[0-9]+(?:-[A-Za-z0-9.-]+)?", version):
        raise ValueError("VERSION must contain a semantic version, without a v prefix")
    contents = payload(root)
    output = output or root / "dist"
    output.mkdir(parents=True, exist_ok=True)
    archive = output / f"learning-machine-v{version}.zip"
    with ZipFile(archive, "w", compression=ZIP_STORED) as bundle:
        for name, data in contents.items():
            info = ZipInfo("learning-machine/" + name, date_time=(2020, 1, 1, 0, 0, 0))
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            info.compress_type = ZIP_STORED
            bundle.writestr(info, data)
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    checksum = output / f"learning-machine-v{version}.sha256"
    checksum.write_text(f"{digest}  {archive.name}\n", encoding="utf-8", newline="\n")
    return archive, checksum


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, help="Output directory (default: dist)")
    args = parser.parse_args()
    archive, checksum = build(output=args.output)
    print(archive)
    print(checksum)
