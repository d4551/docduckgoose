<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/otel-api-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's tracking stickers. It adds OpenTelemetry labels so every delivery can be traced from start to finish.

## Architecture

```mermaid
flowchart LR
  app["App spans + metrics"] --> otel["otel-api-bao\ntrace + instrument"]
  otel --> collector["Trace collector\nOTLP / HTTP export"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Bao-namespaced re-export seam for OpenTelemetry primitives (api, sdk-trace-base, instrumentation, core, exporter-trace-otlp-http).; Exported API: PACKAGE_NAME, UPSTREAM_PACKAGE | Shared @baohaus contracts | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/otel-api-bao

Bao-namespaced re-export seam for OpenTelemetry primitives (api, sdk-trace-base, instrumentation, core, exporter-trace-otlp-http).

Source at `bao-source/otel-api-bao`.

## Public Pieces

`.`, `./baggage`, `./context`, `./core`, `./exporter-trace-otlp-http`, `./instrumentation`, `./metrics`, `./sdk-trace`, `./trace`

## Proof Commands

Run from `bao-source/otel-api-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
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
| `.` | Main entry — typed surface from this .bao crate |
| `./baggage` | Baggage — typed surface from this .bao crate |
| `./context` | Context — typed surface from this .bao crate |
| `./core` | Core — typed surface from this .bao crate |
| `./exporter-trace-otlp-http` | Exporter trace otlp http — HTTP handlers |
| `./instrumentation` | Instrumentation — typed surface from this .bao crate |
| `./sdk-trace` | Sdk trace — typed surface from this .bao crate |
| `./trace` | Trace — typed surface from this .bao crate |

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
| `.` | Main entry — typed surface from this .bao crate |
| `./baggage` | Baggage — typed surface from this .bao crate |
| `./context` | Context — typed surface from this .bao crate |
| `./core` | Core — typed surface from this .bao crate |
| `./exporter-trace-otlp-http` | Exporter trace otlp http — HTTP handlers |
| `./instrumentation` | Instrumentation — typed surface from this .bao crate |
| `./sdk-trace` | Sdk trace — typed surface from this .bao crate |
| `./trace` | Trace — typed surface from this .bao crate |

### Symbols

- `PACKAGE_NAME`
- `UPSTREAM_PACKAGE`
<!-- END BAOHAUS PACKAGE MANUAL -->
