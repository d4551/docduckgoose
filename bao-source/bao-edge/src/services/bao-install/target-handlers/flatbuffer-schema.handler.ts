import { BaoFlatbufferSchemaTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { registerTargetHandler } from "../bao-target-handler-registry.ts";

registerTargetHandler({
  kind: "flatbuffer-schema",
  schema: BaoFlatbufferSchemaTargetSchema,
});
