import type { Builder } from "@baohaus/flatbuf-bao/builder";
/**
 * Wrapture bao-manifest protocol.
 *
 * Encode/decode BaoInstallManifestV1 for binary transport.
 * Enables efficient serialization of `.bao` install manifests
 * for caching and cross-service transport.
 *
 * @packageDocumentation
 */

import { BaoHardwareRequirementV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baoinstall/v1/bao-hardware-requirement-v1";
import { BaoInstallManifestV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baoinstall/v1/bao-install-manifest-v1";
import { BaoInstallTargetV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baoinstall/v1/bao-install-target-v1";
import { BaoLifecycleHooksV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baoinstall/v1/bao-lifecycle-hooks-v1";
import { BaoPermissionScope } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baoinstall/v1/bao-permission-scope";
import { BaoPermissionV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/baoinstall/v1/bao-permission-v1";
import {
  BAO_INSTALL_TARGET_KINDS,
  type BaoInstallTargetKind,
} from "@baohaus/bao-schemas/bao-install/core.schemas";

import { withPooledBuilder, withPooledByteBuffer } from "../builder-pool";
import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "../defaults";
import { recordDecode, recordDecodeError, recordEncode, startTiming } from "../metrics";

const BUILDER_CAPACITY = 512;

/** Input for a single install target. */
export interface ManifestTargetEncodeInput {
  /** Canonical `.bao` target kind (e.g. "elysia-plugin", "htmx-extension"). */
  kind: BaoInstallTargetKind;
  /** Stable target identifier. */
  id: string;
  /** Runtime module specifier (only present for extension targets). */
  moduleId?: string;
  /** JSON-encoded target configuration. */
  configJson?: string;
}

/** FlatBuffers permission scope values exposed by the manifest protocol. */
type BaoManifestPermissionScope = "read" | "write" | "execute" | "admin" | "network" | "hardware";

const VALID_BAO_TARGET_KINDS: Set<unknown> = new Set<string>(
  Object.values(BAO_INSTALL_TARGET_KINDS),
);

/** Input for one hardware requirement entry. */
interface BaoManifestHardwareEncodeInput {
  /** Device class required by the package. */
  deviceKind: string;
  /** Optional vendor identifier. */
  vendorId?: string;
  /** Optional product identifier. */
  productId?: string;
  /** Minimum memory requirement in megabytes. */
  minMemoryMb?: number;
  /** Required driver name or module. */
  driver?: string;
  /** Whether the dependency is optional. */
  optional?: boolean;
}

/** Input for one permission requirement entry. */
interface BaoManifestPermissionEncodeInput {
  /** Permission scope level. */
  scope: BaoManifestPermissionScope;
  /** Resource string bound to the permission. */
  resource: string;
  /** Human-readable justification for the permission. */
  reason: string;
}

/** Input for lifecycle hook declarations. */
interface BaoManifestLifecycleHooksEncodeInput {
  /** Hook invoked before install. */
  preInstall?: string;
  /** Hook invoked after install. */
  postInstall?: string;
  /** Hook invoked before uninstall. */
  preUninstall?: string;
  /** Hook invoked after uninstall. */
  postUninstall?: string;
  /** Health-check endpoint or probe identifier. */
  healthCheck?: string;
}

/** Input for encoding a manifest. */
export interface BaoManifestEncodeInput {
  /** Manifest name. */
  name: string;
  /** Manifest version. */
  version: string;
  /** Human-readable description. */
  description?: string;
  /** Install targets. */
  targets: ManifestTargetEncodeInput[];
  /** JSON-encoded additional metadata. */
  metadataJson?: string;
  /** ISO 8601 creation timestamp. */
  createdAt?: string;
  /** Hardware requirements declared by the package. */
  hardware?: BaoManifestHardwareEncodeInput[];
  /** Runtime constraints such as Bun or engine version requirements. */
  runtimeConstraints?: string[];
  /** Permissions required by the package. */
  permissions?: BaoManifestPermissionEncodeInput[];
  /** Lifecycle hooks declared by the package. */
  hooks?: BaoManifestLifecycleHooksEncodeInput;
  /** SHA-256 checksum for the packaged content. */
  checksumSha256?: string;
  /** Detached signature for the manifest payload. */
  signature?: string;
}

/** Decoded install target. */
export interface ManifestTargetDecoded {
  kind: BaoInstallTargetKind | null;
  id: string | null;
  moduleId: string | null;
  configJson: string | null;
}

/** Decoded hardware requirement. */
interface BaoManifestHardwareDecoded {
  /** Device class required by the package. */
  deviceKind: string | null;
  /** Optional vendor identifier. */
  vendorId: string | null;
  /** Optional product identifier. */
  productId: string | null;
  /** Minimum memory requirement in megabytes. */
  minMemoryMb: number;
  /** Required driver name or module. */
  driver: string | null;
  /** Whether the dependency is optional. */
  optional: boolean;
}

/** Decoded permission declaration. */
interface BaoManifestPermissionDecoded {
  /** Permission scope level. */
  scope: BaoManifestPermissionScope | null;
  /** Resource string bound to the permission. */
  resource: string | null;
  /** Human-readable justification for the permission. */
  reason: string | null;
}

/** Decoded lifecycle hook declarations. */
interface BaoManifestLifecycleHooksDecoded {
  /** Hook invoked before install. */
  preInstall: string | null;
  /** Hook invoked after install. */
  postInstall: string | null;
  /** Hook invoked before uninstall. */
  preUninstall: string | null;
  /** Hook invoked after uninstall. */
  postUninstall: string | null;
  /** Health-check endpoint or probe identifier. */
  healthCheck: string | null;
}

/** Decoded manifest. */
export interface BaoManifestDecoded {
  name: string | null;
  version: string | null;
  description: string | null;
  targets: ManifestTargetDecoded[];
  metadataJson: string | null;
  createdAt: string | null;
  hardware: BaoManifestHardwareDecoded[];
  runtimeConstraints: string[];
  permissions: BaoManifestPermissionDecoded[];
  hooks: BaoManifestLifecycleHooksDecoded | null;
  checksumSha256: string | null;
  signature: string | null;
}

function toPermissionScopeEnum(scope: BaoManifestPermissionScope): BaoPermissionScope {
  switch (scope) {
    case "read":
      return BaoPermissionScope.Read;
    case "write":
      return BaoPermissionScope.Write;
    case "execute":
      return BaoPermissionScope.Execute;
    case "admin":
      return BaoPermissionScope.Admin;
    case "network":
      return BaoPermissionScope.Network;
    case "hardware":
      return BaoPermissionScope.Hardware;
  }
}

function fromPermissionScopeEnum(scope: BaoPermissionScope): BaoManifestPermissionScope | null {
  switch (scope) {
    case BaoPermissionScope.Read:
      return "read";
    case BaoPermissionScope.Write:
      return "write";
    case BaoPermissionScope.Execute:
      return "execute";
    case BaoPermissionScope.Admin:
      return "admin";
    case BaoPermissionScope.Network:
      return "network";
    case BaoPermissionScope.Hardware:
      return "hardware";
    default:
      return null;
  }
}

interface BaoManifestStringOffsets {
  name: number;
  version: number;
  description: number;
  metadataJson: number;
  createdAt: number;
  checksumSha256: number;
  signature: number;
}

interface BaoManifestVectorOffsets {
  targets: number;
  hardware: number;
  runtimeConstraints: number;
  permissions: number;
  hooks: number;
}

function createOptionalString(builder: Builder, value: string | undefined): number {
  return value ? builder.createString(value) : 0;
}

function prepareManifestStringOffsets(
  builder: Builder,
  input: BaoManifestEncodeInput,
): BaoManifestStringOffsets {
  return {
    name: builder.createString(input.name),
    version: builder.createString(input.version),
    description: createOptionalString(builder, input.description),
    metadataJson: createOptionalString(builder, input.metadataJson),
    createdAt: createOptionalString(builder, input.createdAt),
    checksumSha256: createOptionalString(builder, input.checksumSha256),
    signature: createOptionalString(builder, input.signature),
  };
}

function encodeManifestTarget(builder: Builder, target: ManifestTargetEncodeInput): number {
  const kindOffset = builder.createString(target.kind);
  const idOffset = builder.createString(target.id);
  const moduleOffset = createOptionalString(builder, target.moduleId);
  const configOffset = createOptionalString(builder, target.configJson);

  BaoInstallTargetV1.startBaoInstallTargetV1(builder);
  BaoInstallTargetV1.addKind(builder, kindOffset);
  BaoInstallTargetV1.addId(builder, idOffset);
  if (moduleOffset) {
    BaoInstallTargetV1.addModuleId(builder, moduleOffset);
  }
  if (configOffset) {
    BaoInstallTargetV1.addConfigJson(builder, configOffset);
  }
  return BaoInstallTargetV1.endBaoInstallTargetV1(builder);
}

function createTargetsVector(
  builder: Builder,
  targets: readonly ManifestTargetEncodeInput[],
): number {
  return BaoInstallManifestV1.createTargetsVector(
    builder,
    targets.map((target) => encodeManifestTarget(builder, target)),
  );
}

function encodeHardwareRequirement(
  builder: Builder,
  requirement: BaoManifestHardwareEncodeInput,
): number {
  const deviceKindOffset = builder.createString(requirement.deviceKind);
  const vendorIdOffset = createOptionalString(builder, requirement.vendorId);
  const productIdOffset = createOptionalString(builder, requirement.productId);
  const driverOffset = createOptionalString(builder, requirement.driver);

  BaoHardwareRequirementV1.startBaoHardwareRequirementV1(builder);
  BaoHardwareRequirementV1.addDeviceKind(builder, deviceKindOffset);
  if (vendorIdOffset) {
    BaoHardwareRequirementV1.addVendorId(builder, vendorIdOffset);
  }
  if (productIdOffset) {
    BaoHardwareRequirementV1.addProductId(builder, productIdOffset);
  }
  if (requirement.minMemoryMb !== undefined) {
    BaoHardwareRequirementV1.addMinMemoryMb(
      builder,
      Math.max(0, Math.trunc(requirement.minMemoryMb)),
    );
  }
  if (driverOffset) {
    BaoHardwareRequirementV1.addDriver(builder, driverOffset);
  }
  if (requirement.optional !== undefined) {
    BaoHardwareRequirementV1.addOptional(builder, requirement.optional);
  }
  return BaoHardwareRequirementV1.endBaoHardwareRequirementV1(builder);
}

function createHardwareVector(
  builder: Builder,
  hardware: readonly BaoManifestHardwareEncodeInput[] | undefined,
): number {
  const hardwareOffsets = (hardware ?? []).map((requirement) =>
    encodeHardwareRequirement(builder, requirement),
  );
  return hardwareOffsets.length > 0
    ? BaoInstallManifestV1.createHardwareVector(builder, hardwareOffsets)
    : 0;
}

function createRuntimeConstraintsVector(
  builder: Builder,
  runtimeConstraints: readonly string[] | undefined,
): number {
  const runtimeConstraintOffsets = (runtimeConstraints ?? []).map((constraint) =>
    builder.createString(constraint),
  );
  return runtimeConstraintOffsets.length > 0
    ? BaoInstallManifestV1.createRuntimeConstraintsVector(builder, runtimeConstraintOffsets)
    : 0;
}

function encodeManifestPermission(
  builder: Builder,
  permission: BaoManifestPermissionEncodeInput,
): number {
  const resourceOffset = builder.createString(permission.resource);
  const reasonOffset = builder.createString(permission.reason);

  BaoPermissionV1.startBaoPermissionV1(builder);
  BaoPermissionV1.addScope(builder, toPermissionScopeEnum(permission.scope));
  BaoPermissionV1.addResource(builder, resourceOffset);
  BaoPermissionV1.addReason(builder, reasonOffset);
  return BaoPermissionV1.endBaoPermissionV1(builder);
}

function createPermissionsVector(
  builder: Builder,
  permissions: readonly BaoManifestPermissionEncodeInput[] | undefined,
): number {
  const permissionOffsets = (permissions ?? []).map((permission) =>
    encodeManifestPermission(builder, permission),
  );
  return permissionOffsets.length > 0
    ? BaoInstallManifestV1.createPermissionsVector(builder, permissionOffsets)
    : 0;
}

function createLifecycleHooks(
  builder: Builder,
  hooks: BaoManifestLifecycleHooksEncodeInput | undefined,
): number {
  if (!hooks) {
    return 0;
  }

  const preInstallOffset = createOptionalString(builder, hooks.preInstall);
  const postInstallOffset = createOptionalString(builder, hooks.postInstall);
  const preUninstallOffset = createOptionalString(builder, hooks.preUninstall);
  const postUninstallOffset = createOptionalString(builder, hooks.postUninstall);
  const healthCheckOffset = createOptionalString(builder, hooks.healthCheck);

  BaoLifecycleHooksV1.startBaoLifecycleHooksV1(builder);
  if (preInstallOffset) {
    BaoLifecycleHooksV1.addPreInstall(builder, preInstallOffset);
  }
  if (postInstallOffset) {
    BaoLifecycleHooksV1.addPostInstall(builder, postInstallOffset);
  }
  if (preUninstallOffset) {
    BaoLifecycleHooksV1.addPreUninstall(builder, preUninstallOffset);
  }
  if (postUninstallOffset) {
    BaoLifecycleHooksV1.addPostUninstall(builder, postUninstallOffset);
  }
  if (healthCheckOffset) {
    BaoLifecycleHooksV1.addHealthCheck(builder, healthCheckOffset);
  }
  return BaoLifecycleHooksV1.endBaoLifecycleHooksV1(builder);
}

function createManifestRoot(
  builder: Builder,
  stringOffsets: BaoManifestStringOffsets,
  vectorOffsets: BaoManifestVectorOffsets,
): number {
  BaoInstallManifestV1.startBaoInstallManifestV1(builder);
  BaoInstallManifestV1.addName(builder, stringOffsets.name);
  BaoInstallManifestV1.addVersion(builder, stringOffsets.version);
  BaoInstallManifestV1.addDescription(builder, stringOffsets.description);
  BaoInstallManifestV1.addTargets(builder, vectorOffsets.targets);
  BaoInstallManifestV1.addMetadataJson(builder, stringOffsets.metadataJson);
  BaoInstallManifestV1.addCreatedAt(builder, stringOffsets.createdAt);
  if (vectorOffsets.hardware) {
    BaoInstallManifestV1.addHardware(builder, vectorOffsets.hardware);
  }
  if (vectorOffsets.runtimeConstraints) {
    BaoInstallManifestV1.addRuntimeConstraints(builder, vectorOffsets.runtimeConstraints);
  }
  if (vectorOffsets.permissions) {
    BaoInstallManifestV1.addPermissions(builder, vectorOffsets.permissions);
  }
  if (vectorOffsets.hooks) {
    BaoInstallManifestV1.addHooks(builder, vectorOffsets.hooks);
  }
  if (stringOffsets.checksumSha256) {
    BaoInstallManifestV1.addChecksumSha256(builder, stringOffsets.checksumSha256);
  }
  if (stringOffsets.signature) {
    BaoInstallManifestV1.addSignature(builder, stringOffsets.signature);
  }
  return BaoInstallManifestV1.endBaoInstallManifestV1(builder);
}

function decodeManifestTargets(root: BaoInstallManifestV1): ManifestTargetDecoded[] {
  const targets: ManifestTargetDecoded[] = [];

  for (let index = 0; index < root.targetsLength(); index += 1) {
    const target = root.targets(index);
    if (!target) {
      continue;
    }

    const kindValue = target.kind();
    const kind: BaoInstallTargetKind | null =
      kindValue && VALID_BAO_TARGET_KINDS.has(kindValue)
        ? (kindValue as BaoInstallTargetKind)
        : null;

    targets.push({
      kind,
      id: target.id(),
      moduleId: target.moduleId(),
      configJson: target.configJson(),
    });
  }

  return targets;
}

function decodeManifestHardware(root: BaoInstallManifestV1): BaoManifestHardwareDecoded[] {
  const hardware: BaoManifestHardwareDecoded[] = [];

  for (let index = 0; index < root.hardwareLength(); index += 1) {
    const requirement = root.hardware(index);
    if (!requirement) {
      continue;
    }

    hardware.push({
      deviceKind: requirement.deviceKind(),
      vendorId: requirement.vendorId(),
      productId: requirement.productId(),
      minMemoryMb: requirement.minMemoryMb(),
      driver: requirement.driver(),
      optional: requirement.optional(),
    });
  }

  return hardware;
}

function decodeManifestRuntimeConstraints(root: BaoInstallManifestV1): string[] {
  const runtimeConstraints: string[] = [];

  for (let index = 0; index < root.runtimeConstraintsLength(); index += 1) {
    const constraint = root.runtimeConstraints(index);
    if (typeof constraint === "string") {
      runtimeConstraints.push(constraint);
    }
  }

  return runtimeConstraints;
}

function decodeManifestPermissions(root: BaoInstallManifestV1): BaoManifestPermissionDecoded[] {
  const permissions: BaoManifestPermissionDecoded[] = [];

  for (let index = 0; index < root.permissionsLength(); index += 1) {
    const permission = root.permissions(index);
    if (!permission) {
      continue;
    }

    permissions.push({
      scope: fromPermissionScopeEnum(permission.scope()),
      resource: permission.resource(),
      reason: permission.reason(),
    });
  }

  return permissions;
}

function decodeManifestHooks(root: BaoInstallManifestV1): BaoManifestLifecycleHooksDecoded | null {
  const hooksTable = root.hooks();
  return hooksTable
    ? {
        preInstall: hooksTable.preInstall(),
        postInstall: hooksTable.postInstall(),
        preUninstall: hooksTable.preUninstall(),
        postUninstall: hooksTable.postUninstall(),
        healthCheck: hooksTable.healthCheck(),
      }
    : null;
}

function decodeManifestRoot(root: BaoInstallManifestV1): BaoManifestDecoded | null {
  const name = root.name();
  if (name === null) {
    return null;
  }

  return {
    name,
    version: root.version() ?? null,
    description: root.description() ?? null,
    targets: decodeManifestTargets(root),
    metadataJson: root.metadataJson() ?? null,
    createdAt: root.createdAt() ?? null,
    hardware: decodeManifestHardware(root),
    runtimeConstraints: decodeManifestRuntimeConstraints(root),
    permissions: decodeManifestPermissions(root),
    hooks: decodeManifestHooks(root),
    checksumSha256: root.checksumSha256() ?? null,
    signature: root.signature() ?? null,
  } satisfies BaoManifestDecoded;
}

/**
 * Encode a `.bao` install manifest to FlatBuffers bytes.
 *
 * @param input - Manifest fields.
 * @returns Encoded bytes.
 */
export function encodeBaoManifest(input: BaoManifestEncodeInput): Uint8Array<ArrayBuffer> {
  const t = startTiming();

  const result = withPooledBuilder(BUILDER_CAPACITY, (builder) => {
    const stringOffsets = prepareManifestStringOffsets(builder, input);
    const vectorOffsets: BaoManifestVectorOffsets = {
      targets: createTargetsVector(builder, input.targets),
      hardware: createHardwareVector(builder, input.hardware),
      runtimeConstraints: createRuntimeConstraintsVector(builder, input.runtimeConstraints),
      permissions: createPermissionsVector(builder, input.permissions),
      hooks: createLifecycleHooks(builder, input.hooks),
    };
    const root = createManifestRoot(builder, stringOffsets, vectorOffsets);

    builder.finish(root, "BIM1");
    const encoded = builder.asUint8Array();
    const copy = new Uint8Array(new ArrayBuffer(encoded.byteLength));
    copy.set(encoded);
    return copy;
  });

  recordEncode("bao-manifest", result.byteLength, t);
  return result;
}

/**
 * Decode a `.bao` install manifest from FlatBuffers bytes.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded manifest or null when invalid.
 */
export function decodeBaoManifest(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): BaoManifestDecoded | null {
  const t = startTiming();
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("bao-manifest");
    return null;
  }

  const result = withPooledByteBuffer(uint8, (bb) => {
    const root = BaoInstallManifestV1.getRootAsBaoInstallManifestV1(bb);
    return decodeManifestRoot(root);
  });

  if (!result) {
    recordDecodeError("bao-manifest");
    return null;
  }
  recordDecode("bao-manifest", uint8.byteLength, t);
  return result;
}
