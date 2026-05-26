# @baohaus/<package-slug>

<one-line package description>

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Layout

- `src/` — package source
- `tests/` — package tests
- `scripts/` — package-local `build`, `bao:build`, `bao:validate` commands
- `bao-governance.json` — per-repo governance document (identity, classification, runtime, publish, dependencies, SBOM, provenance)
- `bao.lock` — resolved dependency graph locked to OCI digests
- `schemas/` — local JSON Schemas for `bao-governance.json` and `bao.lock` (copied from `bao/schemas/` at scaffold time)

## Scripts

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build` — writes `dist/bao/<slug>.bao` (ustar archive with signed canonical `manifest.json`, `bao-governance.json`, `bao.lock`, SBOM, provenance)
- `bun run bao:validate` — asserts the archive matches `bao-governance.json`

## Catalog

Canonical multi-package identity is owned by `bao-packages/bao-packages.json`. Do not duplicate identity, channel, visibility, kind, compose, or publish gate settings beyond `bao-governance.json`.

## Distribution

Release artifacts are published to the `baohaus/<package-slug>` OCI repository. Checked-in `.bao` archives are never authoritative — installable content is resolved through the Bao registry.
