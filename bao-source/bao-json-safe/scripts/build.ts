import { spawn } from "node:child_process";
import process from "node:process";

const proc = spawn("bunx", ["--bun", "tsc", "--project", "tsconfig.json"], { stdio: "inherit" });
proc.on("exit", (exitCode) => process.exit(exitCode ?? 0));
