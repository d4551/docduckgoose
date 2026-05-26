import { runNoCheckedInBaoGate } from "../src/gates/no-checkedin-bao.ts";
import { createValidatorContext } from "../src/gates/validators/context.ts";
import { ALL_RULE_NAMES, createRules } from "../src/gates/validators/rules.ts";
import { validatorConfig } from "../validator.config.ts";

const targetRule = Bun.argv.at(2);
const noCheckedInBaoRule = "no-checkedin-bao";

if (!targetRule) {
  throw new Error("Usage: bun run ./scripts/validate.ts <rule|all>");
}

const root = process.cwd();
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
