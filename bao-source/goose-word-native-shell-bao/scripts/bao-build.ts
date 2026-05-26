import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const OUT = join(ROOT, "dist", "bao-copy", "goose-word-native-shell-bao");

const run = async (cmd: string[], cwd: string): Promise<void> => {
  const proc = Bun.spawn(cmd, { cwd, stdout: "inherit", stderr: "inherit" });
  const code = await proc.exited;
  if (code !== 0) {
    throw new Error(`${cmd.join(" ")} failed (${code})`);
  }
};

rmSync(join(ROOT, "dist", "bao-copy"), { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const name of [
  "bao-governance.json",
  "capacitor.config.ts",
  "package.json",
  "www",
  "android",
  "ios",
  "src",
]) {
  const from = join(ROOT, name);
  if (existsSync(from)) {
    cpSync(from, join(OUT, name), { recursive: true });
  }
}

const gooseWordRoot = resolve(ROOT, "../../goose-word");
const androidBinary = join(gooseWordRoot, "dist", "goose-word-android-arm64");
const assetDir = join(OUT, "android", "app", "src", "main", "assets");
if (existsSync(androidBinary)) {
  mkdirSync(assetDir, { recursive: true });
  cpSync(androidBinary, join(assetDir, "goose-word-android-arm64"));
  console.log("Copied android goose-word binary into shell assets");
} else {
  console.log("Skip android binary copy — build goose-word mobile:server:android first");
}

await run(["bun", "run", "cap:sync"], ROOT);
console.log(`bao-copy ready: ${OUT}`);
