import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const project = join(ROOT, "ios", "App", "App.xcodeproj");
if (!existsSync(project)) {
  throw new Error("iOS project missing — run cap:sync after bun install");
}

const proc = Bun.spawn(
  [
    "xcodebuild",
    "-project",
    project,
    "-scheme",
    "App",
    "-configuration",
    "Debug",
    "-sdk",
    "iphonesimulator",
    "-destination",
    "generic/platform=iOS Simulator",
    "build",
  ],
  { cwd: ROOT, stdout: "inherit", stderr: "inherit" },
);
const code = await proc.exited;
if (code !== 0) {
  throw new Error(`xcodebuild failed (${code})`);
}
process.stdout.write("iOS simulator build complete\n");
