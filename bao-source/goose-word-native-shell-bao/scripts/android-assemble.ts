import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const gradlew = join(ROOT, "android", "gradlew");
if (!existsSync(gradlew)) {
  throw new Error("Android project missing — run cap:sync after bun install");
}

const proc = Bun.spawn(["./gradlew", "assembleDebug"], {
  cwd: join(ROOT, "android"),
  stdout: "inherit",
  stderr: "inherit",
});
const code = await proc.exited;
if (code !== 0) {
  throw new Error(`assembleDebug failed (${code})`);
}
const apk = join(ROOT, "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk");
process.stdout.write(`APK: ${apk}\n`);
