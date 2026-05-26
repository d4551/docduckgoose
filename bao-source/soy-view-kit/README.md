<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/soy-view-kit

## Explain Like I'm Five

Server-rendered view helpers and HTMX response primitives for Baohaus. Import subpaths like `./audio`, `./html`, `./i18n`, `./i18n-types` when you wire this crate in.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/soy-view-kit"] --> crate[".soy_view_kit crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Server-rendered view helpers and HTMX response primitives for Baohaus. | @baohaus/har-gow-config | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/soy-view-kit

Standalone Baohaus package. Catalog identity `soy-view-kit`. Source at `bao-source/soy-view-kit`. Publishes to `baohaus/soy-view-kit`. Canonical archive: `bao-source/soy-view-kit/dist/bao/soy-view-kit.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/soy-view-kit` |
| Catalog id | `soy-view-kit` |
| Source path | `bao-source/soy-view-kit` |
| OCI repository | `baohaus/soy-view-kit` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`, `./audio`, `./html`, `./i18n`, `./i18n-types`, `./locales/en`, `./locales/ko`, `./templates/alert`, `./templates/breadcrumbs`, `./templates/buttons`, `./templates/confirm-dialog`, `./templates/data-table`, `./templates/definition-grid`, `./templates/design-tokens`, `./templates/empty-state`, `./templates/entity-header`, `./templates/error-boundary`, `./templates/filter-bar`, plus 16 more.

## Proof Commands

Run from `bao-source/soy-view-kit`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/soy-view-kit` publishes to `baohaus/soy-view-kit` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/soy-view-kit`:

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

Server-rendered view helpers and HTMX response primitives for Baohaus.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./audio` | Audio — typed surface from this workbench |
| `./html` | Html — typed surface from this workbench |
| `./i18n` | I18n — typed surface from this workbench |
| `./i18n-types` | I18n types — typed surface from this workbench |
| `./locales/en` | Locales/en — typed surface from this workbench |
| `./locales/ko` | Locales/ko — typed surface from this workbench |
| `./templates/alert` | Templates/alert — typed surface from this workbench |
| `./templates/breadcrumbs` | Templates/breadcrumbs — typed surface from this workbench |
| `./templates/buttons` | Templates/buttons — typed surface from this workbench |
| `./templates/confirm-dialog` | Templates/confirm dialog — typed surface from this workbench |
| `./templates/data-table` | Templates/data table — typed surface from this workbench |
| _…_ | _22 more export(s) in package.json_ |

## Integration

Source: `bao-source/soy-view-kit`. Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `soy-view-kit` → OCI `baohaus/soy-view-kit`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./audio` | Audio — typed surface from this workbench |
| `./html` | Html — typed surface from this workbench |
| `./i18n` | I18n — typed surface from this workbench |
| `./i18n-types` | I18n types — typed surface from this workbench |
| `./locales/en` | Locales/en — typed surface from this workbench |
| `./locales/ko` | Locales/ko — typed surface from this workbench |
| `./templates/alert` | Templates/alert — typed surface from this workbench |
| `./templates/breadcrumbs` | Templates/breadcrumbs — typed surface from this workbench |
| `./templates/buttons` | Templates/buttons — typed surface from this workbench |
| `./templates/confirm-dialog` | Templates/confirm dialog — typed surface from this workbench |
| `./templates/data-table` | Templates/data table — typed surface from this workbench |
| _…_ | _22 more in `package.json#exports`_ |
<!-- END BAOHAUS PACKAGE MANUAL -->
