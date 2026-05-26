/**
 * BaoComposer ecosystem context contracts.
 *
 * Context snapshots let BaoComposer explain and reuse the package, runtime,
 * Registry, Forge, MCP, research, and standalone signals that influenced a
 * draft or artifact.
 *
 * @packageDocumentation
 */

import { stringEnum } from "@baohaus/bao-schemas/baobox-enum";
import { JsonObjectSchema } from "@baohaus/bao-schemas/json.schemas";
import { sha256Hex } from "@baohaus/bao-utils/canonical/bao-manifest-checksum";
import { stableJsonStringify } from "@baohaus/bao-utils/stable-json";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

export const BAO_COMPOSER_CONTEXT_SOURCE_KINDS = [
  "user-intent",
  "workspace-catalog",
  "package-manifest",
  "package-descriptor",
  "runtime-health",
  "installed-extension",
  "registry-package",
  "forge-source",
  "mcp-provider",
  "research-evidence",
  "standalone-artifact",
] as const;

export const BaoComposerContextSourceKindSchema = stringEnum(BAO_COMPOSER_CONTEXT_SOURCE_KINDS, {});

export const BaoComposerContextSourceSchema = Type.Object(
  {
    sourceKind: BaoComposerContextSourceKindSchema,
    sourceId: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    observedAt: Type.String({ format: "date-time" }),
    payload: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

export const BaoComposerContextSignalSchema = Type.Object(
  {
    sourceKind: BaoComposerContextSourceKindSchema,
    sourceId: Type.String({ minLength: 1 }),
    confidence: Type.Number({ minimum: 0, maximum: 1 }),
    observedAt: Type.String({ format: "date-time" }),
    summary: Type.String({ minLength: 1 }),
    payload: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

export const BaoComposerContextSnapshotSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    draftId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    artifactId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    checksum: Type.String({ minLength: 1 }),
    sources: Type.Array(BaoComposerContextSourceSchema),
    signals: Type.Array(BaoComposerContextSignalSchema),
    summary: Type.Object(
      {
        sourceCount: Type.Integer({ minimum: 0 }),
        signalCount: Type.Integer({ minimum: 0 }),
        highConfidenceSignalCount: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

export const BaoComposerContextRefreshRequestSchema = Type.Object(
  {
    includeRuntime: Type.Optional(Type.Boolean()),
    includeResearch: Type.Optional(Type.Boolean()),
    includeStandaloneProfile: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

export type BaoComposerContextSourceKind = (typeof BAO_COMPOSER_CONTEXT_SOURCE_KINDS)[number];
export type BaoComposerContextSource = Static<typeof BaoComposerContextSourceSchema>;
export type BaoComposerContextSignal = Static<typeof BaoComposerContextSignalSchema>;
export type BaoComposerContextSnapshot = Static<typeof BaoComposerContextSnapshotSchema>;
export type BaoComposerContextRefreshRequest = Static<
  typeof BaoComposerContextRefreshRequestSchema
>;

export interface BuildBaoComposerContextSnapshotInput {
  readonly id?: string;
  readonly draftId?: string | null;
  readonly artifactId?: string | null;
  readonly sources: readonly BaoComposerContextSource[];
  readonly signals: readonly BaoComposerContextSignal[];
  readonly createdAt: string;
}

function checksumPayload(input: BuildBaoComposerContextSnapshotInput) {
  return {
    draftId: input.draftId ?? null,
    artifactId: input.artifactId ?? null,
    sources: input.sources,
    signals: input.signals,
    createdAt: input.createdAt,
  };
}

export function computeBaoComposerContextChecksum(
  input: BuildBaoComposerContextSnapshotInput,
): string {
  return sha256Hex(stableJsonStringify(checksumPayload(input)));
}

export function buildBaoComposerContextSnapshot(
  input: BuildBaoComposerContextSnapshotInput,
): BaoComposerContextSnapshot {
  const checksum = computeBaoComposerContextChecksum(input);
  return {
    id: input.id ?? `bao-composer-context-${checksum.slice(0, 32)}`,
    draftId: input.draftId ?? null,
    artifactId: input.artifactId ?? null,
    checksum,
    sources: [...input.sources],
    signals: [...input.signals],
    summary: {
      sourceCount: input.sources.length,
      signalCount: input.signals.length,
      highConfidenceSignalCount: input.signals.filter((signal) => signal.confidence >= 0.8).length,
    },
    createdAt: input.createdAt,
  };
}
