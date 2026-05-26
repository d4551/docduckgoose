import { mkdir } from "node:fs/promises";
import { rootDir, rootPath, runCommand, writeStdout } from "./runtime";

type CheckDefinition = {
  readonly label: string;
  readonly command: readonly string[];
  readonly cwd: string;
};

const reportDirectory = rootPath(".artifacts/live-test");

function formatTimestamp(date: Date): string {
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

const generatedAt = new Date();
const reportFile = `${reportDirectory}/live-test-gate-${formatTimestamp(generatedAt)}.txt`;
const latestFile = `${reportDirectory}/live-test-gate-latest.txt`;

const checks: readonly CheckDefinition[] = [
  {
    label: "command-bao typecheck",
    command: ["bun", "run", "typecheck"],
    cwd: rootPath("command-bao"),
  },
  {
    label: "command-bao tests",
    command: ["bun", "test"],
    cwd: rootPath("command-bao"),
  },
  {
    label: "capability audit",
    command: [
      "bun",
      "run",
      "--cwd",
      "tooling/flow-dumpling",
      "src/cli.ts",
      "audit",
      "capability-gaps",
    ],
    cwd: rootDir,
  },
  {
    label: "code practice audit",
    command: [
      "bun",
      "run",
      "--cwd",
      "tooling/flow-dumpling",
      "src/cli.ts",
      "audit",
      "code-practices",
    ],
    cwd: rootDir,
  },
  {
    label: "version freshness policy (offline)",
    command: [
      "bun",
      "run",
      "--cwd",
      "tooling/flow-dumpling",
      "src/cli.ts",
      "audit",
      "version-freshness",
    ],
    cwd: rootDir,
  },
  {
    label: "tooling typecheck",
    command: ["bun", "run", "typecheck"],
    cwd: rootPath("tooling/flow-dumpling"),
  },
  {
    label: "tooling tests",
    command: ["bun", "test"],
    cwd: rootPath("tooling/flow-dumpling"),
  },
];

await mkdir(reportDirectory, { recursive: true });

const reportLines: string[] = [
  "Live Test Gate Report",
  `Generated at: ${generatedAt.toISOString()}`,
  `Repository: ${rootDir}`,
  "",
];

let failedChecks = 0;

for (const check of checks) {
  writeStdout(`==> ${check.label}`);
  reportLines.push(`==> ${check.label}`);

  const result = await runCommand(check.command, check.cwd);
  if (result.stdoutText) {
    process.stdout.write(result.stdoutText);
    reportLines.push(result.stdoutText.trimEnd());
  }
  if (result.stderrText) {
    process.stderr.write(result.stderrText);
    reportLines.push(result.stderrText.trimEnd());
  }

  if (result.exitCode === 0) {
    writeStdout(`PASS: ${check.label}`);
    reportLines.push(`PASS: ${check.label}`);
  } else {
    writeStdout(`FAIL: ${check.label}`);
    reportLines.push(`FAIL: ${check.label}`);
    failedChecks += 1;
  }

  reportLines.push("");
}

reportLines.push("Summary");
reportLines.push(`- Total checks: ${checks.length}`);
reportLines.push(`- Failed checks: ${failedChecks}`);
reportLines.push(`- Result: ${failedChecks === 0 ? "PASS" : "FAIL"}`);

const reportText = `${reportLines.join("\n")}\n`;
await Bun.write(reportFile, reportText);
await Bun.write(latestFile, reportText);

writeStdout(`Report written to: ${reportFile}`);
writeStdout(`Latest report copy: ${latestFile}`);

if (failedChecks > 0) {
  process.exit(1);
}
