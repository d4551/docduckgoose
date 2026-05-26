import { mkdir, readdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const packageRoot = resolve(import.meta.dir, "..");
const fontsRoot = resolve(packageRoot, "dist", "fonts");

interface FontPackageSpec {
  readonly packageName: string;
  readonly outputDir: string;
}

const FONT_PACKAGE_SPECS: readonly FontPackageSpec[] = [
  { packageName: "@fontsource-variable/inter", outputDir: "inter" },
  { packageName: "@fontsource-variable/jetbrains-mono", outputDir: "jetbrains-mono" },
  { packageName: "@fontsource/dm-sans", outputDir: "dm-sans" },
  { packageName: "@fontsource/ibm-plex-mono", outputDir: "ibm-plex-mono" },
  { packageName: "@fontsource/instrument-serif", outputDir: "instrument-serif" },
  { packageName: "@fontsource/playfair-display", outputDir: "playfair-display" },
  { packageName: "@fontsource/syne", outputDir: "syne" },
];

function resolvePackageAssetPath(packageJsonSpecifier: string, relativePath: string): string {
  return Bun.fileURLToPath(
    new URL(relativePath, new URL(".", import.meta.resolve(packageJsonSpecifier))),
  );
}

async function copyLatinFontFiles(spec: FontPackageSpec): Promise<number> {
  const filesDir = resolvePackageAssetPath(`${spec.packageName}/package.json`, "files");
  const entries = await readdir(filesDir);
  const outputDir = join(fontsRoot, spec.outputDir);
  let copied = 0;
  for (const entry of entries) {
    if (!entry.includes("-latin-")) {
      continue;
    }
    if (!(entry.endsWith(".woff") || entry.endsWith(".woff2"))) {
      continue;
    }
    const sourcePath = join(filesDir, entry);
    const destinationPath = join(outputDir, entry);
    await mkdir(dirname(destinationPath), { recursive: true });
    await Bun.write(destinationPath, Bun.file(sourcePath));
    copied += 1;
  }
  if (copied === 0) {
    throw new Error(`No latin font files copied for ${spec.packageName}`);
  }
  return copied;
}

await rm(fontsRoot, { recursive: true, force: true });
for (const spec of FONT_PACKAGE_SPECS) {
  await copyLatinFontFiles(spec);
}
