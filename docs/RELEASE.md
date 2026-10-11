# Release process

The skill is the product; the repository also contains its documentation and release tools.

1. Review behavioral changes against [SPEC.md](SPEC.md).
2. Update `VERSION`, `CHANGELOG.md`, versioned installation examples, and release notes together.
3. Run the commands in [EVALUATION.md](EVALUATION.md).
4. Inspect the allowlisted runtime archive. It must contain only `learning-machine/SKILL.md`, optional `agents/openai.yaml`, and `LICENSE`.
5. Merge the intended files to the default branch and verify CI.
6. Publish a GitHub Release whose tag is `v` followed by `VERSION`, using the reviewed release commit.
7. The release workflow validates and builds the runtime ZIP and SHA-256 checksum, then attaches them to that release. It will not overwrite existing assets.
8. Verify the published files and the repository's installation command. Record limitations instead of converting documentation checks into runtime claims.

Local build:

```bash
python3 scripts/build_release.py
```

The ZIP uses a fixed timestamp, stable ordering and stored bytes for reproducibility. The archive has a strict input allowlist, so session files and private development material cannot be swept into it accidentally.

The repository source archive and the runtime skill archive serve different audiences. Users can install only the small skill folder; contributors can clone the full repository.
