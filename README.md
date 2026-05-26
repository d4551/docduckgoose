# DocDuckGoose

[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Elysia](https://img.shields.io/badge/server-Elysia-f7c8e0)](https://elysiajs.com/)
[![Mermaid](https://img.shields.io/badge/docs-Mermaid%20charts-ff3670?logo=mermaid&logoColor=white)](https://mermaid.js.org/)
[![Goose Mode](https://img.shields.io/badge/goose%20mode-honk%20driven-85c742)](https://github.com/d4551/docduckgoose)

## Explain Like I'm Five

Imagine a very silly goose in a tiny librarian hat.

Every time you give the goose a document, the goose waddles it to the right nest:

- The **Goose Word** nest lets people write, read, print, speak, and tidy documents.
- The **Bao** basket wraps up useful tools so the goose can carry them without dropping crumbs.
- The **plugin pond** lets extra helpers swim over, like spellcheck, export packs, keyboards, quick actions, themes, and writing insights.

So DocDuckGoose is a cozy document workshop where a goose says, "Honk, I know where that goes," and then organizes the whole flock.

## What This Is

DocDuckGoose is a Bun and TypeScript workspace for a local-first document app plus its Baohaus package ecosystem. The repo combines:

| Coop | What lives there | Goose job |
| --- | --- | --- |
| `goose-word/` | Main Elysia app, routes, document store, editor views, settings, speech, print flows | The goose that serves the documents |
| `goose-word-plugins/` | Optional capabilities such as spellcheck, exports, keyboard input, themes, and insights | The helpful geese wearing tool belts |
| `bao/` | Bao package kit for build, validation, governance, manifests, and README generation | The goose with the clipboard |
| `bao-source/` | Local workspace packages used by the app and package system | The pantry full of shared snacks |

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
bun run bao:validate
bun run bao:build
```

## The Big Goose Map

```mermaid
flowchart TB
  human["Human with a document idea"] --> browser["Browser"]
  browser --> app["goose-word Elysia app"]

  subgraph appLayer["Goose Word app"]
    app --> routes["HTTP routes"]
    routes --> views["HTML views"]
    routes --> api["API routes"]
    api --> docs["Document store"]
    api --> prefs["User preferences"]
    api --> speech["Speech service"]
    views --> editor["Editor"]
    views --> print["Print view"]
    views --> settings["Settings"]
  end

  subgraph pluginPond["Plugin pond"]
    spell["spellcheck-bao"]
    exportPack["export-pack-bao"]
    keyboard["usb/bluetooth keyboard bao"]
    insights["writing-insights-bao"]
    theme["theme-aurora-glass-bao"]
    actions["quick-actions-bao"]
  end

  subgraph baoPantry["Bao workspace pantry"]
    kit["bao package kit"]
    source["bao-source packages"]
    governance["bao-governance.json"]
    locks["bao.lock files"]
  end

  app --> pluginPond
  app --> source
  pluginPond --> source
  kit --> governance
  kit --> locks
  kit --> pluginPond
  kit --> source

  docs --> output["Happy saved docs"]
  print --> paper["Print-ready pages"]
  speech --> voice["Spoken words"]
```

## Document Waddle

```mermaid
sequenceDiagram
  autonumber
  participant Person as Person
  participant Browser as Browser
  participant Goose as goose-word
  participant Store as doc-store
  participant Markdown as markdown-render
  participant Speech as speech-service
  participant Print as print-view

  Person->>Browser: Opens a document
  Browser->>Goose: Requests editor or document route
  Goose->>Store: Fetches document data
  Store-->>Goose: Returns title, body, and metadata
  Goose->>Markdown: Renders safe preview content
  Markdown-->>Goose: HTML ready for the page
  Goose-->>Browser: Sends editor view
  Person->>Browser: Edits, saves, prints, or speaks

  alt Save
    Browser->>Goose: POST document changes
    Goose->>Store: Persist updated document
    Store-->>Goose: Saved
    Goose-->>Browser: Honk, stored
  else Speak
    Browser->>Goose: Request speech
    Goose->>Speech: Prepare speech output
    Speech-->>Browser: Audio-friendly response
  else Print
    Browser->>Goose: Request print route
    Goose->>Print: Build print layout
    Print-->>Browser: Clean printable page
  end
```

## Package Flight Pattern

```mermaid
flowchart LR
  root["root package.json"] --> workspaces["Bun workspaces"]

  workspaces --> gooseWord["@baohaus/goose-word"]
  workspaces --> plugins["goose-word-plugins/*"]
  workspaces --> sourcePackages["bao-source packages"]

  sourcePackages --> ui["@baohaus/goose-word-ui-bao"]
  sourcePackages --> md["@baohaus/markdown-bao"]
  sourcePackages --> sanitize["@baohaus/sanitize-bao"]
  sourcePackages --> i18n["@baohaus/tangyuan-i18n"]
  sourcePackages --> theme["@baohaus/baohaus-theme-aurora-light-bao"]
  sourcePackages --> tokens["@baohaus/baohaus-design-tokens-aurora-bao"]

  ui --> gooseWord
  md --> gooseWord
  sanitize --> gooseWord
  i18n --> gooseWord
  theme --> gooseWord
  tokens --> gooseWord

  plugins --> gooseWord
  plugins --> sourcePackages
```

## Validation Runway

```mermaid
stateDiagram-v2
  [*] --> FreshCheckout
  FreshCheckout --> DependenciesReady: bun install
  DependenciesReady --> DevLoop: bun run dev
  DependenciesReady --> Typecheck: bun run typecheck
  DependenciesReady --> Test: bun run test
  DependenciesReady --> BaoValidate: bun run bao:validate
  DependenciesReady --> BaoBuild: bun run bao:build

  Typecheck --> GreenLight: no TypeScript squawks
  Test --> GreenLight: tests pass
  BaoValidate --> GreenLight: governance is valid
  BaoBuild --> GreenLight: packages bundle

  GreenLight --> ShipIt: commit the flock
  ShipIt --> [*]
```

## Repository Guide

| Path | Purpose |
| --- | --- |
| `package.json` | Root Bun workspace scripts and package wiring |
| `bun.lock` | Locked dependency graph for reproducible installs |
| `goose-word/src/http/` | Page and API routes |
| `goose-word/src/http/html/` | HTML views for editor, settings, print, docs list, and shell |
| `goose-word/src/services/` | Document storage, rendering, speech, and preferences |
| `goose-word/src/i18n/` | Runtime strings and catalog helpers |
| `goose-word/test/` | App-focused Bun tests |
| `goose-word-plugins/` | Installable app extensions |
| `bao/src/` | Bao package kit source |
| `bao-source/` | Shared Baohaus packages consumed by app and plugins |

## Goose Rules Of The Pond

- Keep the main app calm, readable, and document-first.
- Put reusable flock logic in `bao-source/` packages.
- Keep plugins small and purposeful so each goose knows its honk.
- Run tests and Bao validation before releasing anything from the nest.
- Prefer boring reliability over dramatic wing flapping.

## Tiny Glossary

| Word | Meaning |
| --- | --- |
| Goose Word | The document app |
| Bao | The package/governance wrapper system |
| Bao source | Shared local packages |
| Plugin | An optional helper that adds a focused capability |
| Honk | Technical term for "the system did the thing" |

## License

No license file is included yet. Add one before publishing this pond for public reuse.
