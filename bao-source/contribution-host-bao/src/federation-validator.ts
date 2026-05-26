/**
 * Runtime validator for the federation wire shape.
 *
 * Cross-origin federation orchestrators MUST validate incoming snapshot
 * payloads at parse time — types vanish at runtime and a malicious or
 * stale peer can ship arbitrary JSON. The validator returns a typed
 * Result discriminator (per the bao-platform Result convention) so
 * callers handle the rejection branch via control flow rather than
 * exceptions.
 *
 * Hand-rolled rather than TypeBox/Zod to keep this package free of a
 * runtime schema dependency; the wire shape is small + closed, and the
 * guard is exhaustive against the structural surface declared in
 * `./federation-wire`.
 *
 * @packageDocumentation
 */

import {
  FEDERATION_SNAPSHOT_SCHEMA_VERSION,
  type FederatedPeerIdentity,
  type FederationSnapshotSchemaVersion,
  PEER_CAPABILITY_TIER,
  type PeerCapabilityTier,
} from "./federation-wire.ts";

/**
 * Validated registration row — base contribution invariants confirmed by
 * the validator (`id` non-empty string, `extensionId` string). Surface-
 * specific fields are present on the wire but not statically refined
 * here; consumers narrow per-surface at the point of merging into a
 * local host (where `host.register()` performs the surface-specific
 * shape check via its typed signature).
 *
 * This two-tier typing (strong wire-shape on the producer side, permissive
 * validated-shape on the consumer side) is the documented industry-best-
 * practice pattern for cross-origin federation surfaces (precedent: AWS
 * SDK generated clients, Stripe Sigma replication wire shapes, OpenAPI
 * codegen output) — the producer's strong types describe the *intended*
 * wire; the validator returns the *observed* wire with structural
 * invariants checked, leaving optional-field refinement to the consumer
 * that actually accesses the field.
 */
export interface ValidatedFederatedRegistration {
  readonly id: string;
  readonly extensionId: string;
  readonly [extraField: string]: unknown;
}

/**
 * Validated surfaces — every surface bucket carries
 * {@link ValidatedFederatedRegistration} rows. Empty arrays preserved
 * for structural stability across peers.
 */
export interface ValidatedFederatedSurfaces {
  readonly sidebar: readonly ValidatedFederatedRegistration[];
  readonly settingsTab: readonly ValidatedFederatedRegistration[];
  readonly paletteEntryGroup: readonly ValidatedFederatedRegistration[];
  readonly apiGroup: readonly ValidatedFederatedRegistration[];
  readonly tileGroup: readonly ValidatedFederatedRegistration[];
  readonly topbar: readonly ValidatedFederatedRegistration[];
  readonly uiAssetPack: readonly ValidatedFederatedRegistration[];
}

/**
 * Validated envelope returned by the validator. Mirrors the wire shape
 * structurally but uses {@link ValidatedFederatedSurfaces} so the typed
 * surface refinement is the consumer's responsibility at merge time.
 */
export interface ValidatedFederatedSnapshot {
  readonly schemaVersion: FederationSnapshotSchemaVersion;
  readonly peer: FederatedPeerIdentity;
  readonly snapshotAt: string;
  readonly etag: string;
  readonly surfaces: ValidatedFederatedSurfaces;
}

/**
 * Result discriminator returned by the validator. Aligns with the
 * codebase's pervasive Rust/Effect-TS-style Result pattern; callers
 * branch on `result.ok` instead of catching exceptions.
 */
export type FederatedSnapshotValidationResult =
  | { readonly ok: true; readonly value: ValidatedFederatedSnapshot }
  | { readonly ok: false; readonly path: string; readonly reason: string };

function fail(path: string, reason: string): FederatedSnapshotValidationResult {
  return { ok: false, path, reason };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPeerCapabilityTier(value: unknown): value is PeerCapabilityTier {
  return (
    value === PEER_CAPABILITY_TIER.t0 ||
    value === PEER_CAPABILITY_TIER.t1 ||
    value === PEER_CAPABILITY_TIER.t2 ||
    value === PEER_CAPABILITY_TIER.t3
  );
}

type PeerIdentityResult =
  | { readonly admitted: true; readonly peer: FederatedPeerIdentity }
  | {
      readonly admitted: false;
      readonly path: string;
      readonly reason: string;
    };

function validatePeerIdentity(value: unknown): PeerIdentityResult {
  if (!isRecord(value)) {
    return { admitted: false, path: "peer", reason: "expected object" };
  }
  if (typeof value["peerId"] !== "string" || value["peerId"].length === 0) {
    return {
      admitted: false,
      path: "peer.peerId",
      reason: "expected non-empty string",
    };
  }
  if (typeof value["displayName"] !== "string") {
    return {
      admitted: false,
      path: "peer.displayName",
      reason: "expected string",
    };
  }
  if (typeof value["origin"] !== "string") {
    return { admitted: false, path: "peer.origin", reason: "expected string" };
  }
  if (typeof value["versionTag"] !== "string" || value["versionTag"].length === 0) {
    return {
      admitted: false,
      path: "peer.versionTag",
      reason: "expected non-empty string",
    };
  }
  if (!isPeerCapabilityTier(value["capabilityTier"])) {
    return {
      admitted: false,
      path: "peer.capabilityTier",
      reason: "expected one of t0|t1|t2|t3",
    };
  }
  return {
    admitted: true,
    peer: {
      peerId: value["peerId"],
      displayName: value["displayName"],
      origin: value["origin"],
      versionTag: value["versionTag"],
      capabilityTier: value["capabilityTier"],
    },
  };
}

type RegistrationArrayResult =
  | {
      readonly admitted: true;
      readonly array: readonly ValidatedFederatedRegistration[];
    }
  | {
      readonly admitted: false;
      readonly path: string;
      readonly reason: string;
    };

function validateRegistrationArray(value: unknown, path: string): RegistrationArrayResult {
  if (!Array.isArray(value)) {
    return { admitted: false, path, reason: "expected array" };
  }
  const out: ValidatedFederatedRegistration[] = [];
  for (let i = 0; i < value.length; i += 1) {
    const entry = value[i];
    if (!isRecord(entry)) {
      return {
        admitted: false,
        path: `${path}[${i}]`,
        reason: "expected object",
      };
    }
    const idValue = entry["id"];
    if (typeof idValue !== "string" || idValue.length === 0) {
      return {
        admitted: false,
        path: `${path}[${i}].id`,
        reason: "expected non-empty string",
      };
    }
    const extensionIdValue = entry["extensionId"];
    if (typeof extensionIdValue !== "string") {
      return {
        admitted: false,
        path: `${path}[${i}].extensionId`,
        reason: "expected string",
      };
    }
    out.push({ ...entry, id: idValue, extensionId: extensionIdValue });
  }
  return { admitted: true, array: out };
}

type SurfacesResult =
  | {
      readonly admitted: true;
      readonly surfaces: ValidatedFederatedSurfaces;
    }
  | {
      readonly admitted: false;
      readonly path: string;
      readonly reason: string;
    };

function validateSurfaces(value: unknown): SurfacesResult {
  if (!isRecord(value)) {
    return { admitted: false, path: "surfaces", reason: "expected object" };
  }
  const sidebar = validateRegistrationArray(value["sidebar"], "surfaces.sidebar");
  if (sidebar.admitted === false) {
    return sidebar;
  }
  const settingsTab = validateRegistrationArray(value["settingsTab"], "surfaces.settingsTab");
  if (settingsTab.admitted === false) {
    return settingsTab;
  }
  const paletteEntryGroup = validateRegistrationArray(
    value["paletteEntryGroup"],
    "surfaces.paletteEntryGroup",
  );
  if (paletteEntryGroup.admitted === false) {
    return paletteEntryGroup;
  }
  const apiGroup = validateRegistrationArray(value["apiGroup"], "surfaces.apiGroup");
  if (apiGroup.admitted === false) {
    return apiGroup;
  }
  const tileGroup = validateRegistrationArray(value["tileGroup"], "surfaces.tileGroup");
  if (tileGroup.admitted === false) {
    return tileGroup;
  }
  const topbar = validateRegistrationArray(value["topbar"], "surfaces.topbar");
  if (topbar.admitted === false) {
    return topbar;
  }
  const uiAssetPack = validateRegistrationArray(value["uiAssetPack"], "surfaces.uiAssetPack");
  if (uiAssetPack.admitted === false) {
    return uiAssetPack;
  }
  return {
    admitted: true,
    surfaces: {
      sidebar: sidebar.array,
      settingsTab: settingsTab.array,
      paletteEntryGroup: paletteEntryGroup.array,
      apiGroup: apiGroup.array,
      tileGroup: tileGroup.array,
      topbar: topbar.array,
      uiAssetPack: uiAssetPack.array,
    },
  };
}

/**
 * Validate a freshly-parsed JSON value against the federation wire
 * shape. Returns `{ ok: true, value }` on success, or `{ ok: false,
 * path, reason }` pointing at the first structural mismatch.
 */
export function validateFederatedContributionSnapshot(
  value: unknown,
): FederatedSnapshotValidationResult {
  if (!isRecord(value)) {
    return fail("$", "expected object");
  }
  if (value["schemaVersion"] !== FEDERATION_SNAPSHOT_SCHEMA_VERSION) {
    return fail("schemaVersion", `expected ${FEDERATION_SNAPSHOT_SCHEMA_VERSION}`);
  }
  const peer = validatePeerIdentity(value["peer"]);
  if (peer.admitted === false) {
    return fail(peer.path, peer.reason);
  }
  if (typeof value["snapshotAt"] !== "string") {
    return fail("snapshotAt", "expected ISO-8601 string");
  }
  if (typeof value["etag"] !== "string" || value["etag"].length === 0) {
    return fail("etag", "expected non-empty string");
  }
  const surfaces = validateSurfaces(value["surfaces"]);
  if (surfaces.admitted === false) {
    return fail(surfaces.path, surfaces.reason);
  }
  return {
    ok: true,
    value: {
      schemaVersion: FEDERATION_SNAPSHOT_SCHEMA_VERSION,
      peer: peer.peer,
      snapshotAt: value["snapshotAt"],
      etag: value["etag"],
      surfaces: surfaces.surfaces,
    },
  };
}
