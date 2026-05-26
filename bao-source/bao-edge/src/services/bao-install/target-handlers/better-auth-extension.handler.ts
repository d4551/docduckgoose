import { BaoBetterAuthExtensionTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { registerTargetHandler } from "../bao-target-handler-registry.ts";

registerTargetHandler({
  kind: "better-auth-extension",
  schema: BaoBetterAuthExtensionTargetSchema,
});
