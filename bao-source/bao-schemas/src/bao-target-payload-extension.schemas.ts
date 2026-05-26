import { t } from "@baohaus/baobox/elysia";
import {
  identifierSchema,
  nonEmptyString,
  PACKAGE_NAME_PATTERN,
  posixPathSchema,
  SEMVER_PATTERN,
  semverRangeSchema,
} from "./bao-target-payload-common.schemas.ts";

export const baoPackageTargetSchema = t.Object(
  {
    packageName: t.String({ pattern: PACKAGE_NAME_PATTERN }),
    packageVersion: t.String({ pattern: SEMVER_PATTERN }),
    dependencyLock: t.Array(
      t.Object(
        {
          name: nonEmptyString,
          version: t.String({ pattern: SEMVER_PATTERN }),
          integrity: t.Optional(t.String({ pattern: "^sha256-[A-Za-z0-9+/=]+$" })),
        },
        { additionalProperties: false },
      ),
    ),
    exports: t.Optional(t.Record(nonEmptyString, t.Unknown())),
    bin: t.Optional(t.Union([nonEmptyString, t.Record(nonEmptyString, nonEmptyString)])),
  },
  { additionalProperties: false },
);

export const htmxExtensionTargetSchema = t.Object(
  {
    extensionName: identifierSchema,
    htmxVersionRange: semverRangeSchema,
    attrs: t.Array(t.String({ minLength: 1, pattern: "^[a-zA-Z][a-zA-Z0-9-]*$" })),
    scriptEntrypoint: t.Optional(posixPathSchema),
    styleEntrypoint: t.Optional(posixPathSchema),
  },
  { additionalProperties: false },
);

export const prismaExtensionTargetSchema = t.Object(
  {
    extensionName: identifierSchema,
    prismaVersionRange: semverRangeSchema,
    clientExtensions: t.Array(
      t.Object(
        {
          name: nonEmptyString,
          kind: t.Union([
            t.Literal("result"),
            t.Literal("query"),
            t.Literal("model"),
            t.Literal("client"),
          ]),
          entrypoint: posixPathSchema,
        },
        { additionalProperties: false },
      ),
    ),
    schemaFragment: t.Optional(posixPathSchema),
  },
  { additionalProperties: false },
);

export const betterAuthExtensionTargetSchema = t.Object(
  {
    extensionName: identifierSchema,
    betterAuthVersionRange: semverRangeSchema,
    scopes: t.Array(nonEmptyString),
    pluginPath: posixPathSchema,
    providers: t.Optional(
      t.Array(
        t.Object(
          {
            id: identifierSchema,
            protocol: t.Union([
              t.Literal("oidc"),
              t.Literal("oauth2"),
              t.Literal("saml"),
              t.Literal("passkey"),
              t.Literal("magic-link"),
            ]),
          },
          { additionalProperties: false },
        ),
      ),
    ),
  },
  { additionalProperties: false },
);

export const elysiaPluginTargetSchema = t.Object(
  {
    plugin: posixPathSchema,
    pluginEntrypoint: t.Optional(posixPathSchema),
    manifestName: t.Optional(nonEmptyString),
    runtimeName: t.Optional(nonEmptyString),
    exportSymbol: t.Optional(nonEmptyString),
    exportKind: t.Optional(
      t.Union([t.Literal("default"), t.Literal("named"), t.Literal("factory")]),
    ),
    factoryOptionsRef: t.Optional(nonEmptyString),
    route: t.Optional(t.String({ minLength: 1, pattern: "^/" })),
    lifecycle: t.Optional(
      t.Array(
        t.Union([
          t.Literal("onRequest"),
          t.Literal("beforeHandle"),
          t.Literal("afterHandle"),
          t.Literal("onError"),
          t.Literal("onResponse"),
        ]),
      ),
    ),
  },
  { additionalProperties: false },
);

export const baodownNodeTargetSchema = t.Object(
  {
    nodeModule: posixPathSchema,
    typeId: t.Optional(identifierSchema),
  },
  { additionalProperties: false },
);

export const sidebarTargetSchema = t.Object(
  {
    sidebarModule: posixPathSchema,
  },
  { additionalProperties: false },
);

export const navTargetSchema = t.Object(
  {
    navModule: posixPathSchema,
  },
  { additionalProperties: false },
);

export const settingsTabTargetSchema = t.Object(
  {
    settingsTabModule: posixPathSchema,
    settingsPanelModule: t.Optional(posixPathSchema),
  },
  { additionalProperties: false },
);

export const paletteEntryGroupTargetSchema = t.Object(
  {
    paletteEntryGroupModule: posixPathSchema,
  },
  { additionalProperties: false },
);

export const apiGroupTargetSchema = t.Object(
  {
    apiGroupModule: posixPathSchema,
  },
  { additionalProperties: false },
);

export const tileGroupTargetSchema = t.Object(
  {
    tileGroupModule: posixPathSchema,
  },
  { additionalProperties: false },
);

export const topbarTargetSchema = t.Object(
  {
    topbarModule: posixPathSchema,
  },
  { additionalProperties: false },
);

export const themePackTargetSchema = t.Object(
  {
    themeId: identifierSchema,
    colorScheme: t.Union([t.Literal("light"), t.Literal("dark")]),
    daisyUiVersionRange: semverRangeSchema,
    stylesheet: t.String({ minLength: 1, pattern: "^[^\\0]+\\.css$" }),
  },
  { additionalProperties: false },
);

export const designTokensTargetSchema = t.Object(
  {
    tokenSetId: identifierSchema,
    categories: t.Array(
      t.Union([
        t.Literal("spacing"),
        t.Literal("radius"),
        t.Literal("shadow"),
        t.Literal("motion-curve"),
        t.Literal("typography"),
      ]),
      { minItems: 1 },
    ),
    stylesheet: t.String({ minLength: 1, pattern: "^[^\\0]+\\.css$" }),
  },
  { additionalProperties: false },
);

export const motionPresetTargetSchema = t.Object(
  {
    presetId: identifierSchema,
    profile: t.Union([t.Literal("calm"), t.Literal("standard"), t.Literal("expressive")]),
    respectsReducedMotion: t.Boolean(),
    stylesheet: t.String({ minLength: 1, pattern: "^[^\\0]+\\.css$" }),
  },
  { additionalProperties: false },
);

export const densityPresetTargetSchema = t.Object(
  {
    presetId: identifierSchema,
    density: t.Union([t.Literal("compact"), t.Literal("comfortable"), t.Literal("spacious")]),
    stylesheet: t.String({ minLength: 1, pattern: "^[^\\0]+\\.css$" }),
  },
  { additionalProperties: false },
);

export const mcpProviderTargetSchema = t.Object(
  {
    providerId: identifierSchema,
    mcpProtocolVersion: nonEmptyString,
    entrypoint: posixPathSchema,
    tools: t.Array(
      t.Object(
        {
          name: t.String({ minLength: 1, pattern: "^[a-zA-Z0-9][a-zA-Z0-9.-]*$" }),
          description: nonEmptyString,
          inputSchema: t.Optional(posixPathSchema),
        },
        { additionalProperties: false },
      ),
    ),
    resources: t.Optional(
      t.Array(
        t.Object(
          {
            uri: nonEmptyString,
            name: identifierSchema,
            mimeType: t.Optional(nonEmptyString),
          },
          { additionalProperties: false },
        ),
      ),
    ),
    prompts: t.Optional(
      t.Array(
        t.Object(
          {
            name: identifierSchema,
            description: nonEmptyString,
            arguments: t.Optional(
              t.Array(
                t.Object(
                  {
                    name: identifierSchema,
                    description: nonEmptyString,
                    required: t.Boolean(),
                  },
                  { additionalProperties: false },
                ),
              ),
            ),
          },
          { additionalProperties: false },
        ),
      ),
    ),
  },
  { additionalProperties: false },
);

export const bunPluginTargetSchema = t.Object(
  {
    pluginName: identifierSchema,
    bunVersionRange: semverRangeSchema,
    entrypoint: posixPathSchema,
    hooks: t.Array(
      t.Union([
        t.Literal("onResolve"),
        t.Literal("onLoad"),
        t.Literal("onStart"),
        t.Literal("onEnd"),
      ]),
    ),
    filters: t.Optional(t.Array(nonEmptyString)),
  },
  { additionalProperties: false },
);

export const nativeMobileShellTargetSchema = t.Object(
  {
    platform: t.Union([t.Literal("android"), t.Literal("ios")]),
    serverMode: t.Literal("embedded"),
    loopbackHost: t.String({ minLength: 1, default: "127.0.0.1" }),
    loopbackPort: t.Integer({ minimum: 1, maximum: 65535 }),
    healthPath: posixPathSchema,
    webviewEntrypoint: posixPathSchema,
  },
  { additionalProperties: false },
);
