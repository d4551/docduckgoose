import { BaoBaoDownFlowTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { registerTargetHandler } from "../bao-target-handler-registry.ts";

registerTargetHandler({
  kind: "baodown-flow",
  schema: BaoBaoDownFlowTargetSchema,
});
