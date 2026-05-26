import { mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

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

console.log("Building goose-word for linux-arm64...");
await run([
  "bun",
  "build",
  "--compile",
  "--target=bun-linux-arm64",
  "./src/main.ts",
  "--outfile",
  BINARY,
]);

console.log(`Binary: ${BINARY}`);
await run(["file", BINARY]);

console.log("");
console.log("Install on Pi Zero 2 W (64-bit Raspberry Pi OS):");
console.log(`  scp ${BINARY} pi@raspberrypi.local:~/goose-word`);
console.log("  ssh pi@raspberrypi.local 'chmod +x ~/goose-word && ~/goose-word'");
console.log("");
console.log("Kiosk (Chromium on the Pi):");
console.log("  ./scripts/pi-kiosk.sh");
