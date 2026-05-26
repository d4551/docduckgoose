/// <reference types="bun" />
/**
 * Runs the full Bao code-quality gate suite against goose-word source
 * using the local validator.config.ts for allowlists (env access, sanctioned
 * client fetch surface, etc.).
 *
 * This thin launcher uses the enhanced main Bao validator (which supports --config)
 * so resolution works correctly in the monorepo.
 *
 * Usage (from goose-word dir or monorepo root with --cwd):
 *   bun run ./scripts/bao-validate-gates.ts [all|specific-rule]
 */
const targetRule = Bun.argv.at(2) ?? "all";
const root = process.cwd();

const baoValidate = new URL("../../bao/scripts/validate.ts", import.meta.url).pathname;

const proc = Bun.spawn(
  ["bun", "run", baoValidate, targetRule, "--config", "./validator.config.ts"],
  {
    cwd: root,
    stdout: "inherit",
    stderr: "inherit",
  }
);

const exitCode = await proc.exited;
process.exit(exitCode);
