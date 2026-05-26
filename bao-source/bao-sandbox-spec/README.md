<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/bao-sandbox-spec

## Explain Like I'm Five

Canonical .bao sandbox manifest schema, TypeScript shape, and validator → JailSpec compiler. Import subpaths like `./canonical-json`, `./capabilities`, `./cluster`, `./compile` when you wire this crate in.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/bao-sandbox-spec"] --> crate[".bao_sandbox_spec crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Canonical . | @baohaus/bao-bpf; @baohaus/bao-cgroup; @baohaus/bao-constants; @baohaus/bao-landlock | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/bao-sandbox-spec

Standalone Baohaus package. Catalog identity `bao-sandbox-spec`. Source at `bao-source/bao-sandbox-spec`. Publishes to `baohaus/bao-sandbox-spec`. Canonical archive: `bao-source/bao-sandbox-spec/dist/bao/bao-sandbox-spec.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/bao-sandbox-spec` |
| Catalog id | `bao-sandbox-spec` |
| Source path | `bao-source/bao-sandbox-spec` |
| OCI repository | `baohaus/bao-sandbox-spec` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`./canonical-json`, `./capabilities`, `./cluster`, `./compile`, `./computer-use`, `./event-bus`, `./events`, `./grant-signer`, `./grants`, `./matrix`, `./negotiate`, `./package-descriptor`, `./resources`, `./scheduler`, `./schema`, `./usage`, `./validate`, `./wire-resize`.

## Proof Commands

Run from `bao-source/bao-sandbox-spec`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/bao-sandbox-spec` publishes to `baohaus/bao-sandbox-spec` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/bao-sandbox-spec`:

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

Canonical .bao sandbox manifest schema, TypeScript shape, and validator → JailSpec compiler.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `./canonical-json` | Canonical json — typed surface from this workbench |
| `./capabilities` | Capabilities — typed surface from this workbench |
| `./cluster` | Cluster — typed surface from this workbench |
| `./compile` | Compile — typed surface from this workbench |
| `./computer-use` | Computer use — typed surface from this workbench |
| `./event-bus` | Event bus — typed surface from this workbench |
| `./events` | Events — typed surface from this workbench |
| `./grant-signer` | Grant signer — typed surface from this workbench |
| `./grants` | Grants — typed surface from this workbench |
| `./matrix` | Matrix — typed surface from this workbench |
| `./negotiate` | Negotiate — typed surface from this workbench |
| `./package-descriptor` | Package descriptor — typed surface from this workbench |
| _…_ | _6 more export(s) in package.json_ |

## Integration

Source: `bao-source/bao-sandbox-spec`. Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `bao-sandbox-spec` → OCI `baohaus/bao-sandbox-spec`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `./canonical-json` | Canonical json — typed surface from this workbench |
| `./capabilities` | Capabilities — typed surface from this workbench |
| `./cluster` | Cluster — typed surface from this workbench |
| `./compile` | Compile — typed surface from this workbench |
| `./computer-use` | Computer use — typed surface from this workbench |
| `./event-bus` | Event bus — typed surface from this workbench |
| `./events` | Events — typed surface from this workbench |
| `./grant-signer` | Grant signer — typed surface from this workbench |
| `./grants` | Grants — typed surface from this workbench |
| `./matrix` | Matrix — typed surface from this workbench |
| `./negotiate` | Negotiate — typed surface from this workbench |
| `./package-descriptor` | Package descriptor — typed surface from this workbench |
| _…_ | _6 more in `package.json#exports`_ |
<!-- END BAOHAUS PACKAGE MANUAL -->
