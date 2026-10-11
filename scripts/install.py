#!/usr/bin/env python3
"""Install a local copy. No network calls and no overwrite option."""
import argparse
from pathlib import Path
from build_release import ROOT, payload


def install(destination, root=ROOT):
    destination = Path(destination).expanduser().absolute()
    if destination.name != "learning-machine":
        raise ValueError("The destination folder must be named learning-machine")
    if destination.exists() or destination.is_symlink():
        raise FileExistsError(f"Destination already exists: {destination}")
    contents = payload(root)  # Read all sources before creating anything.
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.mkdir()  # Fail if another installation created it meanwhile.
    for relative, data in contents.items():
        target = destination / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        with target.open("xb") as stream:
            stream.write(data)
    return destination


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dest", required=True, type=Path,
                        help="Full destination, ending in learning-machine")
    args = parser.parse_args()
    try:
        print(f"Installed to {install(args.dest)}")
    except (OSError, ValueError) as exc:
        parser.exit(1, f"Not installed: {exc}\n")
