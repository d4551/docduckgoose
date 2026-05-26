import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";

export const BAO_ARCHIVE_AUTHORING_STATUSES: readonly [
  "pending",
  "ingesting",
  "analyzing",
  "mapping",
  "generating",
  "verifying",
  "completed",
  "failed",
] = [
  "pending",
  "ingesting",
  "analyzing",
  "mapping",
  "generating",
  "verifying",
  "completed",
  "failed",
] as const;

export type BaoArchiveAuthoringStatus = (typeof BAO_ARCHIVE_AUTHORING_STATUSES)[number];

export const BaoArchiveAuthoringStatusSchema: TUnion<
  [
    TLiteral<
      | "pending"
      | "ingesting"
      | "analyzing"
      | "mapping"
      | "generating"
      | "verifying"
      | "completed"
      | "failed"
    >,
    ...TLiteral<
      | "pending"
      | "ingesting"
      | "analyzing"
      | "mapping"
      | "generating"
      | "verifying"
      | "completed"
      | "failed"
    >[],
  ]
> = stringEnum(BAO_ARCHIVE_AUTHORING_STATUSES, {});

export const BAO_ARCHIVE_AUTHORING_SOURCE_KINDS: readonly ["git-repo", "local-directory"] = [
  "git-repo",
  "local-directory",
] as const;
export const BAO_ARCHIVE_AUTHORING_OUTPUT_PATH_MAX_LENGTH = 4096;

export type BaoArchiveAuthoringSourceKind = (typeof BAO_ARCHIVE_AUTHORING_SOURCE_KINDS)[number];

export const BaoArchiveAuthoringSourceKindSchema: TUnion<
  [TLiteral<"git-repo" | "local-directory">, ...TLiteral<"git-repo" | "local-directory">[]]
> = stringEnum(BAO_ARCHIVE_AUTHORING_SOURCE_KINDS, {});

export const BAO_ARCHIVE_AUTHORING_SOURCE_LANGUAGES: readonly [
  "javascript",
  "typescript",
  "python",
  "go",
  "java",
  "ruby",
  "csharp",
  "rust",
  "php",
] = ["javascript", "typescript", "python", "go", "java", "ruby", "csharp", "rust", "php"] as const;

export type BaoArchiveAuthoringSourceLanguage =
  (typeof BAO_ARCHIVE_AUTHORING_SOURCE_LANGUAGES)[number];

export const BaoArchiveAuthoringGitRepoSourceSpecSchema = TypeExports.Object(
  {
    kind: TypeExports.Literal("git-repo"),
    url: TypeExports.String({ minLength: 1 }),
    branch: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    commit: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringLocalDirectorySourceSpecSchema = TypeExports.Object(
  {
    kind: TypeExports.Literal("local-directory"),
    path: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringSourceSpecSchema = TypeExports.Union(
  [BaoArchiveAuthoringGitRepoSourceSpecSchema, BaoArchiveAuthoringLocalDirectorySourceSpecSchema],
  { additionalProperties: false },
);

export type BaoArchiveAuthoringSourceSpecV1 = Static<typeof BaoArchiveAuthoringSourceSpecSchema>;

export const BaoArchiveAuthoringLanguageEntrySchema: TObject<
  {
    readonly language: TString;
    readonly percentage: TNumber;
    readonly fileCount: TInteger;
  },
  "language" | "percentage" | "fileCount",
  never
> = TypeExports.Object(
  {
    language: TypeExports.String({ minLength: 1 }),
    percentage: TypeExports.Number({ minimum: 0, maximum: 100 }),
    fileCount: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringFrameworkEntrySchema: TObject<
  {
    readonly name: TString;
    readonly version: TString;
    readonly confidence: TNumber;
  },
  "name" | "version" | "confidence",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    version: TypeExports.String(),
    confidence: TypeExports.Number({ minimum: 0, maximum: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringRouteEntrySchema: TObject<
  {
    readonly method: TString;
    readonly path: TString;
    readonly handler: TString;
    readonly sourceFile: TString;
  },
  "method" | "path" | "handler" | "sourceFile",
  never
> = TypeExports.Object(
  {
    method: TypeExports.String({ minLength: 1 }),
    path: TypeExports.String({ minLength: 1 }),
    handler: TypeExports.String(),
    sourceFile: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringModelFieldSchema: TObject<
  {
    readonly name: TString;
    readonly type: TString;
    readonly constraints: TArray<TString>;
  },
  "constraints" | "name" | "type",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    type: TypeExports.String({ minLength: 1 }),
    constraints: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringModelEntrySchema: TObject<
  {
    readonly name: TString;
    readonly fields: TArray<
      TObject<
        {
          readonly name: TString;
          readonly type: TString;
          readonly constraints: TArray<TString>;
        },
        "constraints" | "name" | "type",
        never
      >
    >;
    readonly sourceFile: TString;
  },
  "fields" | "name" | "sourceFile",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    fields: TypeExports.Array(BaoArchiveAuthoringModelFieldSchema),
    sourceFile: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringAuthPatternSchema: TObject<
  {
    readonly kind: TString;
    readonly library: TString;
    readonly sourceFile: TString;
  },
  "sourceFile" | "kind" | "library",
  never
> = TypeExports.Object(
  {
    kind: TypeExports.String({ minLength: 1 }),
    library: TypeExports.String(),
    sourceFile: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringComponentEntrySchema: TObject<
  {
    readonly name: TString;
    readonly framework: TString;
    readonly sourceFile: TString;
    readonly hasState: TBoolean;
  },
  "name" | "framework" | "sourceFile" | "hasState",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    framework: TypeExports.String({ minLength: 1 }),
    sourceFile: TypeExports.String({ minLength: 1 }),
    hasState: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringConfigFileSchema: TObject<
  { readonly path: TString; readonly format: TString },
  "path" | "format",
  never
> = TypeExports.Object(
  {
    path: TypeExports.String({ minLength: 1 }),
    format: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringTestFileSchema: TObject<
  { readonly path: TString; readonly framework: TString },
  "path" | "framework",
  never
> = TypeExports.Object(
  {
    path: TypeExports.String({ minLength: 1 }),
    framework: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringBuildConfigSchema: TObject<
  { readonly tool: TString; readonly scripts: TRecord<TString, TString> },
  "scripts" | "tool",
  never
> = TypeExports.Object(
  {
    tool: TypeExports.String(),
    scripts: TypeExports.Record(TypeExports.String(), TypeExports.String()),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringDependencyEntrySchema: TObject<
  {
    readonly name: TString;
    readonly version: TString;
    readonly scope: TString;
    readonly purpose: TString;
  },
  "name" | "version" | "scope" | "purpose",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    version: TypeExports.String(),
    scope: TypeExports.String(),
    purpose: TypeExports.String(),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringModuleReferenceSchema: TObject<
  {
    readonly name: TString;
    readonly specifier: TString;
    readonly kind: TString;
    readonly language: TString;
    readonly sourceFile: TString;
  },
  "kind" | "language" | "name" | "sourceFile" | "specifier",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    specifier: TypeExports.String({ minLength: 1 }),
    kind: TypeExports.String({ minLength: 1 }),
    language: TypeExports.String({ minLength: 1 }),
    sourceFile: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringResearchSummarySchema: TObject<
  {
    readonly provider: TString;
    readonly sourceUrl: TUnion<(TString | TNull)[]>;
    readonly title: TUnion<(TString | TNull)[]>;
    readonly summary: TUnion<(TString | TNull)[]>;
    readonly collectedAt: TString;
  },
  "sourceUrl" | "title" | "summary" | "provider" | "collectedAt",
  never
> = TypeExports.Object(
  {
    provider: TypeExports.String({ minLength: 1, description: "Research provider identifier." }),
    sourceUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()], {
      description: "URL of the researched page.",
    }),
    title: TypeExports.Union([TypeExports.String(), TypeExports.Null()], {
      description: "Title extracted from the researched page.",
    }),
    summary: TypeExports.Union([TypeExports.String(), TypeExports.Null()], {
      description: "Short summary of research content.",
    }),
    collectedAt: TypeExports.String({ description: "ISO timestamp of collection." }),
  },
  { additionalProperties: false },
);

export type BaoArchiveAuthoringResearchSummaryV1 = Static<
  typeof BaoArchiveAuthoringResearchSummarySchema
>;

export const BaoArchiveAuthoringAnalysisSchema = TypeExports.Object(
  {
    languages: TypeExports.Array(BaoArchiveAuthoringLanguageEntrySchema),
    frameworks: TypeExports.Array(BaoArchiveAuthoringFrameworkEntrySchema),
    packageManager: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    entrypoints: TypeExports.Array(TypeExports.String()),
    routes: TypeExports.Array(BaoArchiveAuthoringRouteEntrySchema),
    models: TypeExports.Array(BaoArchiveAuthoringModelEntrySchema),
    authPatterns: TypeExports.Array(BaoArchiveAuthoringAuthPatternSchema),
    uiComponents: TypeExports.Array(BaoArchiveAuthoringComponentEntrySchema),
    configFiles: TypeExports.Array(BaoArchiveAuthoringConfigFileSchema),
    testFiles: TypeExports.Array(BaoArchiveAuthoringTestFileSchema),
    buildConfig: BaoArchiveAuthoringBuildConfigSchema,
    dependencies: TypeExports.Array(BaoArchiveAuthoringDependencyEntrySchema),
    moduleReferences: TypeExports.Array(BaoArchiveAuthoringModuleReferenceSchema),
    researchSummaries: TypeExports.Array(BaoArchiveAuthoringResearchSummarySchema, {
      description: "Scoutdumpling research evidence collected during ingest phase.",
    }),
  },
  { additionalProperties: false },
);

export type BaoArchiveAuthoringAnalysisV1 = Static<typeof BaoArchiveAuthoringAnalysisSchema>;

export const BaoArchiveAuthoringRouteMappingSchema: TObject<
  {
    readonly source: TObject<
      { readonly method: TString; readonly path: TString },
      "method" | "path",
      never
    >;
    readonly target: TObject<
      {
        readonly method: TString;
        readonly path: TString;
        readonly pluginFile: TString;
      },
      "method" | "path" | "pluginFile",
      never
    >;
  },
  "source" | "target",
  never
> = TypeExports.Object(
  {
    source: TypeExports.Object(
      { method: TypeExports.String(), path: TypeExports.String() },
      { additionalProperties: false },
    ),
    target: TypeExports.Object(
      {
        method: TypeExports.String(),
        path: TypeExports.String(),
        pluginFile: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringModelMappingSchema: TObject<
  {
    readonly source: TObject<
      { readonly name: TString; readonly sourceFile: TString },
      "name" | "sourceFile",
      never
    >;
    readonly target: TObject<
      { readonly modelName: TString; readonly prismaFields: TString },
      "modelName" | "prismaFields",
      never
    >;
  },
  "source" | "target",
  never
> = TypeExports.Object(
  {
    source: TypeExports.Object(
      { name: TypeExports.String(), sourceFile: TypeExports.String() },
      { additionalProperties: false },
    ),
    target: TypeExports.Object(
      { modelName: TypeExports.String(), prismaFields: TypeExports.String() },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringComponentMappingSchema: TObject<
  {
    readonly source: TObject<
      { readonly name: TString; readonly framework: TString },
      "name" | "framework",
      never
    >;
    readonly target: TObject<
      { readonly templateFile: TString; readonly htmxAttributes: TArray<TString> },
      "htmxAttributes" | "templateFile",
      never
    >;
  },
  "source" | "target",
  never
> = TypeExports.Object(
  {
    source: TypeExports.Object(
      { name: TypeExports.String(), framework: TypeExports.String() },
      { additionalProperties: false },
    ),
    target: TypeExports.Object(
      {
        templateFile: TypeExports.String(),
        htmxAttributes: TypeExports.Array(TypeExports.String()),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringAuthMappingSchema: TObject<
  {
    readonly sourceKind: TString;
    readonly targetProvider: TString;
    readonly configChanges: TArray<TString>;
  },
  "configChanges" | "sourceKind" | "targetProvider",
  never
> = TypeExports.Object(
  {
    sourceKind: TypeExports.String(),
    targetProvider: TypeExports.String(),
    configChanges: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringTestMappingSchema: TObject<
  {
    readonly source: TObject<
      { readonly file: TString; readonly framework: TString },
      "file" | "framework",
      never
    >;
    readonly target: TObject<{ readonly file: TString }, "file", never>;
  },
  "source" | "target",
  never
> = TypeExports.Object(
  {
    source: TypeExports.Object(
      { file: TypeExports.String(), framework: TypeExports.String() },
      { additionalProperties: false },
    ),
    target: TypeExports.Object({ file: TypeExports.String() }, { additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringUnmappedItemSchema: TObject<
  { readonly kind: TString; readonly name: TString; readonly reason: TString },
  "kind" | "name" | "reason",
  never
> = TypeExports.Object(
  {
    kind: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    reason: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringDependencySwapTargetSchema: TObject<
  {
    readonly kind: TString;
    readonly identifier: TString;
    readonly packageName: TUnion<(TString | TNull)[]>;
    readonly routeHints: TArray<TString>;
  },
  "identifier" | "kind" | "packageName" | "routeHints",
  never
> = TypeExports.Object(
  {
    kind: TypeExports.String({ minLength: 1 }),
    identifier: TypeExports.String({ minLength: 1 }),
    packageName: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    routeHints: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringDependencySwapMappingSchema: TObject<
  {
    readonly source: TObject<
      {
        readonly languages: TArray<TString>;
        readonly name: TString;
        readonly referenceKinds: TArray<TString>;
        readonly version: TString;
        readonly scope: TString;
        readonly sourceFiles: TArray<TString>;
        readonly specifiers: TArray<TString>;
      },
      "languages" | "name" | "referenceKinds" | "scope" | "sourceFiles" | "specifiers" | "version",
      never
    >;
    readonly target: TObject<
      {
        readonly kind: TString;
        readonly identifier: TString;
        readonly packageName: TUnion<(TString | TNull)[]>;
        readonly routeHints: TArray<TString>;
      },
      "identifier" | "kind" | "packageName" | "routeHints",
      never
    >;
    readonly rationale: TString;
  },
  "rationale" | "source" | "target",
  never
> = TypeExports.Object(
  {
    source: TypeExports.Object(
      {
        languages: TypeExports.Array(TypeExports.String({ minLength: 1 })),
        name: TypeExports.String({ minLength: 1 }),
        referenceKinds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
        version: TypeExports.String(),
        scope: TypeExports.String({ minLength: 1 }),
        sourceFiles: TypeExports.Array(TypeExports.String({ minLength: 1 })),
        specifiers: TypeExports.Array(TypeExports.String({ minLength: 1 })),
      },
      { additionalProperties: false },
    ),
    target: BaoArchiveAuthoringDependencySwapTargetSchema,
    rationale: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringMappingSchema = TypeExports.Object(
  {
    routeMappings: TypeExports.Array(BaoArchiveAuthoringRouteMappingSchema),
    modelMappings: TypeExports.Array(BaoArchiveAuthoringModelMappingSchema),
    componentMappings: TypeExports.Array(BaoArchiveAuthoringComponentMappingSchema),
    authMapping: BaoArchiveAuthoringAuthMappingSchema,
    testMappings: TypeExports.Array(BaoArchiveAuthoringTestMappingSchema),
    dependencySwapMappings: TypeExports.Array(BaoArchiveAuthoringDependencySwapMappingSchema),
    unmappedItems: TypeExports.Array(BaoArchiveAuthoringUnmappedItemSchema),
  },
  { additionalProperties: false },
);

export type BaoArchiveAuthoringMappingV1 = Static<typeof BaoArchiveAuthoringMappingSchema>;

export const BaoArchiveAuthoringGeneratedFileSchema: TObject<
  {
    readonly path: TString;
    readonly kind: TString;
    readonly sourceMapping: TString;
  },
  "path" | "kind" | "sourceMapping",
  never
> = TypeExports.Object(
  {
    path: TypeExports.String({ minLength: 1 }),
    kind: TypeExports.String({ minLength: 1 }),
    sourceMapping: TypeExports.String(),
  },
  { additionalProperties: false },
);

export type BaoArchiveAuthoringGeneratedFile = Static<
  typeof BaoArchiveAuthoringGeneratedFileSchema
>;

export const BaoArchiveAuthoringOutputSchema: TObject<
  {
    readonly outputPath: TString;
    readonly archivePath: TString;
    readonly manifestChecksum: TString;
    readonly generatedFiles: TArray<
      TObject<
        {
          readonly path: TString;
          readonly kind: TString;
          readonly sourceMapping: TString;
        },
        "kind" | "path" | "sourceMapping",
        never
      >
    >;
  },
  "generatedFiles" | "outputPath" | "archivePath" | "manifestChecksum",
  never
> = TypeExports.Object(
  {
    outputPath: TypeExports.String({ minLength: 1 }),
    archivePath: TypeExports.String({ minLength: 1 }),
    manifestChecksum: TypeExports.String({ minLength: 1 }),
    generatedFiles: TypeExports.Array(BaoArchiveAuthoringGeneratedFileSchema),
  },
  { additionalProperties: false },
);

export type BaoArchiveAuthoringOutputV1 = Static<typeof BaoArchiveAuthoringOutputSchema>;

export const BaoArchiveAuthoringFeatureParitySchema: TObject<
  {
    readonly totalSource: TInteger;
    readonly totalMapped: TInteger;
    readonly coverage: TNumber;
    readonly gaps: TArray<TString>;
  },
  "gaps" | "totalSource" | "totalMapped" | "coverage",
  never
> = TypeExports.Object(
  {
    totalSource: TypeExports.Integer({ minimum: 0 }),
    totalMapped: TypeExports.Integer({ minimum: 0 }),
    coverage: TypeExports.Number({ minimum: 0, maximum: 1 }),
    gaps: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringSchemaParitySchema: TObject<
  {
    readonly totalModels: TInteger;
    readonly mappedModels: TInteger;
    readonly fieldDiffs: TArray<TString>;
  },
  "fieldDiffs" | "totalModels" | "mappedModels",
  never
> = TypeExports.Object(
  {
    totalModels: TypeExports.Integer({ minimum: 0 }),
    mappedModels: TypeExports.Integer({ minimum: 0 }),
    fieldDiffs: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringAuthParitySchema: TObject<
  {
    readonly sourceFlows: TArray<TString>;
    readonly targetFlows: TArray<TString>;
    readonly missing: TArray<TString>;
  },
  "sourceFlows" | "targetFlows" | "missing",
  never
> = TypeExports.Object(
  {
    sourceFlows: TypeExports.Array(TypeExports.String()),
    targetFlows: TypeExports.Array(TypeExports.String()),
    missing: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringUiParitySchema: TObject<
  {
    readonly totalComponents: TInteger;
    readonly mappedComponents: TInteger;
    readonly unmapped: TArray<TString>;
  },
  "unmapped" | "totalComponents" | "mappedComponents",
  never
> = TypeExports.Object(
  {
    totalComponents: TypeExports.Integer({ minimum: 0 }),
    mappedComponents: TypeExports.Integer({ minimum: 0 }),
    unmapped: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringTestParitySchema: TObject<
  {
    readonly totalTests: TInteger;
    readonly mappedTests: TInteger;
    readonly passingTests: TInteger;
  },
  "totalTests" | "mappedTests" | "passingTests",
  never
> = TypeExports.Object(
  {
    totalTests: TypeExports.Integer({ minimum: 0 }),
    mappedTests: TypeExports.Integer({ minimum: 0 }),
    passingTests: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringStackConformanceSchema: TObject<
  {
    readonly usesElysia: TBoolean;
    readonly usesPrisma: TBoolean;
    readonly usesHtmx: TBoolean;
    readonly usesDaisyui: TBoolean;
    readonly usesBetterAuth: TBoolean;
    readonly usesBun: TBoolean;
  },
  "usesElysia" | "usesPrisma" | "usesHtmx" | "usesDaisyui" | "usesBetterAuth" | "usesBun",
  never
> = TypeExports.Object(
  {
    usesElysia: TypeExports.Boolean(),
    usesPrisma: TypeExports.Boolean(),
    usesHtmx: TypeExports.Boolean(),
    usesDaisyui: TypeExports.Boolean(),
    usesBetterAuth: TypeExports.Boolean(),
    usesBun: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringArtifactChecksSchema: TObject<
  {
    readonly generatedFilesPresent: TBoolean;
    readonly referencedArtifactsPresent: TBoolean;
    readonly archiveLayoutValid: TBoolean;
    readonly debtMarkerFree: TBoolean;
    readonly unsupportedMappingsResolved: TBoolean;
  },
  | "generatedFilesPresent"
  | "referencedArtifactsPresent"
  | "archiveLayoutValid"
  | "debtMarkerFree"
  | "unsupportedMappingsResolved",
  never
> = TypeExports.Object(
  {
    generatedFilesPresent: TypeExports.Boolean(),
    referencedArtifactsPresent: TypeExports.Boolean(),
    archiveLayoutValid: TypeExports.Boolean(),
    debtMarkerFree: TypeExports.Boolean(),
    unsupportedMappingsResolved: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringVerificationTraceabilitySchema = TypeExports.Object(
  {
    sourceKind: BaoArchiveAuthoringSourceKindSchema,
    sourceUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    sourcePath: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    sourceBranch: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    sourceCommit: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    archivePath: TypeExports.String({ minLength: 1 }),
    outputPath: TypeExports.String({ minLength: 1 }),
    generatedFileCount: TypeExports.Integer({ minimum: 0 }),
    rulesetHash: TypeExports.String({ minLength: 1 }),
    verificationProfile: TypeExports.String({ minLength: 1 }),
    scoutdumplingEvidenceIds: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringBlockingIssueSchema = TypeExports.Object(
  {
    code: TypeExports.String({ minLength: 1 }),
    source: TypeExports.String({ minLength: 1 }),
    severity: TypeExports.Literal("blocking"),
    message: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringVerificationSchema = TypeExports.Object(
  {
    featureParity: BaoArchiveAuthoringFeatureParitySchema,
    schemaParity: BaoArchiveAuthoringSchemaParitySchema,
    authParity: BaoArchiveAuthoringAuthParitySchema,
    uiParity: BaoArchiveAuthoringUiParitySchema,
    testParity: BaoArchiveAuthoringTestParitySchema,
    stackConformance: BaoArchiveAuthoringStackConformanceSchema,
    manifestValid: TypeExports.Boolean(),
    manifestIssues: TypeExports.Array(TypeExports.String()),
    blockingIssues: TypeExports.Array(TypeExports.String()),
    blockingIssueDetails: TypeExports.Array(BaoArchiveAuthoringBlockingIssueSchema),
    debtMarkerIssues: TypeExports.Array(TypeExports.String()),
    artifactChecks: BaoArchiveAuthoringArtifactChecksSchema,
    lintPassing: TypeExports.Boolean(),
    typecheckPassing: TypeExports.Boolean(),
    buildPassing: TypeExports.Boolean(),
    smokeTestPassing: TypeExports.Boolean(),
    testsPassing: TypeExports.Boolean(),
    traceability: BaoArchiveAuthoringVerificationTraceabilitySchema,
  },
  { additionalProperties: false },
);

export type BaoArchiveAuthoringVerificationV1 = Static<
  typeof BaoArchiveAuthoringVerificationSchema
>;

export const BaoArchiveAuthoringCreateJobInputSchema = TypeExports.Object(
  {
    source: BaoArchiveAuthoringSourceSpecSchema,
    name: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    outputPath: TypeExports.Optional(
      TypeExports.String({ minLength: 1, maxLength: BAO_ARCHIVE_AUTHORING_OUTPUT_PATH_MAX_LENGTH }),
    ),
  },
  { additionalProperties: false },
);

export type BaoArchiveAuthoringCreateJobInputV1 = Static<
  typeof BaoArchiveAuthoringCreateJobInputSchema
>;

export const BaoArchiveAuthoringSchema = TypeExports.Object(
  {
    id: TypeExports.String({ format: "uuid" }),
    status: BaoArchiveAuthoringStatusSchema,
    sourceKind: BaoArchiveAuthoringSourceKindSchema,
    sourceUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    sourcePath: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    sourceBranch: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    sourceCommit: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    name: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    outputPath: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    analysis: TypeExports.Union([BaoArchiveAuthoringAnalysisSchema, TypeExports.Null()]),
    mapping: TypeExports.Union([BaoArchiveAuthoringMappingSchema, TypeExports.Null()]),
    output: TypeExports.Union([BaoArchiveAuthoringOutputSchema, TypeExports.Null()]),
    verification: TypeExports.Union([BaoArchiveAuthoringVerificationSchema, TypeExports.Null()]),
    errorMessage: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    baoInstallRunId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    baoComposerDraftId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    baoComposerArtifactId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    manifestChecksum: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    createdAt: TypeExports.String(),
    updatedAt: TypeExports.String(),
  },
  { additionalProperties: false },
);

export type BaoArchiveAuthoringV1 = Static<typeof BaoArchiveAuthoringSchema>;

export function isBaoArchiveAuthoringStatus(
  value: string | null | undefined,
): value is BaoArchiveAuthoringStatus {
  if (!value) {
    return false;
  }
  return (BAO_ARCHIVE_AUTHORING_STATUSES as readonly string[]).includes(value);
}

export function isBaoArchiveAuthoringSourceKind(
  value: string | null | undefined,
): value is BaoArchiveAuthoringSourceKind {
  if (!value) {
    return false;
  }
  return (BAO_ARCHIVE_AUTHORING_SOURCE_KINDS as readonly string[]).includes(value);
}
