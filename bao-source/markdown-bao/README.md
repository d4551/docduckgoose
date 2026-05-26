<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/markdown-bao

## Explain Like I'm Five

Marked parity: GFM, tokenizer, renderer, extensions, lexer. Apps use exports such as `lexer`, `marked`, `PACKAGE_NAME` from `@baohaus/markdown-bao`.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/markdown-bao"] --> crate[".markdown_bao crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Marked parity: GFM, tokenizer, renderer, extensions, lexer; Exported API: lexer, marked, PACKAGE_NAME, parse, parser, … | bao-governance.json; bao.lock; catalog row | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/markdown-bao

Standalone Baohaus package. Catalog identity `markdown-bao`. Source at `bao-source/markdown-bao`. Publishes to `baohaus/markdown-bao`. Canonical archive: `bao-source/markdown-bao/dist/bao/markdown-bao.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/markdown-bao` |
| Catalog id | `markdown-bao` |
| Source path | `bao-source/markdown-bao` |
| OCI repository | `baohaus/markdown-bao` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`, `./gfm`, `./lexer`, `./renderer`, `./tokenizer`.

## Proof Commands

Run from `bao-source/markdown-bao`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/markdown-bao` publishes to `baohaus/markdown-bao` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/markdown-bao`:

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

Marked parity: GFM, tokenizer, renderer, extensions, lexer

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./gfm` | Gfm — typed surface from this workbench |
| `./lexer` | Lexer — typed surface from this workbench |
| `./renderer` | Renderer — typed surface from this workbench |
| `./tokenizer` | Tokenizer — typed surface from this workbench |

## Primary symbols

- `lexer`
- `marked`
- `PACKAGE_NAME`
- `parse`
- `parser`
- `renderHTML`
- `tokenize`

## Integration

Source: `bao-source/markdown-bao` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `markdown-bao` → OCI `baohaus/markdown-bao`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./gfm` | Gfm — typed surface from this workbench |
| `./lexer` | Lexer — typed surface from this workbench |
| `./renderer` | Renderer — typed surface from this workbench |
| `./tokenizer` | Tokenizer — typed surface from this workbench |

### Symbols

- `lexer`
- `marked`
- `PACKAGE_NAME`
- `parse`
- `parser`
- `renderHTML`
- `tokenize`
<!-- END BAOHAUS PACKAGE MANUAL -->
