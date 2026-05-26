<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/bao-package-kit

## Explain Like I'm Five

Spec, build, validate, and policy authority for Baohaus bao-governance.json, bao.lock, and .bao archives. Import subpaths like `./catalog`, `./constants`, `./fs`, `./gates/boundaries` when you wire this crate in.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/bao-package-kit"] --> crate[".bao_package_kit crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Spec, build, validate, and policy authority for Baohaus bao-governance. | @baohaus/bao-contracts; @baohaus/bao-schemas; @baohaus/bao-utils | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/bao-package-kit

Standalone Baohaus package. Catalog identity `bao-package-kit`. Source at `bao`. Publishes to `baohaus/bao-package-kit`. Canonical archive: `bao/dist/bao/bao-package-kit.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/bao-package-kit` |
| Catalog id | `bao-package-kit` |
| Source path | `bao` |
| OCI repository | `baohaus/bao-package-kit` |
| Channel | `internal` |
| Visibility | `hidden` |
| Kind | `library` |
| Runtime installable | `no` |
| Publish gate | `standard` |

## Public Pieces

`./catalog`, `./constants`, `./fs`, `./gates/boundaries`, `./gates/catalog-schema`, `./gates/ci-oci-path`, `./gates/deep-imports`, `./gates/import-scanner`, `./gates/manifest-parity`, `./gates/no-checkedin-bao`, `./gates/package-repos-parity`, `./gates/per-package-verify`, `./gates/registry-consumption`, `./gates/runtime-consumption`, `./gates/validators/allowlists`, `./gates/validators/context`, `./gates/validators/helpers`, `./gates/validators/patterns`, plus 41 more.

## Proof Commands

Run from `bao`:

- `bun run build`
- `bun run typecheck`
- `bun test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/bao-package-kit` publishes to `baohaus/bao-package-kit` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao`:

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

## Capability

Spec, build, validate, and policy authority for Baohaus bao-governance.json, bao.lock, and .bao archives.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `./catalog` | Catalog — typed surface from this workbench |
| `./constants` | Constants — typed surface from this workbench |
| `./fs` | Fs — typed surface from this workbench |
| `./gates/boundaries` | Gates/boundaries — typed surface from this workbench |
| `./gates/catalog-schema` | Gates/catalog schema — shared schemas |
| `./gates/ci-oci-path` | Gates/ci oci path — typed surface from this workbench |
| `./gates/deep-imports` | Gates/deep imports — typed surface from this workbench |
| `./gates/import-scanner` | Gates/import scanner — typed surface from this workbench |
| `./gates/manifest-parity` | Gates/manifest parity — typed surface from this workbench |
| `./gates/no-checkedin-bao` | Gates/no checkedin bao — typed surface from this workbench |
| `./gates/package-repos-parity` | Gates/package repos parity — typed surface from this workbench |
| `./gates/per-package-verify` | Gates/per package verify — typed surface from this workbench |
| _…_ | _47 more export(s) in package.json_ |

## Integration

Source: `bao`. Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `bao-package-kit` → OCI `baohaus/bao-package-kit`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `./catalog` | Catalog — typed surface from this workbench |
| `./constants` | Constants — typed surface from this workbench |
| `./fs` | Fs — typed surface from this workbench |
| `./gates/boundaries` | Gates/boundaries — typed surface from this workbench |
| `./gates/catalog-schema` | Gates/catalog schema — shared schemas |
| `./gates/ci-oci-path` | Gates/ci oci path — typed surface from this workbench |
| `./gates/deep-imports` | Gates/deep imports — port contracts for adapters |
| `./gates/import-scanner` | Gates/import scanner — port contracts for adapters |
| `./gates/manifest-parity` | Gates/manifest parity — typed surface from this workbench |
| `./gates/no-checkedin-bao` | Gates/no checkedin bao — typed surface from this workbench |
| `./gates/package-repos-parity` | Gates/package repos parity — typed surface from this workbench |
| `./gates/per-package-verify` | Gates/per package verify — typed surface from this workbench |
| _…_ | _47 more in `package.json#exports`_ |
<!-- END BAOHAUS PACKAGE MANUAL -->
