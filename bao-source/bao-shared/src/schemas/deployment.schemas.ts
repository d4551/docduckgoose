/**
 * Deployment workflow schemas for BaoControlPlane operations.
 *
 * Defines canonical payload shapes for deployment command summaries so the
 * server and client share a single contract for operational runbooks.
 *
 * @shared/schemas/deployment.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
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
export const DeploymentCommandScopeSchema: Type.TUnion<
  [Type.TLiteral<"bao-control-plane">, ...Type.TLiteral<"bao-control-plane">[]]
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
export const DeploymentCommandGroupSchema: Type.TUnion<
  [Type.TLiteral<"manifests" | "bunbuddies">, ...Type.TLiteral<"manifests" | "bunbuddies">[]]
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
export const DeploymentWarningSeveritySchema: Type.TUnion<
  [Type.TLiteral<"warning" | "error">, ...Type.TLiteral<"warning" | "error">[]]
> = stringEnum(DEPLOYMENT_WARNING_SEVERITIES, {
  description: "Deployment warning severity",
});

/**
 * Deployment warning schema.
 */
export const DeploymentWarningSchema: Type.TObject<
  {
    readonly code: Type.TString;
    readonly severity: Type.TUnion<
      [Type.TLiteral<"warning" | "error">, ...Type.TLiteral<"warning" | "error">[]]
    >;
    readonly field: Type.TOptional<Type.TString>;
  },
  "code" | "severity",
  "field"
> = Type.Object(
  {
    code: Type.String({ minLength: 1, description: "Warning code" }),
    severity: DeploymentWarningSeveritySchema,
    field: Type.Optional(Type.String({ minLength: 1, description: "Associated config field" })),
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
export const DeploymentCommandSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly scope: Type.TUnion<
      [Type.TLiteral<"bao-control-plane">, ...Type.TLiteral<"bao-control-plane">[]]
    >;
    readonly group: Type.TUnion<
      [Type.TLiteral<"manifests" | "bunbuddies">, ...Type.TLiteral<"manifests" | "bunbuddies">[]]
    >;
    readonly command: Type.TString;
  },
  "id" | "scope" | "group" | "command",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1, description: "Stable command identifier" }),
    scope: DeploymentCommandScopeSchema,
    group: DeploymentCommandGroupSchema,
    command: Type.String({ minLength: 1, description: "Shell command to run" }),
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
export const DeploymentManifestsSchema: Type.TObject<
  {
    readonly renderScript: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly outputDir: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly stacks: Type.TArray<Type.TString>;
  },
  "renderScript" | "outputDir" | "stacks",
  never
> = Type.Object(
  {
    renderScript: Type.Union([Type.String({ minLength: 1 }), Type.Null()], {
      description: "Script path to render manifests (bun entrypoint)",
    }),
    outputDir: Type.Union([Type.String({ minLength: 1 }), Type.Null()], {
      description: "Rendered manifests directory",
    }),
    stacks: Type.Array(Type.String({ minLength: 1 }), { description: "Stack file names" }),
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
export const DeploymentBunBuddySchema: Type.TObject<
  { readonly buildScript: Type.TUnion<(Type.TString | Type.TNull)[]> },
  "buildScript",
  never
> = Type.Object(
  {
    buildScript: Type.Union([Type.String({ minLength: 1 }), Type.Null()], {
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
export const DeploymentSummarySchema = Type.Object(
  {
    infraMode: Type.Literal("bao-control-plane", { description: "Deployment mode selector" }),
    manifests: DeploymentManifestsSchema,
    bunbuddies: DeploymentBunBuddySchema,
    commands: Type.Array(DeploymentCommandSchema),
    warnings: Type.Array(DeploymentWarningSchema),
    updatedAt: Type.String({ format: "date-time", description: "Summary update timestamp" }),
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
export const DeploymentSummaryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: DeploymentSummarySchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for deployment summary responses.
 */
export type DeploymentSummaryResponse = Static<typeof DeploymentSummaryResponseSchema>;
