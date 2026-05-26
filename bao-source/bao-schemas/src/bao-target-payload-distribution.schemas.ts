import { t } from "@baohaus/baobox/elysia";
import type { Static } from "@baohaus/baobox/type/static-types";
import {
  architectureSchema,
  fileEntrySchema,
  identifierSchema,
  nonEmptyString,
  posixPathSchema,
  semverRangeSchema,
} from "./bao-target-payload-common.schemas.ts";

export const baoRuntimeWorkloadTargetSchema = t.Object(
  {
    bunbuddyKind: t.Union([
      t.Literal("basler"),
      t.Literal("ble"),
      t.Literal("dimsum"),
      t.Literal("drone"),
      t.Literal("gaussian"),
      t.Literal("industrial"),
      t.Literal("iot"),
      t.Literal("lighting"),
      t.Literal("perception"),
      t.Literal("printer"),
      t.Literal("robotics"),
      t.Literal("rpa"),
      t.Literal("scanner"),
      t.Literal("scoutdumpling"),
      t.Literal("usb"),
      t.Literal("vision"),
    ]),
    component: identifierSchema,
    executionMode: t.Union([
      t.Literal("in-cluster"),
      t.Literal("host-runtime"),
      t.Literal("hybrid"),
    ]),
    runtime: t.Object(
      {
        dev: t.Object(
          {
            runtime: t.Union([t.Literal("bun"), t.Literal("python")]),
            args: t.Array(nonEmptyString, { minItems: 1 }),
          },
          { additionalProperties: false },
        ),
        start: t.Object(
          {
            runtime: t.Union([t.Literal("bun"), t.Literal("python")]),
            args: t.Array(nonEmptyString, { minItems: 1 }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    providers: t.Array(t.Union([t.Literal("k0"), t.Literal("k3"), t.Literal("k8")]), {
      minItems: 1,
    }),
    hostPlatforms: t.Array(t.Union([t.Literal("linux"), t.Literal("darwin"), t.Literal("win32")]), {
      minItems: 1,
    }),
    hostArchitectures: t.Array(t.Union([t.Literal("x64"), t.Literal("arm64")]), {
      minItems: 1,
    }),
    imagePlatforms: t.Array(t.Union([t.Literal("linux/amd64"), t.Literal("linux/arm64")]), {
      minItems: 1,
    }),
    tenancy: t.Object(
      {
        isolationMode: t.Literal("tenant-release"),
        namespaceTemplate: nonEmptyString,
        releaseNameTemplate: nonEmptyString,
        sharedControlPlane: t.Boolean(),
        labelKeys: t.Record(nonEmptyString, nonEmptyString),
      },
      { additionalProperties: false },
    ),
    resources: t.Object(
      {
        requests: t.Object(
          {
            cpu: nonEmptyString,
            memory: nonEmptyString,
            ephemeralStorage: t.Optional(nonEmptyString),
          },
          { additionalProperties: false },
        ),
        limits: t.Object(
          {
            cpu: nonEmptyString,
            memory: nonEmptyString,
            ephemeralStorage: t.Optional(nonEmptyString),
          },
          { additionalProperties: false },
        ),
        persistentVolumes: t.Optional(
          t.Array(
            t.Object(
              {
                name: identifierSchema,
                mountPath: posixPathSchema,
                size: nonEmptyString,
                storageClassName: t.Optional(nonEmptyString),
                accessModes: t.Optional(t.Array(nonEmptyString, { minItems: 1 })),
              },
              { additionalProperties: false },
            ),
            { minItems: 1 },
          ),
        ),
        gpu: t.Optional(
          t.Object(
            {
              resourceKey: nonEmptyString,
              count: t.Integer({ minimum: 1 }),
            },
            { additionalProperties: false },
          ),
        ),
        deviceClaims: t.Optional(t.Array(nonEmptyString, { minItems: 1 })),
      },
      { additionalProperties: false },
    ),
    scheduling: t.Object(
      {
        nodeSelector: t.Optional(t.Record(nonEmptyString, nonEmptyString)),
        tolerations: t.Optional(
          t.Array(
            t.Object(
              {
                key: t.Optional(nonEmptyString),
                operator: t.Optional(nonEmptyString),
                value: t.Optional(nonEmptyString),
                effect: t.Optional(nonEmptyString),
              },
              { additionalProperties: false },
            ),
          ),
        ),
        affinity: t.Optional(t.Record(nonEmptyString, nonEmptyString)),
        privileged: t.Optional(t.Boolean()),
      },
      { additionalProperties: false },
    ),
    network: t.Object(
      {
        exposure: t.Union([
          t.Literal("cluster-internal"),
          t.Literal("cluster-public"),
          t.Literal("host-only"),
        ]),
      },
      { additionalProperties: false },
    ),
    cleanup: t.Object(
      {
        scope: t.Union([t.Literal("tenant-release"), t.Literal("shared-control-plane")]),
      },
      { additionalProperties: false },
    ),
    notes: t.Array(nonEmptyString, { minItems: 1 }),
  },
  { additionalProperties: false },
);
export type BaoRuntimeWorkloadDistributionTarget = Static<typeof baoRuntimeWorkloadTargetSchema>;

export const configOverlayTargetSchema = t.Object(
  {
    overlayId: identifierSchema,
    overlayPath: posixPathSchema,
    targetKinds: t.Array(nonEmptyString),
    scope: t.Union([t.Literal("global"), t.Literal("namespace"), t.Literal("target")]),
    precedence: t.Integer({ minimum: 0, maximum: 1000 }),
  },
  { additionalProperties: false },
);
export type ConfigOverlayTarget = Static<typeof configOverlayTargetSchema>;

export const ociImageTargetSchema = t.Object(
  {
    image: nonEmptyString,
    tag: nonEmptyString,
    registry: t.Optional(nonEmptyString),
    digest: t.Optional(t.String({ pattern: "^sha256:[0-9a-f]{64}$" })),
    context: t.Optional(posixPathSchema),
    containerfile: t.Optional(posixPathSchema),
    platforms: t.Array(nonEmptyString),
    architectures: t.Array(architectureSchema),
    labels: t.Optional(t.Record(nonEmptyString, nonEmptyString)),
  },
  { additionalProperties: false },
);
export type OciImageTarget = Static<typeof ociImageTargetSchema>;

export const usdSceneTargetSchema = t.Object(
  {
    sceneId: identifierSchema,
    usdPath: posixPathSchema,
    stageUp: t.Union([t.Literal("Y"), t.Literal("Z")]),
    metersPerUnit: t.Number({ exclusiveMinimum: 0 }),
    defaultPrim: t.Optional(nonEmptyString),
    assets: t.Optional(t.Array(fileEntrySchema)),
  },
  { additionalProperties: false },
);
export type UsdSceneTarget = Static<typeof usdSceneTargetSchema>;

export const uiComponentKitTargetSchema = t.Object(
  {
    kitId: identifierSchema,
    daisyUiVersionRange: semverRangeSchema,
    tailwindVersionRange: semverRangeSchema,
    components: t.Array(
      t.Object(
        {
          name: identifierSchema,
          entrypoint: posixPathSchema,
          displayName: nonEmptyString,
          category: t.Union([
            t.Literal("action"),
            t.Literal("data-display"),
            t.Literal("data-entry"),
            t.Literal("feedback"),
            t.Literal("layout"),
            t.Literal("navigation"),
            t.Literal("overlay"),
            t.Literal("typography"),
          ]),
        },
        { additionalProperties: false },
      ),
    ),
    themes: t.Optional(t.Array(identifierSchema)),
  },
  { additionalProperties: false },
);
export type UiComponentKitTarget = Static<typeof uiComponentKitTargetSchema>;
