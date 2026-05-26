<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/bao-shared

## Explain Like I'm Five

This crate is `@baohaus/bao-shared` at `bao-source/bao-shared`. Import subpaths like `./api-envelopes`, `./architecture/bunbuddy-contract-integration`, `./architecture/capability-registry`, `./architecture/domain-module.contract` when you wire this crate in.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/bao-shared"] --> crate[".bao_shared crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Public contract for `@baohaus/bao-shared` | @baohaus/bao-config; @baohaus/bao-constants; @baohaus/bao-core; @baohaus/bao-schemas; @baohaus/bao-types; @baohaus/bao-utils | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/bao-shared

Standalone Baohaus package. Catalog identity `bao-shared`. Source at `bao-source/bao-shared`. Publishes to `baohaus/bao-shared`. Canonical archive: `bao-source/bao-shared/dist/bao/bao-shared.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/bao-shared` |
| Catalog id | `bao-shared` |
| Source path | `bao-source/bao-shared` |
| OCI repository | `baohaus/bao-shared` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`./api-envelopes`, `./architecture/bunbuddy-contract-integration`, `./architecture/capability-registry`, `./architecture/domain-module.contract`, `./architecture/domain-service-definitions`, `./architecture/graph-violation`, `./architecture/module-contract-registry`, `./architecture/module-host`, `./auth/drone-permissions`, `./auth/error-codes`, `./auth/error-messages`, `./auth/permissions`, `./auth/session`, `./bao-control-plane/component-inventory.reader`, `./bao-control-plane/provider-state-parser`, `./bao-control-plane/provider-state.types`, `./bao-control-plane/remote-build-session-projection`, `./bao-control-plane/remote-build-session-summary.reader`, plus 679 more.

## Proof Commands

Run from `bao-source/bao-shared`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/bao-shared` publishes to `baohaus/bao-shared` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/bao-shared`:

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

@baohaus/bao-shared is a Baohaus workbench package at `bao-source/bao-shared`.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `./api-envelopes` | Api envelopes — typed surface from this workbench |
| `./architecture/bunbuddy-contract-integration` | Architecture/bunbuddy contract integration — typed surface from this workbench |
| `./architecture/capability-registry` | Architecture/capability registry — typed surface from this workbench |
| `./architecture/domain-module.contract` | Architecture/domain module.contract — typed surface from this workbench |
| `./architecture/domain-service-definitions` | Architecture/domain service definitions — typed surface from this workbench |
| `./architecture/graph-violation` | Architecture/graph violation — typed surface from this workbench |
| `./architecture/module-contract-registry` | Architecture/module contract registry — typed surface from this workbench |
| `./architecture/module-host` | Architecture/module host — typed surface from this workbench |
| `./auth/drone-permissions` | Auth/drone permissions — auth/session contracts |
| `./auth/error-codes` | Auth/error codes — auth/session contracts |
| `./auth/error-messages` | Auth/error messages — auth/session contracts |
| `./auth/permissions` | Auth/permissions — auth/session contracts |
| _…_ | _685 more export(s) in package.json_ |

## Integration

Source: `bao-source/bao-shared`. Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `bao-shared` → OCI `baohaus/bao-shared`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `./api-envelopes` | Api envelopes — typed surface from this workbench |
| `./architecture/bunbuddy-contract-integration` | Architecture/bunbuddy contract integration — typed surface from this workbench |
| `./architecture/capability-registry` | Architecture/capability registry — typed surface from this workbench |
| `./architecture/domain-module.contract` | Architecture/domain module.contract — typed surface from this workbench |
| `./architecture/domain-service-definitions` | Architecture/domain service definitions — typed surface from this workbench |
| `./architecture/graph-violation` | Architecture/graph violation — typed surface from this workbench |
| `./architecture/module-contract-registry` | Architecture/module contract registry — typed surface from this workbench |
| `./architecture/module-host` | Architecture/module host — typed surface from this workbench |
| `./auth/drone-permissions` | Auth/drone permissions — auth/session contracts |
| `./auth/error-codes` | Auth/error codes — auth/session contracts |
| `./auth/error-messages` | Auth/error messages — auth/session contracts |
| `./auth/permissions` | Auth/permissions — auth/session contracts |
| _…_ | _685 more in `package.json#exports`_ |
<!-- END BAOHAUS PACKAGE MANUAL -->
