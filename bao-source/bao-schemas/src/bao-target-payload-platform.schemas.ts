import { t } from "@baohaus/baobox/elysia";
import {
  identifierSchema,
  nonEmptyString,
  posixPathSchema,
  SEMVER_PATTERN,
} from "./bao-target-payload-common.schemas.ts";

export const flatbufferSchemaTargetSchema = t.Object(
  {
    schemaId: identifierSchema,
    fbsPath: posixPathSchema,
    rootType: t.String({ minLength: 1, pattern: "^[A-Z][A-Za-z0-9]*$" }),
    namespace: t.Optional(nonEmptyString),
    generatedBindings: t.Optional(
      t.Object(
        {
          typescript: t.Optional(posixPathSchema),
          rust: t.Optional(posixPathSchema),
          cpp: t.Optional(posixPathSchema),
          python: t.Optional(posixPathSchema),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const hardwareDriverTargetSchema = t.Object(
  {
    driverId: identifierSchema,
    protocol: t.Union([
      t.Literal("bluetooth"),
      t.Literal("usb"),
      t.Literal("hid"),
      t.Literal("serial"),
      t.Literal("modbus"),
      t.Literal("opcua"),
      t.Literal("bacnet"),
      t.Literal("dmx"),
      t.Literal("artnet"),
      t.Literal("ros2"),
      t.Literal("mavlink"),
      t.Literal("mqtt"),
      t.Literal("pypylon"),
      t.Literal("escpos"),
      t.Literal("gphoto2"),
      t.Literal("custom"),
    ]),
    deviceIds: t.Array(nonEmptyString),
    entrypoint: posixPathSchema,
    nativeAddons: t.Optional(t.Array(posixPathSchema)),
  },
  { additionalProperties: false },
);

/**
 * Canonical AI model task taxonomy. Source of truth for every Bao app
 * that needs to classify or route inference workloads. Adding a task
 * requires a coordinated update to {@link aiModelTargetSchema}, the
 * `selectBaoAgentAiTaskRoute` consumer in agentic-fabric-bao, and any
 * downstream policy persistence (workspace AI policies).
 */
export const BAO_AI_MODEL_TASKS = [
  "classification",
  "detection",
  "segmentation",
  "regression",
  "embedding",
  "text-generation",
  "translation",
  "asr",
  "tts",
  "multimodal",
] as const;

export type BaoAiModelTask = (typeof BAO_AI_MODEL_TASKS)[number];

export const aiModelTargetSchema = t.Object(
  {
    modelId: identifierSchema,
    framework: t.Union([
      t.Literal("onnx"),
      t.Literal("huggingface"),
      t.Literal("bun-ml"),
      t.Literal("pytorch"),
      t.Literal("tensorflow"),
      t.Literal("wasm"),
    ]),
    task: t.Union(BAO_AI_MODEL_TASKS.map((task) => t.Literal(task))),
    inputShape: t.Array(t.Integer({ minimum: -1 })),
    outputShape: t.Array(t.Integer({ minimum: -1 })),
    modelFile: posixPathSchema,
    tokenizerFile: t.Optional(posixPathSchema),
    quantization: t.Optional(
      t.Union([t.Literal("none"), t.Literal("int8"), t.Literal("int4"), t.Literal("float16")]),
    ),
  },
  { additionalProperties: false },
);

export const baodownFlowTargetSchema = t.Object(
  {
    flowId: identifierSchema,
    version: t.String({ pattern: SEMVER_PATTERN }),
    nodes: t.Array(
      t.Object(
        {
          id: identifierSchema,
          kind: nonEmptyString,
          config: t.Optional(t.Record(nonEmptyString, t.Unknown())),
        },
        { additionalProperties: false },
      ),
    ),
    edges: t.Array(
      t.Object(
        {
          from: nonEmptyString,
          to: nonEmptyString,
          fromOutput: t.Optional(identifierSchema),
          toInput: t.Optional(identifierSchema),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const bunbuddyContractTargetSchema = t.Object(
  {
    contract: posixPathSchema,
    contractId: nonEmptyString,
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
    openApiPath: posixPathSchema,
    docsPath: posixPathSchema,
    systemDocPath: t.Optional(posixPathSchema),
    asyncApiPath: t.Optional(posixPathSchema),
    flatbufferSchema: t.Optional(posixPathSchema),
  },
  { additionalProperties: false },
);
