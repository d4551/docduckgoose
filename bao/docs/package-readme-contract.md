# Package README contract (industry-aligned)

Baohaus workbench `README.md` files follow a **marker-based** layout so `bun run --cwd bao sync-package-readmes` can refresh generated regions without destroying hand-written prose.

## Standards map

| Source | What we adopt |
| --- | --- |
| [Diátaxis](https://diataxis.fr/) | Separate **explanation**, **reference**, and **how-to** — never mix tutorial tone into API lists |
| [pyOpenSci README checklist](https://pyopensci.org/python-package-guide/documentation/repository-files/readme-file-best-practices.html) | **2–4 sentence overview**, ecosystem context, **quick-start commands**, links to deeper docs |
| [Standard README](https://github.com/RichardLitt/standard-readme) | Clear title, install/usage pointers, consistent section order |
| C4 / arc42 boundaries | **Scope** table: in scope, dependencies, out of scope (not marketing copy) |

Baohaus-specific: **`## Explain Like I'm Five` is required first** (before Architecture). It must name this package’s real job—`package.json` description, exports, or curated `eli5` / `overview` in `bao/data/readme-overrides.json`—not generic factory filler.

## File layout (top → bottom)

```text
# <packageName>                    ← title (pyOpenSci: name)

<!-- BEGIN BAOHAUS README HEADER --> ← Diátaxis: explanation + boundaries
## Explain Like I'm Five           ← 2–4 accurate plain-language sentences (required)
## Architecture                    ← mermaid (context or sequence)
## Scope                           ← in scope | dependencies | out of scope
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD --> ← Diátaxis: reference (catalog facts)
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL --> ← how-to + reference detail
## Quick start
## Reference (subpaths, symbols)
## Integration
## Registry (when catalogued)
<!-- END BAOHAUS PACKAGE MANUAL -->
```

## Generator rules (accuracy)

1. **ELI5** — `package.json` `description` is authoritative; domain hooks only when they name this crate; always include exports, subpaths, or downstream consumers; validator rejects generic-only openers.
2. **Architecture** — `flowchart` for libraries, `sequenceDiagram` for HTTP/route packages, `stateDiagram-v2` for lifecycle (`bao-sdk`).
3. **Scope** — derived from description, exports, and `@baohaus/*` dependencies; out-of-scope rows are domain-specific (not copy-pasted boilerplate).
4. **Package card** — only from `bao/src/readme.ts` + catalog row (do not hand-edit).
5. **Manual** — preserve substantive hand sections; replace export-dump-only bodies; merge missing **Subpaths** / **Primary symbols** from source scan.

## Excluded roots (hand-authored indexes)

- Repository root `README.md`
- `bao-source/README.md` (factory floor index)
- `bao-packages/README.md` (catalog binder)

## Commands

```bash
bun run --cwd bao sync-package-readmes          # dry-run + audit JSON
bun run --cwd bao sync-package-readmes --write
bun run --cwd bao validate:readme-contract
```

Audit output: `audit/readme-contract-2026-05-19.json`.

## Overrides

`bao/data/readme-overrides.json` — use `overview` (preferred) or `eli5` (alias) for curated explanation text; optional `mermaid`, `owns` / `consumes` / `neverOwns`, or full `manual`.
