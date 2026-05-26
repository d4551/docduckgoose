<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/bao-edge

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's front door turnstile. It checks IDs, stamps requests, and sends them to the right desk inside -- no one gets in without passing through here.

## Architecture

```mermaid
sequenceDiagram
  participant Browser
  participant Edge as bao-edge
  participant Runtime
  Browser->>Edge: HTTPS
  Edge->>Runtime: proxied request
  Runtime-->>Edge: response
  Edge-->>Browser: HTTPS
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Edge routing; TLS termination policy | auth-bao; Shared route constants | Business databases; Desktop shell UI |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/bao-edge

Standalone package in the Baohaus monorepo.

Source at `bao-source/bao-edge`.

## Public Pieces

`.`, `./package-descriptor`, `./services/bao-install/bao-install-config.service`, `./services/bao-install/bao-install-validator.service`, `./services/bao-install/bao-install.plugin`, `./services/bao-install/bao-manifest-paths.service`, `./services/bao-install/bao-manifest-trust.service`, `./services/bao-install/bao-target-handler-registry`, `./services/bao-install/target-handlers/ai-model.handler`, `./services/bao-install/target-handlers/bao-package.handler`, `./services/bao-install/target-handlers/bao-runtime-workload.handler`, `./services/bao-install/target-handlers/baodown-flow.handler`, `./services/bao-install/target-handlers/baodown-node.handler`, `./services/bao-install/target-handlers/better-auth-extension.handler`, `./services/bao-install/target-handlers/bun-plugin.handler`, `./services/bao-install/target-handlers/bunbuddy-contract.handler`, `./services/bao-install/target-handlers/config-overlay.handler`, `./services/bao-install/target-handlers/elysia-plugin.handler`, `./services/bao-install/target-handlers/flatbuffer-schema.handler`, `./services/bao-install/target-handlers/hardware-driver.handler`, `./services/bao-install/target-handlers/htmx-extension.handler`, `./services/bao-install/target-handlers/mcp-provider.handler`, `./services/bao-install/target-handlers/oci-image.handler`, `./services/bao-install/target-handlers/prisma-extension.handler`, `./services/bao-install/target-handlers/register-all`, `./services/bao-install/target-handlers/ui-component-kit.handler`, `./services/bao-install/target-handlers/usd-scene.handler`

## Proof Commands

Run from `bao-source/bao-edge`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/bao-edge`:

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

@baohaus/bao-edge is a Baohaus .bao crate at `bao-source/bao-edge`.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this .bao crate |
| `./package-descriptor` | Package descriptor — typed surface from this .bao crate |
| `./services/bao-install/bao-install-config.service` | Services/bao install/bao install config.service — typed surface from this .bao crate |
| `./services/bao-install/bao-install-validator.service` | Services/bao install/bao install validator.service — typed surface from this .bao crate |
| `./services/bao-install/bao-install.plugin` | Services/bao install/bao install.plugin — typed surface from this .bao crate |
| `./services/bao-install/bao-manifest-paths.service` | Services/bao install/bao manifest paths.service — typed surface from this .bao crate |
| `./services/bao-install/bao-manifest-trust.service` | Services/bao install/bao manifest trust.service — typed surface from this .bao crate |
| `./services/bao-install/bao-target-handler-registry` | Services/bao install/bao target handler registry — typed surface from this .bao crate |
| `./services/bao-install/target-handlers/ai-model.handler` | Services/bao install/target handlers/ai model.handler — typed surface from this .bao crate |
| `./services/bao-install/target-handlers/bao-package.handler` | Services/bao install/target handlers/bao package.handler — typed surface from this .bao crate |
| `./services/bao-install/target-handlers/bao-runtime-workload.handler` | Services/bao install/target handlers/bao runtime workload.handler — typed surface from this .bao crate |
| `./services/bao-install/target-handlers/baodown-flow.handler` | Services/bao install/target handlers/baodown flow.handler — typed surface from this .bao crate |
| _…_ | _15 more export(s) in package.json_ |

## Primary symbols

- `packageDescriptor`
- `PackageDescriptor`

## Integration

Source: `bao-source/bao-edge` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `bao-edge` → OCI `baohaus/bao-edge`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this .bao crate |
| `./package-descriptor` | Package descriptor — typed surface from this .bao crate |
| `./services/bao-install/bao-install-config.service` | Services/bao install/bao install config.service — typed surface from this .bao crate |
| `./services/bao-install/bao-install-validator.service` | Services/bao install/bao install validator.service — typed surface from this .bao crate |
| `./services/bao-install/bao-install.plugin` | Services/bao install/bao install.plugin — typed surface from this .bao crate |
| `./services/bao-install/bao-manifest-paths.service` | Services/bao install/bao manifest paths.service — typed surface from this .bao crate |
| `./services/bao-install/bao-manifest-trust.service` | Services/bao install/bao manifest trust.service — typed surface from this .bao crate |
| `./services/bao-install/bao-target-handler-registry` | Services/bao install/bao target handler registry — .bao install target handlers |
| `./services/bao-install/target-handlers/ai-model.handler` | Services/bao install/target handlers/ai model.handler — .bao install target handlers |
| `./services/bao-install/target-handlers/bao-package.handler` | Services/bao install/target handlers/bao package.handler — .bao install target handlers |
| `./services/bao-install/target-handlers/bao-runtime-workload.handler` | Services/bao install/target handlers/bao runtime workload.handler — .bao install target handlers |
| `./services/bao-install/target-handlers/baodown-flow.handler` | Services/bao install/target handlers/baodown flow.handler — .bao install target handlers |
| _…_ | _15 more in `package.json#exports`_ |

### Symbols

- `packageDescriptor`
- `PackageDescriptor`
<!-- END BAOHAUS PACKAGE MANUAL -->
