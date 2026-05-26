import { BaoBunbuddyContractTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { registerTargetHandler } from "../bao-target-handler-registry.ts";

registerTargetHandler({
  kind: "bunbuddy-contract",
  schema: BaoBunbuddyContractTargetSchema,
});
