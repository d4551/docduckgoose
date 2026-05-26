# Bao Manifest Package Specification (v1)

> The complete guide to creating, validating, and publishing `.bao` archives for Baohaus.
> Authoritative sources: [`../schemas/bao-manifest-v1.schema.json`](../schemas/bao-manifest-v1.schema.json), [`../schemas/bao-lock.schema.json`](../schemas/bao-lock.schema.json), and the install-target TypeBox schemas in [`../../bao-source/flow-dumpling/src/shared/bao/bao-install.schemas.ts`](../../bao-source/flow-dumpling/src/shared/bao/bao-install.schemas.ts).

---

## Table of Contents

1. [What Is a Bao Manifest](#1-what-is-a-bao-manifest)
2. [Archive Format](#2-archive-format)
3. [Manifest Schema (`bao-governance.json`)](#3-manifest-schema-bao-governancejson)
4. [Target Kinds: Full Reference](#4-target-kinds-full-reference)
5. [Target Base Fields](#5-target-base-fields)
6. [Metadata Fields](#6-metadata-fields)
7. [Trust and Integrity](#7-trust-and-integrity)
8. [Dependencies and Ordering](#8-dependencies-and-ordering)
9. [Platform Slices](#9-platform-slices)
10. [Runtime Concepts](#10-runtime-concepts)
11. [Creating a Manifest Step by Step](#11-creating-a-manifest-step-by-step)
12. [Validation Pipeline](#12-validation-pipeline)
13. [Source Policy and Allowlists](#13-source-policy-and-allowlists)
14. [Install API](#14-install-api)
15. [Examples](#15-examples)
16. [Tooling Reference](#16-tooling-reference)
17. [Pre-Publish Checklist](#17-pre-publish-checklist)

> **Canonical v1 archive note.** Baohaus producers emit Layout A with `manifest.bin`, `manifest.json`, `manifest.signature`, namespaced governance/provenance directories, and archive media type `application/vnd.baohaus.bao.archive.v1+tar`.

---

## 1. What Is a Bao Manifest

A `.bao` file is a **deterministic, self-describing TAR archive** that carries one Baohaus package: its governance metadata, its resolved dependency lock, its SBOM, its provenance attestation, and (for installable packages) the install-time manifest that lists the targets the runtime must materialise.

Every Baohaus repo aligns four artefacts:

- `package.json` — Bun package identity and runtime dependency surface.
- `bao-governance.json` — per-repo governance manifest validated against [`../schemas/bao-manifest-v1.schema.json`](../schemas/bao-manifest-v1.schema.json).
- `bao.lock` — resolved dependency graph locked to OCI digests, validated against [`../schemas/bao-lock.schema.json`](../schemas/bao-lock.schema.json).
- The catalog row in [`../../bao-packages/bao-packages.json`](../../bao-packages/bao-packages.json) (`schemaVersion: 2`, layout `standalone-repositories`, namespace `baohaus`).

The runtime install plane (`bao-runtime`'s BaoInstall) reads the in-archive manifest and applies each target through its adapter. The registry plane (`.bao Registry` / `registry`) stores the archive over OCI Distribution v2.

---

## 2. Archive Format

A `.bao` archive is an **uncompressed, deterministic ustar TAR** built by [`../scripts/bao-build.ts`](../scripts/bao-build.ts) and verified by [`../scripts/bao-validate.ts`](../scripts/bao-validate.ts). Every TAR header uses `mtime = 0`, `uid = gid = 0`, owner/group `root`, mode `0644` for files, magic `ustar\0`, and version `00`. Entries are sorted lexicographically before they are written, so byte-for-byte reproducibility is a property of the format, not the build host.

**Media type:** `application/vnd.baohaus.bao.archive.v1+tar`

**Required members** (sorted, all present in Layout A):

`payload/shared/.bao.keep` is an archive-internal sentinel that preserves the shared payload directory in deterministic archives. It is not a source-side `.bao` filetype variant and must not be used as governance, lock, or package metadata.

```
manifest.bin                              # canonical FlatBuffers BMv1 envelope
manifest.json                             # signed canonical install manifest
manifest.signature                        # detached Ed25519 signature over the canonical manifest payload
attestations/slsa-provenance.json         # SLSA in-toto statement
attestations/sbom-cyclonedx.json          # CycloneDX 1.6 SBOM
attestations/sbom-spdx.json               # SPDX SBOM
attestations/vex.json                     # VEX statement
attestations/license-scan.json            # license scan attestation
attestations/vuln-scan.json               # vulnerability scan attestation
governance/bao-governance.json            # JSON governance metadata, schema bao-manifest-v1
provenance/dependency-lock.json           # resolved dependency graph (schemaVersion 1)
payload/shared/.bao.keep                  # shared payload marker, always present
```

Installable archives that carry payloads add the canonical `payload/` tree under the same deterministic ordering rules implemented in [`../../bao-source/flow-dumpling/src/shared/bao/bao-archive.ts`](../../bao-source/flow-dumpling/src/shared/bao/bao-archive.ts):

```
payload/shared/.bao.keep                      # always present, even when empty
payload/shared/<file>...                      # platform-agnostic payload
provenance/build-environment.json             # build host/toolchain snapshot
provenance/dependency-graph.json              # resolved graph
provenance/licenses.json                      # license inventory
provenance/packument.json                     # governance packument snapshot
```

Payload paths are validated to reject `..` segments, empty segments, and absolute paths. The reference TAR writer uses a 512-byte block size and terminates with two zero blocks.

### Source-Control Artifact Policy

The only `.bao` files allowed in source control are catalog-listed release archives at each package's `canonicalBaoOutputPath`, normally `dist/bao/<id>.bao`. `.bao-build/`, `.DS_Store`, generated `.js` siblings under `bao/scripts/**`, and `.generated/**` archive outputs are build debris. `validate:no-checkedin-bao` reads the Git index and rejects those paths even when `.gitignore` would hide untracked copies.

`validate:local-archive-closure -- <archive-directory>` is for standalone consumers that copy `.bao` archives into a local app cache. It reports missing local dependency archives without weakening the checked-in archive policy.

---

## 3. Manifest Schema (`bao-governance.json`)

The governance manifest is the per-repo source of truth. It is required at the repo root and inside the archive. Every field listed below comes directly from [`../schemas/bao-manifest-v1.schema.json`](../schemas/bao-manifest-v1.schema.json); no other fields are permitted (`additionalProperties: false`).

### Top-level

| Field | Required | Constraint |
| --- | --- | --- |
| `$schema` | No | URL pointing at the v1 schema. |
| `schemaVersion` | Yes | Must be `1`. |
| `specRevision` | Yes | Must be `"1.0.0"`. |
| `mediaType` | Yes | Must be `"application/vnd.baohaus.bao.archive.v1+tar"`. |
| `formatKind` | Yes | Must be `"canonical"`. |
| `manifestEncoding` | Yes | Must be `"json"`. |
| `identity` | Yes | See below. |
| `classification` | Yes | See below. |
| `runtime` | Yes | See below. |
| `publish` | Yes | See below. |
| `dependencies` | Yes | Array (may be empty). |
| `sbom` | Yes | Path string, `minLength: 1`. |
| `provenance` | Yes | Path string, `minLength: 1`. |
| `reproducibleBuild` | Yes | See below. |

### `identity`

| Field | Constraint |
| --- | --- |
| `id` | `^[a-z0-9][a-z0-9-]*$` |
| `packageName` | `^@baohaus/[a-z0-9][a-z0-9-]*$` |
| `packageVersion` | Semver `^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$` |
| `ociRepository` | `^baohaus/[a-z0-9][a-z0-9-]*$` |
| `registryNamespace` | Must be `"baohaus"`. |

`identity.id` MUST equal the suffix after `@baohaus/` in `packageName` and the suffix after `baohaus/` in `ociRepository`. [`../scripts/bao-build.ts`](../scripts/bao-build.ts) and `validate:registry-parity` enforce this.

### `classification`

| Field | Allowed values |
| --- | --- |
| `channel` | `public`, `internal`, `test`, `labs` |
| `visibility` | `public`, `hidden` |
| `packageKind` | `library`, `runtime-package`, `extension`, `internal`, `test` |

### `runtime`

| Field | Type |
| --- | --- |
| `installable` | `boolean` — declares whether BaoInstall may activate this archive. |
| `composeDependencies` | `string[]` — package names the runtime must compose alongside this one. |

### `publish`

| Field | Type |
| --- | --- |
| `gateProfile` | Non-empty string naming the publish gate profile (for example `"standard"`). |

### `dependencies[]`

| Field | Constraint |
| --- | --- |
| `name` | `^@baohaus/[a-z0-9][a-z0-9-]*$` |
| `version` | Semver. |
| `ociRepository` | `^baohaus/[a-z0-9][a-z0-9-]*$` |
| `ociDigest` | `sha256:<64 hex>` or `null` (null only before first publish). |
| `integrity` | `sha(256\|384\|512)-<base64>` or `null`. |
| `signature` | Object with `provider` and `bundle`, or `null`. |

### `reproducibleBuild`

| Field | Type |
| --- | --- |
| `sourceDateEpoch` | Non-negative integer Unix epoch. |
| `toolchain.bun` | Bun version pinned as `^\d+\.\d+\.\d+$`. |

---

## 4. Target Kinds: Full Reference

Installable archives carry an in-archive **install manifest** keyed by `targets[]`. Each target object MUST set `kind` to one of the 18 literals below, and is validated by the TypeBox union exported from [`../../bao-source/flow-dumpling/src/shared/bao/bao-install.schemas.ts`](../../bao-source/flow-dumpling/src/shared/bao/bao-install.schemas.ts). Every kind also accepts the [base fields](#5-target-base-fields).

### `bao-package`

Materialises a Bao package into the install root.

| Field | Required | Type |
| --- | --- | --- |
| `packageName` | Yes | string |
| `packageVersion` | Yes | string |
| `dependencyLock` | Yes | array of `{ name, version, dependencies?: string[] }` |
| `sharedPayload` | Yes | boolean |
| `platformPayloads` | Yes | `Record<string, boolean>` |
| `surfaces` | Yes | array, items from `esm`, `cjs`, `bin`, `nativeAddon`, `postinstall` |
| `requestedVersion` | No | string |
| `exports` | No | string |
| `bin` | No | string |
| `archivePath` | No | string |

```json
{
  "kind": "bao-package",
  "target": "bao-boss",
  "packageName": "@baohaus/bao-boss",
  "packageVersion": "0.1.0",
  "dependencyLock": [],
  "sharedPayload": true,
  "platformPayloads": { "linux-x64": true },
  "surfaces": ["esm"]
}
```

### `htmx-extension`

| Field | Required | Type |
| --- | --- | --- |
| `extension` | Yes | string |
| `route` | No | `public` \| `authenticated` \| `admin` |
| `priority` | No | integer ≥ 0 |

```json
{ "kind": "htmx-extension", "target": "baofire-core", "extension": "@baohaus/baofire-core/htmx" }
```

### `prisma-extension`

| Field | Required | Type |
| --- | --- | --- |
| `extension` | Yes | string |
| `requiresApply` | No | boolean |

### `better-auth-extension`

| Field | Required | Type |
| --- | --- | --- |
| `provider` | Yes | string |
| `configPath` | No | string |

### `elysia-plugin`

| Field | Required | Type |
| --- | --- | --- |
| `plugin` | Yes | string |
| `route` | No | string |
| `enabled` | No | boolean |

```json
{ "kind": "elysia-plugin", "target": "anthro-pao", "plugin": "@baohaus/anthro-pao" }
```

### `baodown-node`

| Field | Required | Type |
| --- | --- | --- |
| `nodeModule` | Yes | string |
| `typeId` | No | string |

### `mcp-provider`

Two mutually exclusive shapes: module-backed sets `provider`; inline-inventory sets `tools[]` (`minItems: 1`).

```json
{ "kind": "mcp-provider", "target": "tool-provider", "tools": ["search", "fetch"] }
```

### `bun-plugin`

| Field | Required | Type |
| --- | --- | --- |
| `plugin` | Yes | string |
| `runtimeRegistration` | No | boolean |

### `flatbuffer-schema`

| Field | Required | Type |
| --- | --- | --- |
| `schemaPath` | Yes | string |
| `outputDir` | No | string |

### `hardware-driver`

| Field | Required | Type |
| --- | --- | --- |
| `driverPackage` | Yes | string |
| `deviceTypes` | Yes | string[] (`minItems: 1`) |
| `transport` | Yes | string |
| `version` | No | string |

### `ai-model`

| Field | Required | Type |
| --- | --- | --- |
| `model` | Yes | string |
| `provider` | No | `huggingface` \| `onnx` \| `ramalama` |
| `runtime` | No | string |

### `baodown-flow`

| Field | Required | Type |
| --- | --- | --- |
| `definition` | Yes | string |
| `version` | No | string |
| `schedule` | No | string |

### `bunbuddy-contract`

| Field | Required | Type |
| --- | --- | --- |
| `contract` | Yes | string |
| `bunbuddyKind` | No | string |

### `bao-workload` (canonical kind)

All fields are required strings: `bunbuddyKind`, `component`, `executionMode`, `runtime`, `providers`, `hostPlatforms`, `hostArchitectures`, `imagePlatforms`, `tenancy`, `resources`, `scheduling`, `network`, `cleanup`, `notes`. The string fields encode the workload descriptor verbatim; consumers parse them.

### `config-overlay`

| Field | Required | Type |
| --- | --- | --- |
| `section` | Yes | string |
| `overlay` | Yes | `Record<string, string \| number \| boolean>` |

### `oci-image`

| Field | Required | Type |
| --- | --- | --- |
| `image` | Yes | string |
| `tag` | No | string |
| `registry` | No | string |
| `context` | No | string |
| `containerfile` | No | string |
| `platforms` | No | string[] (`minItems: 1`) |
| `architectures` | No | string[] (`minItems: 1`) |

### `usd-scene`

| Field | Required | Type |
| --- | --- | --- |
| `scene` | Yes | string |
| `format` | Yes | `usda` \| `usdc` \| `usdz` |
| `compositionMode` | No | string |
| `experienceId` | No | string |
| `targetPrimPath` | No | string |
| `variantSelections` | No | string |
| `resolverSearchPaths` | No | string |
| `validationProfile` | No | string |
| `storageBucket` | No | string |

### `ui-component-kit`

| Field | Required | Type |
| --- | --- | --- |
| `kitId` | Yes | `^[a-z0-9][a-z0-9-]*$` |
| `daisyUiVersionRange` | Yes | string |
| `tailwindVersionRange` | Yes | string |
| `components` | Yes | array (`minItems: 1`) of `{ name, entrypoint, displayName, category }` |
| `themes` | No | string[] |

`components[].category` is one of `action`, `data-display`, `data-entry`, `feedback`, `layout`, `navigation`, `overlay`, `typography`.

---

## 5. Target Base Fields

Every target kind inherits the following base fields:

| Field | Required | Notes |
| --- | --- | --- |
| `target` | Yes | Unique identifier inside the manifest. |
| `mcpMetadata` | No | `{ description?, docsPath?, tags?, attributes? }` for MCP discoverability. |
| `before` | No | `string[]` — targets that must activate after this one. |
| `after` | No | `string[]` — targets that must activate before this one. |
| `healthcheck` | No | Probe config (see below). |
| `environment` | No | Array of env-var declarations (see below). |
| `checksum` | No | `{ algorithm: "sha256" \| "sha1", value }` for the target payload. |
| `signature` | No | `{ algorithm: "ed25519" \| "rsa", value, keyId? }`. |
| `dependencies` | No | Array of `{ target, required?, minVersion? }` declaring intra-archive deps. |

### Target-level `healthcheck`

```json
{
  "readinessPath": "/health/ready",
  "livenessPath": "/health/live",
  "port": 3000,
  "initialDelaySeconds": 5,
  "periodSeconds": 10
}
```

### Target-level `environment[]`

```json
{
  "name": "API_TOKEN",
  "description": "OAuth bearer used by the runtime adapter",
  "required": true,
  "default": null,
  "sensitive": true
}
```

`name` must match `^[A-Z_][A-Z0-9_]*$`.

---

## 6. Metadata Fields

The install manifest's `metadata` block declares package-level identity and runtime hints:

| Field | Required | Notes |
| --- | --- | --- |
| `name` | Yes | `minLength: 1`. |
| `version` | Yes | `minLength: 1` (semver recommended). |
| `description` | No | Human-readable description. |
| `source` | No | Source identifier. |
| `minSchemaVersion` | No | Integer ≥ 1; reject if runtime schema version is older. |
| `checksum` | No | Manifest-level integrity (sha256/sha1). |
| `signature` | No | Manifest-level signature (ed25519/rsa). |
| `environment` | No | Array of env-var declarations (same shape as targets). |
| `healthcheck` | No | `{ path, intervalMs }` (intervalMs ≥ 1000). |
| `lifecycle` | No | `{ hotInstallable, restartRequired }` booleans. |

---

## 7. Trust and Integrity

Three layers cover trust:

1. **Manifest digest.** [`../scripts/bao-build.ts`](../scripts/bao-build.ts) writes the signed canonical `manifest.json` plus `manifest.signature`. The validator recomputes the manifest checksum from canonical content and rejects mismatches. The reference checksum routine strips `checksum`, `signature`, and `$schema`, sorts keys, and serialises with no whitespace before hashing.

2. **Signature bundle.** `manifest.signature` proves the signed canonical manifest payload. Each `dependencies[].signature` and each `bao.lock` resolved row's `signature` block uses `{ provider, bundle }` so the registry can verify supply-chain attestations end-to-end.

3. **OCI digest pinning.** Once published, every dependency must record `ociDigest` (`sha256:<64 hex>`) and `integrity` (subresource-integrity form). `bao.lock` rows additionally record `resolvedFrom` (`oci-registry` or `pending-publish`); `pending-publish` is forbidden in any release artefact.

---

## 8. Dependencies and Ordering

### Repo-level (`bao-governance.json` / `bao.lock`)

Governance dependencies declare the upstream Baohaus packages a release pulls in. The lockfile fixes those rows to OCI digests:

```json
{
  "schemaVersion": 1,
  "id": "anthro-pao",
  "packageName": "@baohaus/anthro-pao",
  "packageVersion": "0.1.0",
  "resolved": [
    {
      "name": "@baohaus/chili-oil-errors",
      "version": "0.1.0",
      "ociRepository": "baohaus/chili-oil-errors",
      "ociDigest": "sha256:...",
      "integrity": "sha256-...",
      "signature": { "provider": "baohaus/forge", "bundle": "..." },
      "resolvedFrom": "oci-registry"
    }
  ]
}
```

`runtime.composeDependencies[]` declares the additional packages the runtime must compose at install time but does not pin (the registry resolves them at activation).

### Install-manifest ordering

Targets coordinate activation through `before[]`, `after[]`, and target-level `dependencies[]`. The install plane builds a directed graph from these hints, runs a topological sort, and rejects cycles. Inter-archive dependency declarations live in the install manifest's optional `dependencies[]` array (`{ name, version?, required }`).

---

## 9. Platform Slices

The canonical TAR layout is **unified**: there is one set of payload files under `payload/shared/` and one set per supported platform under `payload/platforms/<platform-id>/`. Every supported platform id carries a `.bao.keep` marker even when empty so the archive shape is invariant.

For multi-platform workloads the `bao-workload` target encodes platform, architecture, and tenancy descriptors as opaque strings (`hostPlatforms`, `hostArchitectures`, `imagePlatforms`, `tenancy`, `resources`, `scheduling`, `network`, `cleanup`, `notes`). The `oci-image` target accepts optional `platforms[]` and `architectures[]` arrays to express multi-arch image fan-out.

---

## 10. Runtime Concepts

The runtime plane (`bao-runtime`) exposes BaoInstall, which moves a `.bao` archive through three states:

- **Stage** — fetch from the registry, verify the manifest digest, signature, and `bao.lock` rows, then unpack into a staging root.
- **Activate** — apply each target through its adapter in topological order, run health probes per `metadata.healthcheck` and `targets[].healthcheck`, and surface `restartRequired` from `metadata.lifecycle` when activation cannot be hot-applied.
- **Rollback** — revert to the previously activated archive when activation fails or the operator rejects the new state. `runtime.installable: false` archives never enter this state machine and are pure metadata releases.

---

## 11. Creating a Manifest Step by Step

Use [`../../bao-source/anthro-pao`](../../bao-source/anthro-pao) and [`../../bao-source/tdz-tangyuan`](../../bao-source/tdz-tangyuan) as worked examples (both `library`, channel `public`, visibility `public`).

1. **Confirm the catalog row.** Open [`../../bao-packages/bao-packages.json`](../../bao-packages/bao-packages.json) and verify the package's `id`, `packageName`, `packageVersion`, `ociRepository`, `channel`, `visibility`, and `packageKind` are correct. Add a row first if the package is new.
2. **Author `bao-governance.json`.** Set `schemaVersion: 1`, `specRevision: "1.0.0"`, the v1 media type, `formatKind: "canonical"`, `manifestEncoding: "json"`, and the matching `identity`, `classification`, `runtime`, `publish`, `dependencies`, `sbom`, `provenance`, and `reproducibleBuild` blocks.
3. **Resolve `bao.lock`.** Run the dependency-resolution tooling so every Baohaus dependency carries `ociDigest`, `integrity`, `signature`, and `resolvedFrom: "oci-registry"`.
4. **Run `bun run bao:build`.** [`../scripts/bao-build.ts`](../scripts/bao-build.ts) canonicalises and signs the install manifest, generates the SBOM and SLSA in-toto provenance, and packs the deterministic ustar TAR into `dist/bao/<id>.bao`.
5. **Run `bun run bao:validate`.** [`../scripts/bao-validate.ts`](../scripts/bao-validate.ts) re-extracts the archive, recomputes the digest, and re-checks every required member, dependency row, and `bao.lock` resolution state.

---

## 12. Validation Pipeline

The mandatory order is:

1. `bun run typecheck`
2. `bun run lint`
3. `bun test`
4. `bun run build`
5. `bun run bao:build` — produces `dist/bao/<id>.bao` from `package.json`, `bao-governance.json`, `bao.lock`, the declared SBOM, and the declared provenance file.
6. `bun run bao:validate` — re-reads the archive, asserts schema version 1, the v1 media type, signed manifest integrity, presence of every required member, and that no `bao.lock` row remains `pending-publish`.
7. `bun run validate:registry-parity` — asserts catalog, governance, lock, and `package.json` agree on identity.
8. `bun run validate:bao-dependency-closure` — asserts every transitive Baohaus dependency is declared, locked, and reachable from the registry namespace.
9. `bun run validate:all` and `bun run validate:strict` — run the full Baohaus policy suite (no workspace deps, no manifest drift, no monoliths, design-token discipline, etc.).

`bao:validate` is summarised by [`../scripts/bao-validate.ts`](../scripts/bao-validate.ts):

- Asserts `dist/bao/<id>.bao` exists.
- Asserts the archive is a valid TAR readable by `tar -tf`.
- Reads signed `manifest.json` from the archive and rejects any manifest with invalid checksum, signature, schema version, media type, target payload, or local metadata parity.
- Walks `bao.lock.resolved[]` and rejects rows missing `ociDigest`, `integrity`, or `signature`, or still marked `pending-publish`.

---

## 13. Source Policy and Allowlists

Baohaus is **registry-first**. Every release artefact resolves Baohaus dependencies from the OCI registry under `baohaus/<id>` with explicit semver. `workspace:`, `catalog:`, `file:`, and `link:` dependencies are forbidden in published artefacts; local-dev redirection is allowed only via `package.json` `overrides` to `../bao-source/<id>` and must never appear in published archives.

`classification.channel` selects the audience and gate:

- `public` — externally consumable; full publish gate.
- `internal` — Baohaus-only; restricted distribution.
- `test` — pipeline fixtures; not for runtime install.
- `labs` — exploratory; pre-release-only.

`classification.visibility` is `public` (listed in catalog surfaces) or `hidden` (resolvable only by id).

`classification.packageKind` is one of `library`, `runtime-package`, `extension`, `internal`, `test`. The runtime install plane only activates archives whose `runtime.installable` is `true`.

---

## 14. Install API

The OCI Distribution v2 routes are exposed by `registry/src/server/app.ts` (`.bao Registry`). They cover `/v2/`, `/v2/<repo>/manifests/<reference>`, `/v2/<repo>/blobs/<digest>`, and the upload session endpoints. The contract document is `registry/docs/engineering/oci-transport-scope.md`.

The runtime consumer is `bao-runtime`'s BaoInstall:

- `bao-runtime/src/domains/packages/http/api/bao-registry.plugin.ts` — REST surface for listing, fetching, and activating `.bao` archives.
- `bao-runtime/src/domains/packages/services/bao-install/` — staging, activation, rollback.
- `bao-runtime/src/domains/system/services/` — OCI-style layered storage that backs the runtime catalog.

---

## 15. Examples

### Library (`@baohaus/anthro-pao`)

```json
{
  "$schema": "../../bao/schemas/bao-manifest-v1.schema.json",
  "schemaVersion": 1,
  "specRevision": "1.0.0",
  "mediaType": "application/vnd.baohaus.bao.archive.v1+tar",
  "formatKind": "canonical",
  "manifestEncoding": "json",
  "identity": {
    "id": "anthro-pao",
    "packageName": "@baohaus/anthro-pao",
    "packageVersion": "0.1.0",
    "ociRepository": "baohaus/anthro-pao",
    "registryNamespace": "baohaus"
  },
  "classification": {
    "channel": "public",
    "visibility": "public",
    "packageKind": "library"
  },
  "runtime": { "installable": true, "composeDependencies": [] },
  "publish": { "gateProfile": "standard" },
  "dependencies": [
    {
      "name": "@baohaus/chili-oil-errors",
      "version": "0.1.0",
      "ociRepository": "baohaus/chili-oil-errors",
      "ociDigest": null,
      "integrity": null,
      "signature": null
    }
  ],
  "sbom": "SBOM.cdx.json",
  "provenance": "SLSA.provenance.intoto.jsonl",
  "reproducibleBuild": {
    "sourceDateEpoch": 1745366400,
    "toolchain": { "bun": "1.3.13" }
  }
}
```

### Library / runtime-package (`@baohaus/tdz-tangyuan`)

Same shape as `anthro-pao`. Substitute `id`, `packageName`, `ociRepository`, and dependency rows. `tdz-tangyuan` also lives in the catalog as `library` / `public` / `public`.

### HTMX extension target (`@baohaus/baofire-core`)

The install manifest inside the archive carries an HTMX target alongside its base fields:

```json
{
  "kind": "htmx-extension",
  "target": "baofire-core",
  "extension": "@baohaus/baofire-core/htmx",
  "route": "authenticated",
  "priority": 10
}
```

### Bao package target (`@baohaus/bao-boss`)

```json
{
  "kind": "bao-package",
  "target": "bao-boss",
  "packageName": "@baohaus/bao-boss",
  "packageVersion": "0.1.0",
  "dependencyLock": [],
  "sharedPayload": true,
  "platformPayloads": { "linux-x64": true, "darwin-arm64": true },
  "surfaces": ["esm", "bin"]
}
```

### Multi-target install manifest

```json
{
  "schemaVersion": 1,
  "metadata": { "name": "baofire-core", "version": "0.1.0" },
  "targets": [
    { "kind": "elysia-plugin", "target": "baofire", "plugin": "@baohaus/baofire-core" },
    {
      "kind": "htmx-extension",
      "target": "baofire-ui",
      "extension": "@baohaus/baofire-core/htmx",
      "after": ["baofire"]
    }
  ]
}
```

---

## 16. Tooling Reference

All tooling runs under Bun. Direct `node` invocation is not supported.

| Command | Purpose |
| --- | --- |
| `bao bootstrap` | Install host workspace dependencies (frozen lockfile) and warm the `.bao` catalog. Use `bun run bootstrap` before the workspace-linked `bao` bin is available. |
| `bun run typecheck` | TypeScript project check. |
| `bun run lint` | Biome check (errors on warnings). |
| `bun test` | Unit/integration tests. |
| `bun run build` | Per-repo build (typecheck-only when no emit is needed). |
| `bun run bao:build` | Pack `dist/bao/<id>.bao` via [`../scripts/bao-build.ts`](../scripts/bao-build.ts). |
| `bun run bao:validate` | Re-validate the built archive via [`../scripts/bao-validate.ts`](../scripts/bao-validate.ts). |
| `bun run validate:no-workspace-deps` | Reject `workspace:`, `catalog:`, `file:`, `link:` deps. |
| `bun run validate:registry-parity` | Cross-check `package.json`, `bao-governance.json`, `bao.lock`, catalog. |
| `bun run validate:manifest-parity` | Cross-check the manifest against the catalog row for this package. |
| `bun run validate:no-workspace-package-hoarding` | Forbid hoarding upstream sources. |
| `bun run validate:bao-dependency-closure` | Walk the dependency closure and assert registry resolution. |
| `bun run validate:release-debt` | Surface unresolved release blockers. |
| `bun run validate:all` | Full split-policy gate suite. |
| `bun run validate:strict` | Strict superset; mandatory before commit. |

---

## 17. Pre-Publish Checklist

Run, in order, against a clean checkout of the target repo:

1. `bao bootstrap`
2. `bun run typecheck`
3. `bun run lint`
4. `bun test`
5. `bun run build`
6. `bun run bao:build`
7. `bun run bao:validate`
8. `bun run validate:no-workspace-deps`
9. `bun run validate:registry-parity`
10. `bun run validate:manifest-parity`
11. `bun run validate:no-workspace-package-hoarding`
12. `bun run validate:bao-dependency-closure`
13. `bun run validate:release-debt`
14. `bun run validate:all`
15. `bun run validate:strict`

Every gate is mandatory. `validate:strict` has no opt-out. If any step fails, fix the underlying issue and re-run from `bao bootstrap`; do not suppress findings to make a release pass.
