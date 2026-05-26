import { mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { cliLog } from "./cli-log.ts";

const ROOT = resolve(import.meta.dir, "..");
const BINARY = join(ROOT, "dist", "goose-word-linux-arm64");

const run = async (cmd: string[]): Promise<void> => {
  const proc = Bun.spawn(cmd, {
    cwd: ROOT,
    stdout: "inherit",
    stderr: "inherit",
  });
  const code = await proc.exited;
  if (code !== 0) {
    throw new Error(`${cmd.join(" ")} failed with exit code ${code}`);
  }
};

mkdirSync(join(ROOT, "dist"), { recursive: true });

cliLog("Building goose-word for linux-arm64...");
await run([
  "bun",
  "build",
  "--compile",
  "--target=bun-linux-arm64",
  "./src/main.ts",
  "--outfile",
  BINARY,
]);

cliLog(`Binary: ${BINARY}`);
await run(["file", BINARY]);

cliLog("");
cliLog("Install on Pi Zero 2 W (64-bit Raspberry Pi OS):");
cliLog(`  scp ${BINARY} pi@raspberrypi.local:~/goose-word`);
cliLog("  ssh pi@raspberrypi.local 'chmod +x ~/goose-word && ~/goose-word'");
cliLog("");
cliLog("Kiosk (Chromium on the Pi):");
cliLog("  ./scripts/pi-kiosk.sh");
