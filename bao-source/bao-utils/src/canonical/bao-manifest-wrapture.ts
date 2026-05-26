import { BAO_MANIFEST_SCHEMA_VERSION } from "@baohaus/bao-schemas/bao-install/core.schemas";
import {
  type BaoManifest,
  type BaoManifestDependency,
  BaoManifestDependencySchema,
  isBaoManifest,
} from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { JsonValue } from "@baohaus/bao-schemas/json.schemas";
import type {
  BaoManifestDecoded,
  ManifestTargetEncodeInput,
} from "@baohaus/bao-wrapture/protocols/bao-manifest";
import { Check } from "@baohaus/baobox/value";

type JsonMutableObject = { [key: string]: JsonValue | undefined };
type ManifestMetadataPayload = Omit<BaoManifest["metadata"], "name" | "version"> & {
  readonly schemaVersion: BaoManifest["schemaVersion"];
  $schema?: BaoManifest["$schema"];
  dependencies?: BaoManifest["dependencies"];
};

function isJsonRecord(value: JsonValue): value is JsonMutableObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseJsonRecord(json: string | null): JsonMutableObject {
  if (!json) {
    return {};
  }
  const parsed: JsonValue = JSON.parse(json);
  return isJsonRecord(parsed) ? parsed : {};
}

function isBaoManifestDependency(value: JsonValue): value is BaoManifestDependency {
  return Check(BaoManifestDependencySchema, value);
}

export function extractTargetConfigJson(
  target: BaoManifest["targets"][number],
): string | undefined {
  const baseFields = new Set<string>([
    "kind",
    "target",
    "moduleId",
    "mcpMetadata",
    "before",
    "after",
    "healthcheck",
    "environment",
    "checksum",
    "signature",
    "dependencies",
  ]);

  const config: {
    [key: string]: BaoManifest["targets"][number][string] | undefined;
  } = {};
  for (const [key, value] of Object.entries(target)) {
    if (!baseFields.has(key)) {
      config[key] = value;
    }
  }

  for (const key of [
    "mcpMetadata",
    "before",
    "after",
    "healthcheck",
    "environment",
    "checksum",
    "signature",
    "dependencies",
  ] as const) {
    const value = target[key];
    if (value !== undefined) {
      config[key] = value;
    }
  }

  return Object.keys(config).length > 0 ? JSON.stringify(config) : undefined;
}

export function toManifestEncodeInput(manifest: BaoManifest): {
  readonly name: string;
  readonly version: string;
  readonly targets: readonly ManifestTargetEncodeInput[];
  readonly metadataJson: string;
  readonly description?: string;
} {
  const { name, version, ...remainingMetadata } = manifest.metadata;
  const metadataPayload: ManifestMetadataPayload = {
    schemaVersion: manifest.schemaVersion,
    ...remainingMetadata,
  };
  if (manifest.$schema !== undefined) {
    metadataPayload.$schema = manifest.$schema;
  }
  if (manifest.dependencies !== undefined) {
    metadataPayload.dependencies = manifest.dependencies;
  }

  const targets = manifest.targets.map((target) => {
    const moduleId =
      "moduleId" in target && typeof target.moduleId === "string" ? target.moduleId : undefined;
    const encodedTarget: ManifestTargetEncodeInput = {
      kind: target.kind,
      id: target.target,
    };
    if (moduleId !== undefined) {
      encodedTarget.moduleId = moduleId;
    }
    const configJson = extractTargetConfigJson(target);
    if (configJson !== undefined) {
      encodedTarget.configJson = configJson;
    }
    return encodedTarget;
  });

  return {
    name,
    version,
    targets,
    metadataJson: JSON.stringify(metadataPayload),
    ...(manifest.description === undefined ? {} : { description: manifest.description }),
  };
}

export function toManifestFromDecoded(decoded: BaoManifestDecoded): BaoManifest | null {
  const metadataExtra = parseJsonRecord(decoded.metadataJson);
  const { schemaVersion, $schema, dependencies, ...remainingMetadataExtra } = metadataExtra;
  const metadata = {
    name: decoded.name ?? "",
    version: decoded.version ?? "",
    ...remainingMetadataExtra,
  };
  const targets = decoded.targets.map((target) => {
    const configExtra = parseJsonRecord(target.configJson);
    return {
      kind: target.kind ?? "bao-package",
      target: target.id ?? "",
      ...configExtra,
      ...(target.moduleId === undefined ? {} : { moduleId: target.moduleId }),
    };
  });
  const manifest: {
    schemaVersion: number;
    metadata: typeof metadata;
    targets: typeof targets;
    $schema?: string;
    description?: string;
    dependencies?: BaoManifestDependency[];
  } = {
    schemaVersion: typeof schemaVersion === "number" ? schemaVersion : BAO_MANIFEST_SCHEMA_VERSION,
    metadata,
    targets,
  };

  if (typeof $schema === "string") {
    manifest.$schema = $schema;
  }
  if (decoded.description) {
    manifest.description = decoded.description;
  }
  if (
    Array.isArray(dependencies) &&
    dependencies.every((dependency): dependency is BaoManifestDependency =>
      isBaoManifestDependency(dependency),
    )
  ) {
    manifest.dependencies = dependencies;
  }

  return isBaoManifest(manifest) ? manifest : null;
}
