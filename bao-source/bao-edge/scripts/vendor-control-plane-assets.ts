import { fail, rootPath, runCommand, writeStdout } from "./runtime";

writeStdout("[vendor-assets] Building pinned command-bao assets...");

const result = await runCommand(["bun", "run", "assets:build"], rootPath("command-bao"));
if (result.stdoutText) {
  process.stdout.write(result.stdoutText);
}
if (result.stderrText) {
  process.stderr.write(result.stderrText);
}
if (result.exitCode !== 0) {
  fail("[vendor-assets] command-bao asset build failed");
}

writeStdout("[vendor-assets] Done. Assets rebuilt in command-bao/public.");
