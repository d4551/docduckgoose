<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/otel-api-bao

## Explain Like I'm Five

Bao-namespaced re-export seam for OpenTelemetry primitives (api, sdk-trace-base, instrumentation, core, exporter-trace-otlp-http). Apps use exports such as `PACKAGE_NAME`, `UPSTREAM_PACKAGE` from `@baohaus/otel-api-bao`.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/otel-api-bao"] --> crate[".otel_api_bao crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Bao-namespaced re-export seam for OpenTelemetry primitives (api, sdk-trace-base, instrumentation, core, exporter-trace-otlp-http).; Exported API: PACKAGE_NAME, UPSTREAM_PACKAGE | bao-governance.json; bao.lock; catalog row | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/otel-api-bao

Standalone Baohaus package. Catalog identity `otel-api-bao`. Source at `bao-source/otel-api-bao`. Publishes to `baohaus/otel-api-bao`. Canonical archive: `bao-source/otel-api-bao/dist/bao/otel-api-bao.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/otel-api-bao` |
| Catalog id | `otel-api-bao` |
| Source path | `bao-source/otel-api-bao` |
| OCI repository | `baohaus/otel-api-bao` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`./baggage`, `./context`, `./core`, `./exporter-trace-otlp-http`, `./instrumentation`, `./sdk-trace`, `./trace`.

## Proof Commands

Run from `bao-source/otel-api-bao`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/otel-api-bao` publishes to `baohaus/otel-api-bao` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/otel-api-bao`:

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

Bao-namespaced re-export seam for OpenTelemetry primitives (api, sdk-trace-base, instrumentation, core, exporter-trace-otlp-http).

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./baggage` | Baggage — typed surface from this workbench |
| `./context` | Context — typed surface from this workbench |
| `./core` | Core — typed surface from this workbench |
| `./exporter-trace-otlp-http` | Exporter trace otlp http — HTTP handlers |
| `./instrumentation` | Instrumentation — typed surface from this workbench |
| `./sdk-trace` | Sdk trace — typed surface from this workbench |
| `./trace` | Trace — typed surface from this workbench |

## Primary symbols

- `PACKAGE_NAME`
- `UPSTREAM_PACKAGE`

## Integration

Source: `bao-source/otel-api-bao` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `otel-api-bao` → OCI `baohaus/otel-api-bao`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./baggage` | Baggage — typed surface from this workbench |
| `./context` | Context — typed surface from this workbench |
| `./core` | Core — typed surface from this workbench |
| `./exporter-trace-otlp-http` | Exporter trace otlp http — HTTP handlers |
| `./instrumentation` | Instrumentation — typed surface from this workbench |
| `./sdk-trace` | Sdk trace — typed surface from this workbench |
| `./trace` | Trace — typed surface from this workbench |

### Symbols

- `PACKAGE_NAME`
- `UPSTREAM_PACKAGE`
<!-- END BAOHAUS PACKAGE MANUAL -->
