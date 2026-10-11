import hashlib
import shutil
import sys
import tempfile
import unittest
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from build_release import build, payload
from install import install


class DistributionTests(unittest.TestCase):
    def test_install_into_path_with_spaces_and_preserve_existing(self):
        with tempfile.TemporaryDirectory() as temp:
            destination = Path(temp) / "skill space" / "learning-machine"
            install(destination)
            for relative, data in payload().items():
                self.assertEqual((destination / relative).read_bytes(), data)
            skill = destination / "SKILL.md"
            skill.write_text("User customization", encoding="utf-8")
            with self.assertRaises(FileExistsError):
                install(destination)
            self.assertEqual(skill.read_text(encoding="utf-8"), "User customization")

    def test_existing_file_is_not_overwritten(self):
        with tempfile.TemporaryDirectory() as temp:
            destination = Path(temp) / "learning-machine"
            destination.write_text("Keep", encoding="utf-8")
            with self.assertRaises(FileExistsError):
                install(destination)
            self.assertEqual(destination.read_text(encoding="utf-8"), "Keep")

    def test_reproducible_allowlisted_archive_and_checksum(self):
        with tempfile.TemporaryDirectory() as temp:
            output = Path(temp)
            archive1, checksum1 = build(output=output / "one")
            archive2, _ = build(output=output / "two")
            self.assertEqual(archive1.read_bytes(), archive2.read_bytes())
            expected = {"learning-machine/" + name for name in payload()}
            with ZipFile(archive1) as bundle:
                self.assertEqual(set(bundle.namelist()), expected)
                for name, data in payload().items():
                    self.assertEqual(bundle.read("learning-machine/" + name), data)
            digest, filename = checksum1.read_text(encoding="utf-8").strip().split("  ")
            self.assertEqual(digest, hashlib.sha256(archive1.read_bytes()).hexdigest())
            self.assertEqual(filename, archive1.name)

    def test_missing_source_does_not_leave_installation(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp) / "incomplete"
            root.mkdir()
            destination = Path(temp) / "learning-machine"
            with self.assertRaises(ValueError):
                install(destination, root=root)
            self.assertFalse(destination.exists())

    def test_private_files_are_excluded_from_distribution(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp) / "source"
            for source in ("skills",):
                shutil.copytree(ROOT / source, root / source)
            shutil.copy2(ROOT / "LICENSE", root / "LICENSE")
            shutil.copy2(ROOT / "VERSION", root / "VERSION")
            (root / "skills/learning-machine/PRIVATE-BRIEF.md").write_text("Private", encoding="utf-8")
            archive, _ = build(root=root)
            destination = Path(temp) / "learning-machine"
            install(destination, root=root)
            with ZipFile(archive) as bundle:
                self.assertFalse(any("BRIEF" in name for name in bundle.namelist()))
            self.assertFalse((destination / "PRIVATE-BRIEF.md").exists())

    def test_invalid_version_cannot_escape_output_directory(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "VERSION").write_text("../../elsewhere", encoding="utf-8")
            with self.assertRaises(ValueError):
                build(root=root)


if __name__ == "__main__":
    unittest.main()
