<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/bao-config

## Explain Like I'm Five

This crate is `@baohaus/bao-config` at `bao-source/bao-config`. Apps use exports such as `buildOriginFromParts`, `createRuntimeState`, `deepMerge` from `@baohaus/bao-config`.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/bao-config"] --> crate[".bao_config crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Exported API: buildOriginFromParts, createRuntimeState, deepMerge, DEFAULT_API_BASE_PATH, mergeRuntimeState, … | @baohaus/bao-constants; @baohaus/bao-schemas; @baohaus/bao-types; @baohaus/bao-utils | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/bao-config

Standalone Baohaus package. Catalog identity `bao-config`. Source at `bao-source/bao-config`. Publishes to `baohaus/bao-config`. Canonical archive: `bao-source/bao-config/dist/bao/bao-config.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/bao-config` |
| Catalog id | `bao-config` |
| Source path | `bao-source/bao-config` |
| OCI repository | `baohaus/bao-config` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`, `./baodown-defaults`, `./baofire-defaults`, `./drone-training-defaults`, `./drone.defaults`, `./ecosystem-dev-defaults`, `./ecosystem-observability`, `./ecosystem-urls`, `./env`, `./env-boolean`, `./happydumpling-defaults`, `./help-center-content`, `./htmx-events`, `./htmx-routes`, `./local-service-token`, `./package-descriptor`, `./robotics-training-defaults`, `./robotics.defaults`, plus 1 more.

## Proof Commands

Run from `bao-source/bao-config`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/bao-config` publishes to `baohaus/bao-config` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/bao-config`:

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

@baohaus/bao-config is a Baohaus workbench package at `bao-source/bao-config`.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./baodown-defaults` | Baodown defaults — typed surface from this workbench |
| `./baofire-defaults` | Baofire defaults — typed surface from this workbench |
| `./drone-training-defaults` | Drone training defaults — typed surface from this workbench |
| `./drone.defaults` | Drone.defaults — typed surface from this workbench |
| `./ecosystem-dev-defaults` | Ecosystem dev defaults — typed surface from this workbench |
| `./ecosystem-observability` | Ecosystem observability — typed surface from this workbench |
| `./ecosystem-urls` | Ecosystem urls — typed surface from this workbench |
| `./env` | Env — typed surface from this workbench |
| `./env-boolean` | Env boolean — typed surface from this workbench |
| `./happydumpling-defaults` | Happydumpling defaults — typed surface from this workbench |
| `./help-center-content` | Help center content — typed surface from this workbench |
| _…_ | _7 more export(s) in package.json_ |

## Primary symbols

- `buildOriginFromParts`
- `createRuntimeState`
- `deepMerge`
- `DEFAULT_API_BASE_PATH`
- `mergeRuntimeState`
- `normalizeApiBasePath`
- `RuntimeBaseUrls`
- `RuntimeDatabaseSummary`
- `RuntimeEnvironment`
- `RuntimePorts`
- `RuntimeState`
- `RuntimeStateUpdate`

## Integration

Source: `bao-source/bao-config` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `bao-config` → OCI `baohaus/bao-config`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./baodown-defaults` | Baodown defaults — typed surface from this workbench |
| `./baofire-defaults` | Baofire defaults — typed surface from this workbench |
| `./drone-training-defaults` | Drone training defaults — typed surface from this workbench |
| `./drone.defaults` | Drone.defaults — typed surface from this workbench |
| `./ecosystem-dev-defaults` | Ecosystem dev defaults — typed surface from this workbench |
| `./ecosystem-observability` | Ecosystem observability — typed surface from this workbench |
| `./ecosystem-urls` | Ecosystem urls — typed surface from this workbench |
| `./env` | Env — typed surface from this workbench |
| `./env-boolean` | Env boolean — typed surface from this workbench |
| `./happydumpling-defaults` | Happydumpling defaults — typed surface from this workbench |
| `./help-center-content` | Help center content — typed surface from this workbench |
| _…_ | _7 more in `package.json#exports`_ |

### Symbols

- `buildOriginFromParts`
- `createRuntimeState`
- `deepMerge`
- `DEFAULT_API_BASE_PATH`
- `mergeRuntimeState`
- `normalizeApiBasePath`
- `RuntimeBaseUrls`
- `RuntimeDatabaseSummary`
- `RuntimeEnvironment`
- `RuntimePorts`
- `RuntimeState`
- `RuntimeStateUpdate`
<!-- END BAOHAUS PACKAGE MANUAL -->
