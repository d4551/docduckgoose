/**
 * Deployment workflow schemas for BaoControlPlane operations.
 *
 * Defines canonical payload shapes for deployment command summaries so the
 * server and client share a single contract for operational runbooks.
 *
 * @shared/schemas/deployment.ts
 */

import type {
  Static,
  TArray,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";

/**
 * Supported deployment command scopes.
 */
export const DEPLOYMENT_COMMAND_SCOPES: readonly ["bao-control-plane"] = [
  "bao-control-plane",
] as const;

/**
 * Type-safe deployment command scope.
 */
export type DeploymentCommandScope = (typeof DEPLOYMENT_COMMAND_SCOPES)[number];

/**
 * Deployment command scope schema.
 */
export const DeploymentCommandScopeSchema: TUnion<
  [TLiteral<"bao-control-plane">, ...TLiteral<"bao-control-plane">[]]
> = stringEnum(DEPLOYMENT_COMMAND_SCOPES, {
  description: "Deployment command scope",
});

/**
 * Supported deployment command groups.
 */
export const DEPLOYMENT_COMMAND_GROUPS: readonly ["manifests", "bunbuddies"] = [
  "manifests",
  "bunbuddies",
] as const;

/**
 * Type-safe deployment command group.
 */
export type DeploymentCommandGroup = (typeof DEPLOYMENT_COMMAND_GROUPS)[number];

/**
 * Deployment command group schema.
 */
export const DeploymentCommandGroupSchema: TUnion<
  [TLiteral<"manifests" | "bunbuddies">, ...TLiteral<"manifests" | "bunbuddies">[]]
> = stringEnum(DEPLOYMENT_COMMAND_GROUPS, {
  description: "Deployment command group",
});

/**
 * Supported deployment warning severities.
 */
export const DEPLOYMENT_WARNING_SEVERITIES: readonly ["warning", "error"] = [
  "warning",
  "error",
] as const;

/**
 * Type-safe deployment warning severity.
 */
export type DeploymentWarningSeverity = (typeof DEPLOYMENT_WARNING_SEVERITIES)[number];

/**
 * Deployment warning severity schema.
 */
export const DeploymentWarningSeveritySchema: TUnion<
  [TLiteral<"warning" | "error">, ...TLiteral<"warning" | "error">[]]
> = stringEnum(DEPLOYMENT_WARNING_SEVERITIES, {
  description: "Deployment warning severity",
});

/**
 * Deployment warning schema.
 */
export const DeploymentWarningSchema: TObject<
  {
    readonly code: TString;
    readonly severity: TUnion<[TLiteral<"warning" | "error">, ...TLiteral<"warning" | "error">[]]>;
    readonly field: TOptional<TString>;
  },
  "code" | "severity",
  "field"
> = TypeExports.Object(
  {
    code: TypeExports.String({ minLength: 1, description: "Warning code" }),
    severity: DeploymentWarningSeveritySchema,
    field: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Associated config field" }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for deployment warnings.
 */
export type DeploymentWarning = Static<typeof DeploymentWarningSchema>;

/**
 * Deployment command entry schema.
 */
export const DeploymentCommandSchema: TObject<
  {
    readonly id: TString;
    readonly scope: TUnion<[TLiteral<"bao-control-plane">, ...TLiteral<"bao-control-plane">[]]>;
    readonly group: TUnion<
      [TLiteral<"manifests" | "bunbuddies">, ...TLiteral<"manifests" | "bunbuddies">[]]
    >;
    readonly command: TString;
  },
  "id" | "scope" | "group" | "command",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1, description: "Stable command identifier" }),
    scope: DeploymentCommandScopeSchema,
    group: DeploymentCommandGroupSchema,
    command: TypeExports.String({ minLength: 1, description: "Shell command to run" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for deployment command entries.
 */
export type DeploymentCommand = Static<typeof DeploymentCommandSchema>;

/**
 * Deployment manifests configuration schema.
 */
export const DeploymentManifestsSchema: TObject<
  {
    readonly renderScript: TUnion<(TString | TNull)[]>;
    readonly outputDir: TUnion<(TString | TNull)[]>;
    readonly stacks: TArray<TString>;
  },
  "renderScript" | "outputDir" | "stacks",
  never
> = TypeExports.Object(
  {
    renderScript: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Script path to render manifests (bun entrypoint)",
    }),
    outputDir: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "Rendered manifests directory",
    }),
    stacks: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
      description: "Stack file names",
    }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for deployment manifests config.
 */
export type DeploymentManifests = Static<typeof DeploymentManifestsSchema>;

/**
 * Deployment bunbuddy build configuration schema.
 */
export const DeploymentBunBuddySchema: TObject<
  { readonly buildScript: TUnion<(TString | TNull)[]> },
  "buildScript",
  never
> = TypeExports.Object(
  {
    buildScript: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()], {
      description: "BunBuddy build script path",
    }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for deployment bunbuddy config.
 */
export type DeploymentBunBuddies = Static<typeof DeploymentBunBuddySchema>;

/**
 * Deployment summary schema.
 */
export const DeploymentSummarySchema = TypeExports.Object(
  {
    infraMode: TypeExports.Literal("bao-control-plane", {
      description: "Deployment mode selector",
    }),
    manifests: DeploymentManifestsSchema,
    bunbuddies: DeploymentBunBuddySchema,
    commands: TypeExports.Array(DeploymentCommandSchema),
    warnings: TypeExports.Array(DeploymentWarningSchema),
    updatedAt: TypeExports.String({ format: "date-time", description: "Summary update timestamp" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for deployment summaries.
 */
export type DeploymentSummary = Static<typeof DeploymentSummarySchema>;

/**
 * Deployment summary response schema.
 */
export const DeploymentSummaryResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: DeploymentSummarySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for deployment summary responses.
 */
export type DeploymentSummaryResponse = Static<typeof DeploymentSummaryResponseSchema>;
