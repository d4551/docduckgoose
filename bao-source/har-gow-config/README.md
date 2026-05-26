<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/har-gow-config

## Explain Like I'm Five

Typed Baohaus runtime configuration for Bun services and packages. Import subpaths like `./assistant-runtime`, `./env-core`, `./env-platform`, `./env-server` when you wire this crate in.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/har-gow-config"] --> crate[".har_gow_config crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Typed Baohaus runtime configuration for Bun services and packages.; Subpaths: ., ./assistant-runtime, ./env-core, ./env-platform, ./env-server, ./routes, ./workflow-execute-auth | @baohaus/baobox | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/har-gow-config

Standalone Baohaus package. Catalog identity `har-gow-config`. Source at `bao-source/har-gow-config`. Publishes to `baohaus/har-gow-config`. Canonical archive: `bao-source/har-gow-config/dist/bao/har-gow-config.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/har-gow-config` |
| Catalog id | `har-gow-config` |
| Source path | `bao-source/har-gow-config` |
| OCI repository | `baohaus/har-gow-config` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`, `./assistant-runtime`, `./env-core`, `./env-platform`, `./env-server`, `./routes`, `./workflow-execute-auth`.

## Proof Commands

Run from `bao-source/har-gow-config`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/har-gow-config` publishes to `baohaus/har-gow-config` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/har-gow-config`:

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

Typed Baohaus runtime configuration for Bun services and packages.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./assistant-runtime` | Assistant runtime — typed surface from this workbench |
| `./env-core` | Env core — typed surface from this workbench |
| `./env-platform` | Env platform — typed surface from this workbench |
| `./env-server` | Env server — typed surface from this workbench |
| `./routes` | Routes — HTTP handlers |
| `./workflow-execute-auth` | Workflow execute auth — auth/session contracts |

## Integration

Source: `bao-source/har-gow-config`. Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `har-gow-config` → OCI `baohaus/har-gow-config`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./assistant-runtime` | Assistant runtime — typed surface from this workbench |
| `./env-core` | Env core — typed surface from this workbench |
| `./env-platform` | Env platform — typed surface from this workbench |
| `./env-server` | Env server — typed surface from this workbench |
| `./routes` | Routes — HTTP handlers |
| `./workflow-execute-auth` | Workflow execute auth — auth/session contracts |
<!-- END BAOHAUS PACKAGE MANUAL -->
