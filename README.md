# Goose Word Bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](./bao)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Elysia](https://img.shields.io/badge/server-Elysia-f7c8e0)](https://elysiajs.com/)
[![Mermaid](https://img.shields.io/badge/docs-Mermaid%20charts-ff3670?logo=mermaid&logoColor=white)](https://mermaid.js.org/)
[![Validation](https://img.shields.io/badge/gates-bao%20validated-0f766e)](./bao)

## Explain Like I'm Five

Imagine a careful goose running a mailroom full of labeled bao crates.

Every document, plugin, mobile shell, theme, and shared helper travels in the right crate:

- **Goose Word** is the desk where people write, read, print, speak, and tidy documents.
- **`.bao` registry and fabric** are the shelf map that tells the goose which crates can load, unload, and hot-swap.
- **Baohaus packages and plugins** are reusable crates for UI, schemas, install handlers, native shells, keyboards, themes, and writing tools.

Goose Word Bao is the whole mailroom: the goose never guesses, never keeps duplicate crates, and always asks the `.bao` shelf first.

## What This Is

Goose Word Bao is a Bun and TypeScript workspace for a local-first document app plus its Baohaus `.bao` package ecosystem. The repo combines:

| Crate | What lives there | Goose job |
| --- | --- | --- |
| `goose-word/` | Main Elysia app, routes, document store, editor views, settings, speech, print flows | Serves documents through shared `.bao` contracts |
| `goose-word-plugins/` | Optional capabilities such as spellcheck, exports, keyboard input, themes, and insights | Adds focused capabilities through registry-aware packages |
| `bao/` | Package kit for build, validation, governance, manifests, gates, and README generation | Guards the shelf map and proof commands |
| `bao-source/` | Shared packages consumed by the app, plugins, native shell, and package kit | Holds reusable crates so logic stays DRY |
| `bao-packages/` | Catalog source for package cards and publication metadata | Keeps package identity coherent |

## Quick Start

```bash
bun install
bun run dev
```

Useful commands from the root:

```bash
bun run start
bun run lint
bun run lint:fix
bun run typecheck
bun run test
bun run verify
bun run bao:build
```

## `.bao` First Map

```mermaid
flowchart TB
  human["Human with document"] --> browser["Browser"]
  browser --> shell["goose-word shell"]

  subgraph baoFirst[".bao first shelf"]
    catalog["bao-packages catalog"]
    governance["bao-governance.json"]
    locks["bao.lock"]
    registry[".bao registry/fabric"]
  end

  subgraph appLayer["Goose Word app"]
    shell --> routes["Route constants + HTTP routes"]
    routes --> views["HTML views"]
    routes --> api["Shared API layer"]
    api --> docs["Document store"]
    api --> prefs[".bao-backed preferences"]
    api --> speech["Speech service"]
  end

  subgraph capabilityCrates["Capability crates"]
    spell["spellcheck-bao"]
    exportPack["export-pack-bao"]
    keyboard["usb/bluetooth keyboard bao"]
    insights["writing-insights-bao"]
    theme["theme-aurora-glass-bao"]
    native["goose-word-native-shell-bao"]
    actions["quick-actions-bao"]
  end

  catalog --> registry
  governance --> registry
  locks --> registry
  registry --> shell
  registry --> capabilityCrates
  capabilityCrates --> shell
  shell --> docs
  shell --> prefs
```

## Hot-Load Lifecycle

```mermaid
stateDiagram-v2
  [*] --> Detect
  Detect --> Load: registry finds .bao
  Load --> Register: manifest + capabilities valid
  Register --> Consume: shell lights up routes, tabs, commands
  Consume --> HotSwap: new local or remote version
  HotSwap --> Register: replace active surfaces
  Consume --> Unload: disconnect package
  Unload --> Cleanup: remove UI, listeners, state
  Cleanup --> [*]
```

## Package Flight Pattern

```mermaid
flowchart LR
  root["root package.json"] --> workspaces["Bun workspaces"]
  workspaces --> app["@baohaus/goose-word"]
  workspaces --> plugins["goose-word-plugins/*"]
  workspaces --> source["bao-source/*"]
  workspaces --> kit["@baohaus/bao-package-kit"]

  catalog["bao-packages/bao-packages.json"] --> kit
  kit --> governance
  kit --> locks["bao.lock files"]
  kit --> readmes["generated package README.md"]
  source --> app
  plugins --> app
  source --> plugins
```

## Validation Runway

```mermaid
stateDiagram-v2
  [*] --> FreshCheckout
  FreshCheckout --> DependenciesReady: bun install
  DependenciesReady --> DevLoop: bun run dev
  DependenciesReady --> Typecheck: bun run typecheck
  DependenciesReady --> Test: bun run test
  DependenciesReady --> BaoGates: bun run --cwd goose-word bao:validate:gates all
  DependenciesReady --> ReadmeContract: bun run --cwd bao validate:readme-contract
  DependenciesReady --> Verify: bun run verify

  Typecheck --> GreenLight: no TypeScript squawks
  Test --> GreenLight: tests pass
  BaoGates --> GreenLight: hard bans clear
  ReadmeContract --> GreenLight: ELI5 + Mermaid + badges present
  Verify --> GreenLight: package proof complete

  GreenLight --> ShipIt: ship verified crates
  ShipIt --> [*]
```

## Repository Guide

| Path | Purpose |
| --- | --- |
| `package.json` | Root Bun workspace scripts and package wiring |
| `bun.lock` | Locked dependency graph for reproducible installs |
| `bao-packages/bao-packages.json` | Package catalog used by README cards and registry checks |
| `goose-word/src/http/` | Page and API routes |
| `goose-word/src/http/html/` | HTML views for editor, settings, print, docs list, and shell |
| `goose-word/src/services/` | Document storage, rendering, speech, and preferences |
| `goose-word/src/i18n/` | Runtime strings and catalog helpers |
| `goose-word/test/` | App-focused Bun tests |
| `goose-word-plugins/` | Installable app extensions |
| `bao/src/` | Bao package kit source |
| `bao-source/` | Shared Baohaus packages consumed by app and plugins |
| `bao-source/goose-word-native-shell-bao/` | iOS/Android native shell package |

## Goose Rules Of The Mailroom

- `.bao` loads first; registry/fabric owns package lifecycle.
- Reusable logic goes into `bao-source/` crates, not one-off app code.
- Plugins stay focused, capability-driven, and removable without stale UI.
- Tests, README contracts, and Bao gates run before release.
- No duplicate contracts, route drift, client fetch drift, or unsafe browser storage.

## Tiny Glossary

| Word | Meaning |
| --- | --- |
| Goose Word | The document app |
| `.bao` | Canonical package/archive source of truth |
| Registry/fabric | Loader that detects, registers, consumes, unloads, and hot-swaps `.bao` packages |
| Bao source | Shared local packages |
| Plugin | Focused capability crate loaded through the registry-aware path |
| Native shell | iOS/Android host for Goose Word |

## License

No license file is included yet. Add one before publishing this repository for public reuse.
