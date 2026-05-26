import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { $ } from "bun";

const packageRoot = resolve(import.meta.dir, "..");
const inputPath = join(packageRoot, "src/styles/goose-daisy.input.css");
const outputPath = join(packageRoot, "public/styles/goose-daisy.css");

if (!existsSync(inputPath)) {
  console.error(`Missing Tailwind input: ${inputPath}`);
  process.exit(1);
}

await mkdirSafe(dirname(outputPath));

const result = await $`bunx tailwindcss -i ${inputPath} -o ${outputPath} --minify`
  .cwd(packageRoot)
  .nothrow();

if (result.exitCode !== 0) {
  console.error("goose-daisy.css build failed");
  process.stderr.write(result.stderr);
  process.exit(result.exitCode ?? 1);
}

console.log(`goose-daisy.css built → ${outputPath}`);

function mkdirSafe(dir: string): Promise<void> {
  return Bun.write(join(dir, ".keep"), "").then(() => undefined);
}
