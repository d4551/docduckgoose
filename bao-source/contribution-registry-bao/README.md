<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/contribution-registry-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's guest ledger. Every app signs in its menus, settings panels, and action buttons here so the goose always knows who brought what.

## Architecture

```mermaid
flowchart LR
  apps["Bao apps\nregister contributions"] --> registry["contribution-registry\ntyped, order-stable store"]
  registry --> sidebar["Sidebar"]
  registry --> settings["Settings tabs"]
  registry --> palette["Command palette"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Canonical per-surface contribution registry factory consumed by every Bao app's `. | @baohaus/ecosystem-events-bao | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/contribution-registry-bao

Canonical per-surface contribution registry factory consumed by every Bao app's `.bao` install handler chain. Generalises the legacy sidebar-only registry into a typed, order-stable store that any contribution surface (sidebar / settings-tab / palette-entry-group / api-group / tile-group / ui-asset-pack) can instantiate without redeclaring lifecycle semantics.

Source at `bao-source/contribution-registry-bao`.

## Public Pieces

`./api-group`, `./api-group-validate`, `./enterprise-tenancy`, `./native-mobile-shell`, `./native-mobile-shell-registry`, `./native-mobile-shell-validate`, `./palette-entry-group`, `./palette-entry-group-validate`, `./registry`, `./settings-tab`, `./settings-tab-validate`, `./sidebar`, `./sidebar-validate`, `./tile-group`, `./tile-group-validate`, `./topbar`, `./topbar-validate`, `./types`, `./ui-asset-pack`, `./ui-asset-pack-validate`

## Proof Commands

Run from `bao-source/contribution-registry-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/contribution-registry-bao`:

```bash
bun install
bun run typecheck
bun test
bun run build
bun run test
bun run lint
bun run bao:build
bun run bao:validate
bun run verify
```

# `@baohaus/contribution-registry-bao`

Canonical generic per-surface contribution registry factory consumed by
every Bao app's `.bao` install handler chain.

## What this package solves

Every contribution surface (sidebar / settings-tab / palette-entry-group /
api-group / tile-group) needs the same lifecycle:

1. Register a contribution with a unique id and an owning extension.
2. Snapshot the registry in a stable order for rendering.
3. Hot-uninstall: drop every registration owned by an extension.
4. Reject duplicate-id collisions across different owners.

Before this package, the sidebar registry hand-rolled all of the above
inside `bao-runtime/`, and every other surface that wanted the same
semantics would have re-implemented it. This package extracts the
generic factory so consumers only supply the surface-specific compare
function and shape.

## Submodule subpaths

There is no barrel — every consumer imports from a specific subpath.

- `@baohaus/contribution-registry-bao/registry` — the
  `createContributionRegistry<T>(compare)` factory + the `RegistryError`
  / `RegisterResult` discriminated Result types.
- `@baohaus/contribution-registry-bao/types` — `BaseContributionRegistration`
  base interface and re-exports of `ECOSYSTEM_CONTRIBUTION_SURFACE` /
  `EcosystemContributionSurface` from
  `@baohaus/ecosystem-events-bao/types`. The contribution-surface
  discriminator lives in `ecosystem-events-bao` because the event bus
  and the registry both reference the same five surfaces — there is no
  duplicate enum.

## Result discriminator, not exceptions

`register()` returns a `RegisterResult` discriminator instead of
throwing on collision. Callers handle the `ok: false` branch to log /
roll back / surface a user-facing error. This matches the Rust /
Effect-TS-style Result pattern enforced across the Bao codebase via
`@baohaus/bao-utils/async-result` and keeps the install handler chain
exception-free.

## Per-surface shapes live with their consumers

The package intentionally does not declare `SidebarRegistration` /
`SettingsTabRegistration` / etc. Surface-specific shapes carry
app-specific fields (sidebar sections differ per app, dashboard tile
catalogs differ per app); they extend `BaseContributionRegistration`
in the consumer that owns the surface. When the surface is canonical
across every Bao app (the sidebar is, once the canonical happydumpling
sidebar partial is rendered by every app), the surface-specific shape
graduates into its own contract module.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `./api-group` | Api group — typed surface from this .bao crate |
| `./api-group-validate` | Api group validate — typed surface from this .bao crate |
| `./palette-entry-group` | Palette entry group — host UI registration surface |
| `./palette-entry-group-validate` | Palette entry group validate — host UI registration surface |
| `./registry` | Registry — typed surface from this .bao crate |
| `./settings-tab` | Settings tab — host UI registration surface |
| `./settings-tab-validate` | Settings tab validate — host UI registration surface |
| `./sidebar` | Sidebar — host UI registration surface |
| `./sidebar-validate` | Sidebar validate — host UI registration surface |
| `./tile-group` | Tile group — typed surface from this .bao crate |
| `./tile-group-validate` | Tile group validate — typed surface from this .bao crate |
| `./types` | Types — typed surface from this .bao crate |
| _…_ | _1 more export(s) in package.json_ |

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `./api-group` | Api group — typed surface from this .bao crate |
| `./api-group-validate` | Api group validate — typed surface from this .bao crate |
| `./palette-entry-group` | Palette entry group — host UI registration surface |
| `./palette-entry-group-validate` | Palette entry group validate — host UI registration surface |
| `./registry` | Registry — typed surface from this .bao crate |
| `./settings-tab` | Settings tab — host UI registration surface |
| `./settings-tab-validate` | Settings tab validate — host UI registration surface |
| `./sidebar` | Sidebar — host UI registration surface |
| `./sidebar-validate` | Sidebar validate — host UI registration surface |
| `./tile-group` | Tile group — typed surface from this .bao crate |
| `./tile-group-validate` | Tile group validate — typed surface from this .bao crate |
| `./types` | Types — typed surface from this .bao crate |
| _…_ | _1 more in `package.json#exports`_ |
<!-- END BAOHAUS PACKAGE MANUAL -->
