<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/bao-wrapture

## Explain Like I'm Five

This crate is `@baohaus/bao-wrapture` at `bao-source/bao-wrapture`. Import subpaths like `./builder-pool`, `./config`, `./decode-cache`, `./decode-pool` when you wire this crate in.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/bao-wrapture"] --> crate[".bao_wrapture crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Public contract for `@baohaus/bao-wrapture` | @baohaus/bao-config; @baohaus/bao-core; @baohaus/bao-schemas; @baohaus/bao-utils; @baohaus/flatbuf-bao | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/bao-wrapture

Standalone Baohaus package. Catalog identity `bao-wrapture`. Source at `bao-source/bao-wrapture`. Publishes to `baohaus/bao-wrapture`. Canonical archive: `bao-source/bao-wrapture/dist/bao/bao-wrapture.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/bao-wrapture` |
| Catalog id | `bao-wrapture` |
| Source path | `bao-source/bao-wrapture` |
| OCI repository | `baohaus/bao-wrapture` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`, `./builder-pool`, `./config`, `./decode-cache`, `./decode-pool`, `./defaults`, `./event-coalescer`, `./metrics`, `./protocols/bao-install`, `./protocols/bao-manifest`, `./protocols/baodown`, `./protocols/cache`, `./protocols/hardware-state`, `./protocols/module-lifecycle`, `./protocols/observability`, `./protocols/perception`, `./transport`, `./verifier`.

## Proof Commands

Run from `bao-source/bao-wrapture`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/bao-wrapture` publishes to `baohaus/bao-wrapture` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/bao-wrapture`:

```bash
bun install
bun run typecheck
bun run test
bun run build
bun run lint
bun run bao:build
bun run bao:validate
bun run verify
```

## Capability

@baohaus/bao-wrapture is a Baohaus workbench package at `bao-source/bao-wrapture`.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./builder-pool` | Builder pool — typed surface from this workbench |
| `./config` | Config — typed surface from this workbench |
| `./decode-cache` | Decode cache — typed surface from this workbench |
| `./decode-pool` | Decode pool — typed surface from this workbench |
| `./defaults` | Defaults — typed surface from this workbench |
| `./event-coalescer` | Event coalescer — typed surface from this workbench |
| `./metrics` | Metrics — typed surface from this workbench |
| `./protocols/bao-install` | Protocols/bao install — typed surface from this workbench |
| `./protocols/bao-manifest` | Protocols/bao manifest — typed surface from this workbench |
| `./protocols/baodown` | Protocols/baodown — typed surface from this workbench |
| `./protocols/cache` | Protocols/cache — typed surface from this workbench |
| _…_ | _6 more export(s) in package.json_ |

## Integration

Source: `bao-source/bao-wrapture`. Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `bao-wrapture` → OCI `baohaus/bao-wrapture`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./builder-pool` | Builder pool — typed surface from this workbench |
| `./config` | Config — typed surface from this workbench |
| `./decode-cache` | Decode cache — typed surface from this workbench |
| `./decode-pool` | Decode pool — typed surface from this workbench |
| `./defaults` | Defaults — typed surface from this workbench |
| `./event-coalescer` | Event coalescer — typed surface from this workbench |
| `./metrics` | Metrics — typed surface from this workbench |
| `./protocols/bao-install` | Protocols/bao install — typed surface from this workbench |
| `./protocols/bao-manifest` | Protocols/bao manifest — typed surface from this workbench |
| `./protocols/baodown` | Protocols/baodown — typed surface from this workbench |
| `./protocols/cache` | Protocols/cache — typed surface from this workbench |
| _…_ | _6 more in `package.json#exports`_ |
<!-- END BAOHAUS PACKAGE MANUAL -->
