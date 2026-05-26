import { spawn } from "node:child_process";
import process from "node:process";

const proc = spawn(
  "bunx",
  ["--bun", "tsc", "--project", "tsconfig.json", "--declaration", "--emitDeclarationOnly", "false"],
  {
    stdio: "inherit",
  },
);
proc.on("exit", (exitCode) => {
  if (exitCode !== 0) {
    process.exit(exitCode ?? 1);
  }
  const declProc = spawn(
    "bunx",
    ["--bun", "tsc", "--project", "tsconfig.json", "--declaration", "--emitDeclarationOnly"],
    { stdio: "inherit" },
  );
  declProc.on("exit", (declExit) => {
    process.exit(declExit ?? 0);
  });
});
