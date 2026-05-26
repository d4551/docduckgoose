import {
  type BaoInstallTarget,
  BaoMcpProviderTargetSchema,
} from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type { BaoTargetSchemaIssue } from "@baohaus/bao-sdk/target-handler";
import { registerTargetHandler } from "../bao-target-handler-registry.ts";

registerTargetHandler({
  kind: "mcp-provider",
  schema: BaoMcpProviderTargetSchema,
  validate(target: BaoInstallTarget): readonly BaoTargetSchemaIssue[] {
    const issues: BaoTargetSchemaIssue[] = [];
    const hasProvider = "provider" in target;
    const hasTools = "tools" in target;

    if (hasProvider && hasTools) {
      issues.push({
        path: "provider",
        message:
          "mcp-provider target must have exactly one of 'provider' or 'tools', but both are present.",
        severity: "error",
      });
    }

    if (!(hasProvider || hasTools)) {
      issues.push({
        path: "provider",
        message:
          "mcp-provider target must have exactly one of 'provider' or 'tools', but neither is present.",
        severity: "error",
      });
    }

    return issues;
  },
});
