import { runNoCheckedInBaoGate } from "../src/gates/no-checkedin-bao.ts";
import { createValidatorContext } from "../src/gates/validators/context.ts";
import { ALL_RULE_NAMES, createRules } from "../src/gates/validators/rules.ts";

const rawArgs = Bun.argv.slice(2);
const targetRule = rawArgs.find((a) => !a.startsWith("--")) || rawArgs[0];
const configArgIndex = rawArgs.findIndex((a) => a === "--config");
const customConfigPath = configArgIndex !== -1 ? rawArgs[configArgIndex + 1] : null;
const noCheckedInBaoRule = "no-checkedin-bao";

if (!targetRule) {
  throw new Error("Usage: bun run ./scripts/validate.ts <rule|all> [--config <path-to-validator.config.ts>]");
}

const root = process.cwd();

let validatorConfig: any;
if (customConfigPath) {
  const configUrl = new URL(customConfigPath, `file://${root}/`);
  const mod = await import(configUrl.href);
  validatorConfig = mod.validatorConfig;
} else {
  const mod = await import("../validator.config.ts");
  validatorConfig = mod.validatorConfig;
}

const runAll = targetRule === "all";

if (
  !(
    runAll ||
    targetRule === noCheckedInBaoRule ||
    ALL_RULE_NAMES.includes(targetRule as (typeof ALL_RULE_NAMES)[number])
  )
) {
  throw new Error(`Unknown validation rule: ${targetRule}`);
}

if (runAll) {
  for (const ruleName of ALL_RULE_NAMES) {
    const ctx = await createValidatorContext(root, ruleName, validatorConfig);
    const allRules = createRules(ctx);
    await allRules[ruleName]();
  }
  const noCheckedInBaoExitCode = await runNoCheckedInBaoGate();
  if (noCheckedInBaoExitCode !== 0) {
    process.exit(noCheckedInBaoExitCode);
  }
} else if (targetRule === noCheckedInBaoRule) {
  process.exit(await runNoCheckedInBaoGate());
} else {
  const ctx = await createValidatorContext(root, targetRule, validatorConfig);
  const allRules = createRules(ctx);
  await allRules[targetRule as (typeof ALL_RULE_NAMES)[number]]();
}
