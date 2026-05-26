<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/tailwind-bao

## Explain Like I'm Five

Tailwind CSS v4 engine parity: JIT compiler, utility generation, arbitrary values, variants Apps use exports such as `CompiledUtility`, `createCompiler`, `PACKAGE_NAME` from `@baohaus/tailwind-bao`. It is part of the Baohaus .bao factory line.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/tailwind-bao"] --> crate[".tailwind_bao crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Tailwind CSS v4 engine parity: JIT compiler, utility generation, arbitrary values, variants; Exported API: CompiledUtility, createCompiler, PACKAGE_NAME, TailwindCompiler, TailwindConfig, … | bao-governance.json; bao.lock; catalog row | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/tailwind-bao

Standalone Baohaus package. Catalog identity `tailwind-bao`. Source at `bao-source/tailwind-bao`. Publishes to `baohaus/tailwind-bao`. Canonical archive: `bao-source/tailwind-bao/dist/bao/tailwind-bao.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/tailwind-bao` |
| Catalog id | `tailwind-bao` |
| Source path | `bao-source/tailwind-bao` |
| OCI repository | `baohaus/tailwind-bao` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`, `./compile`, `./config`, `./utilities`.

## Proof Commands

Run from `bao-source/tailwind-bao`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/tailwind-bao` publishes to `baohaus/tailwind-bao` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/tailwind-bao`:

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

Tailwind CSS v4 engine parity: JIT compiler, utility generation, arbitrary values, variants

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./compile` | Compile — typed surface from this workbench |
| `./config` | Config — typed surface from this workbench |
| `./utilities` | Utilities — typed surface from this workbench |

## Primary symbols

- `CompiledUtility`
- `createCompiler`
- `PACKAGE_NAME`
- `TailwindCompiler`
- `TailwindConfig`
- `UPSTREAM_PACKAGE`

## Integration

Source: `bao-source/tailwind-bao` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `tailwind-bao` → OCI `baohaus/tailwind-bao`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./compile` | Compile — typed surface from this workbench |
| `./config` | Config — typed surface from this workbench |
| `./utilities` | Utilities — typed surface from this workbench |

### Symbols

- `CompiledUtility`
- `createCompiler`
- `PACKAGE_NAME`
- `TailwindCompiler`
- `TailwindConfig`
- `UPSTREAM_PACKAGE`
<!-- END BAOHAUS PACKAGE MANUAL -->
