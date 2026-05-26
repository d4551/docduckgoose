import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const WORKSPACE_ROOT = resolve(ROOT, "..");
const PLUGINS_ROOT = resolve(WORKSPACE_ROOT, "goose-word-plugins");
const OUT_ROOT = join(ROOT, "dist", "bao-copy");
const APP_OUT = join(OUT_ROOT, "goose-word");
const ASSET_PACKAGES = [
  "goose-word-ui-bao",
  "htmx-vendor-bao",
  "baohaus-design-tokens-aurora-bao",
  "baohaus-density-preset-aurora-bao",
  "font-bao",
];

const run = async (cmd: string[], cwd: string): Promise<void> => {
  const proc = Bun.spawn(cmd, {
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  });
  const code = await proc.exited;
  if (code !== 0) {
    throw new Error(`${cmd.join(" ")} failed with exit code ${code}`);
  }
};

const copyIfExists = (from: string, to: string): void => {
  if (existsSync(from)) {
    cpSync(from, to, {
      recursive: true,
      filter: (source) =>
        !source.endsWith(".DS_Store") &&
        !source.includes("/node_modules/") &&
        !source.includes("/dist/bao/") &&
        !source.endsWith(".bao") &&
        !source.endsWith(".zip") &&
        !source.endsWith(".tar") &&
        !source.endsWith(".tar.gz"),
    });
  }
};

const pluginRoots = readdirSync(PLUGINS_ROOT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => join(PLUGINS_ROOT, entry.name))
  .filter((dir) => existsSync(join(dir, "package.json")));

for (const pluginRoot of pluginRoots) {
  await run(["bun", "run", "build"], pluginRoot);
}

// .bao single source: always generate thin adapters (DRY, cut legacy per-plugin wrapper writes). One impl here.
for (const pluginRoot of pluginRoots) {
  const distDir = join(pluginRoot, "dist");
  const extDir = join(distDir, "bao-extensions");
  mkdirSync(extDir, { recursive: true });
  writeFileSync(
    join(extDir, "settings-tab.js"),
    'import plugin from "../index.js";\nexport const createSettingsTabRegistrations = plugin.createSettingsTabRegistrations;\n',
  );
  writeFileSync(
    join(extDir, "elysia-plugin.js"),
    `import plugin from "../index.js";\nexport default function ${basename(pluginRoot).replace(/-./g, (m) => m[1] ?? "")}Bao(app) {\n  if (typeof plugin.registerElysia === "function") plugin.registerElysia(app);\n  return app;\n}\n`,
  );
  writeFileSync(
    join(extDir, "enterprise-context.js"),
    'import plugin from "../index.js";\nexport const createEnterpriseContextRegistrations = plugin.createEnterpriseContextRegistrations;\n',
  );
}

await run(
  ["bun", "run", "bao:validate"],
  resolve(WORKSPACE_ROOT, "bao-source", "goose-word-ui-bao"),
);
await run(["bun", "run", "bao:validate", "--skip-built-entrypoints"], ROOT);

rmSync(OUT_ROOT, { recursive: true, force: true });
mkdirSync(APP_OUT, { recursive: true });

for (const file of ["package.json", "bao-governance.json"]) {
  cpSync(join(ROOT, file), join(APP_OUT, file));
}

for (const packageName of ASSET_PACKAGES) {
  copyIfExists(
    join(WORKSPACE_ROOT, "bao-source", packageName),
    join(APP_OUT, "assets", packageName),
  );
}

copyIfExists(join(ROOT, "scripts", "pi-kiosk.sh"), join(APP_OUT, "scripts", "pi-kiosk.sh"));
copyIfExists(
  join(ROOT, "dist", "goose-word-linux-arm64"),
  join(APP_OUT, "dist", "goose-word-linux-arm64"),
);

for (const pluginRoot of pluginRoots) {
  const pluginOut = join(OUT_ROOT, basename(pluginRoot));
  mkdirSync(pluginOut, { recursive: true });
  for (const file of ["package.json", "bao-governance.json"]) {
    cpSync(join(pluginRoot, file), join(pluginOut, file));
  }
  copyIfExists(join(pluginRoot, "dist"), join(pluginOut, "dist"));
}

console.log("bao:build ok");
console.log(`Copy-first app package: ${APP_OUT}`);
for (const pluginRoot of pluginRoots) {
  console.log(`Copy-first plugin package: ${join(OUT_ROOT, basename(pluginRoot))}`);
}
console.log("No .bao archive was created; copy the package directories to ~/.goose-word/bao/.");
