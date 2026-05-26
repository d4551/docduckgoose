import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const gooseWordRoot = resolve(ROOT, "../../goose-word");
const androidBinary = join(gooseWordRoot, "dist", "goose-word-android-arm64");
const assetDir = join(ROOT, "android", "app", "src", "main", "assets");

const proc = Bun.spawn(["bunx", "cap", "sync"], {
  cwd: ROOT,
  stdout: "inherit",
  stderr: "inherit",
});
const code = await proc.exited;
if (code !== 0) {
  throw new Error(`cap sync failed (${code})`);
}

if (existsSync(androidBinary)) {
  mkdirSync(assetDir, { recursive: true });
  cpSync(androidBinary, join(assetDir, "goose-word-android-arm64"));
  process.stdout.write(`cap:sync copied goose-word-android-arm64 into ${assetDir}\n`);
} else {
  process.stderr.write(
    "cap:sync skip binary — run: bun run --cwd ../../goose-word mobile:server:android\n",
  );
}
