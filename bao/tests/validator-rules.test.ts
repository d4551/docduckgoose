import { describe, expect, test } from "bun:test";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { BAO_ARCHIVE_MEDIA_TYPE } from "@baohaus/bao-schemas/bao/bao-archive.contract";
import { collectTrackedArtifactViolations } from "../src/gates/no-checkedin-bao.ts";
import { createValidatorContext } from "../src/gates/validators/context.ts";
import { createRules } from "../src/gates/validators/rules.ts";

const repoUrl = new URL("../", import.meta.url);
const LEGACY_ARCHIVE_MEDIA_TYPE = `application/vnd.baohaus.bao.${"v1"}+tar`;
const LEGACY_SCHEMA_EXPORT = `./bao-${String.fromCharCode(
  99,
  111,
  110,
  118,
  101,
  114,
  115,
  105,
  111,
  110,
)}.schemas`;
const LEGACY_TOOL_TARGET = `tools-${String.fromCharCode(115, 104, 105, 109)}`;

const ensureDirectory = (url: URL): void => {
  mkdirSync(fileURLToPath(url), { recursive: true });
};

const fixtureRoot = (name: string): URL => {
  const root = new URL(`.bao-build/validator-fixtures/${name}-${crypto.randomUUID()}/`, repoUrl);
  ensureDirectory(root);
  return root;
};

const writeFixture = async (root: URL, path: string, contents: string): Promise<void> => {
  const fileUrl = new URL(path, root);
  ensureDirectory(new URL("./", fileUrl));
  await Bun.write(fileUrl, contents);
};

const createFixtureRules = async (
  root: URL,
  ruleName: string,
  config: Parameters<typeof createValidatorContext>[2] = {},
) => {
  const ctx = await createValidatorContext(fileURLToPath(root), ruleName, config);
  return createRules(ctx);
};

describe("shared validator rules", () => {
  test("tracked artifact policy rejects generated debris and noncanonical archives", () => {
    const allowedArchives = new Set(["bao-source/style-shumai/dist/bao/style-shumai.bao"]);

    expect(
      collectTrackedArtifactViolations(
        [
          "bao/.bao-build/bao.lock",
          "bao/scripts/bao-validate.js",
          "registry/.DS_Store",
          "bao-source/style-shumai/.generated/releases/style-shumai.bao",
        ],
        allowedArchives,
      ),
    ).toEqual([
      "bao/.bao-build/bao.lock: .bao-build artifacts must not be tracked",
      "bao/scripts/bao-validate.js: generated JavaScript sibling must not be tracked",
      "registry/.DS_Store: .DS_Store must not be tracked",
      "bao-source/style-shumai/.generated/releases/style-shumai.bao: .bao archive is not a catalog canonicalBaoOutputPath",
    ]);
  });

  test("tracked artifact policy accepts catalog-listed .bao archive outputs", () => {
    expect(
      collectTrackedArtifactViolations(
        ["bao-source/style-shumai/dist/bao/style-shumai.bao"],
        new Set(["bao-source/style-shumai/dist/bao/style-shumai.bao"]),
      ),
    ).toEqual([]);
  });

  test("bao archive policy rejects legacy archive media contracts", async () => {
    const root = fixtureRoot("legacy-media");
    await writeFixture(
      root,
      "src/bad.ts",
      `export const mediaType = "${LEGACY_ARCHIVE_MEDIA_TYPE}";\n`,
    );

    const rules = await createFixtureRules(root, "bao-archive-policy");

    await expect(rules["bao-archive-policy"]()).rejects.toThrow("retired Bao archive");
  });

  test("bao archive policy requires canonical governance media type", async () => {
    const root = fixtureRoot("governance-media");
    await writeFixture(
      root,
      "bao-governance.json",
      JSON.stringify({ mediaType: LEGACY_ARCHIVE_MEDIA_TYPE }),
    );

    const rules = await createFixtureRules(root, "bao-archive-policy");

    await expect(rules["bao-archive-policy"]()).rejects.toThrow("canonical mediaType");
  });

  test("bao archive policy accepts canonical .bao metadata", async () => {
    const root = fixtureRoot("canonical-media");
    await writeFixture(
      root,
      "bao-governance.json",
      JSON.stringify({ mediaType: BAO_ARCHIVE_MEDIA_TYPE }),
    );
    await writeFixture(
      root,
      "src/good.ts",
      `export const mediaType = "${BAO_ARCHIVE_MEDIA_TYPE}";\n`,
    );

    const rules = await createFixtureRules(root, "bao-archive-policy");

    await expect(rules["bao-archive-policy"]()).resolves.toBeUndefined();
  });

  test("bao archive policy rejects stale catalog export names", async () => {
    const root = fixtureRoot("legacy-catalog-export");
    await writeFixture(
      root,
      "bao-packages.json",
      JSON.stringify({ exports: [LEGACY_SCHEMA_EXPORT] }),
    );

    const rules = await createFixtureRules(root, "bao-archive-policy");

    await expect(rules["bao-archive-policy"]()).rejects.toThrow("retired catalog export");
  });

  test("bao archive policy rejects stale docs vocabulary", async () => {
    const root = fixtureRoot("legacy-docs-vocabulary");
    await writeFixture(
      root,
      "docs/bad.md",
      JSON.stringify({ kind: "mcp-provider", target: LEGACY_TOOL_TARGET }),
    );

    const rules = await createFixtureRules(root, "bao-archive-policy");

    await expect(rules["bao-archive-policy"]()).rejects.toThrow("retired docs vocabulary");
  });

  test("bao archive policy rejects stale unreleased package naming", async () => {
    const root = fixtureRoot("legacy-package-naming");
    await writeFixture(
      root,
      "docs/index.html",
      '<a href="https://github.com/d4551/smileclub/tree/main/packages-src/piratebao">docs</a>\n<script src="https://raw.githubusercontent.com/d4551/smileclub/main/app.js"></script>\n',
    );
    await writeFixture(
      root,
      ".github/copilot-instructions.md",
      "`platform/forge/legacy-bao/apps/legacy-server/auth/better-auth.ts`\n",
    );
    await writeFixture(root, "package.json", '{"dependencies":{"@baohaus/legacy-core":"0.1.0"}}\n');
    await writeFixture(root, "src/app.ts", 'const appName = "Legacy Bao";\n');
    await writeFixture(root, "src/assets.ts", 'const css = "/assets/legacy-bao.css";\n');
    await writeFixture(root, "src/theme.ts", 'const oldTheme = "legacy-theme";\n');
    await writeFixture(root, "src/schema.ts", 'const queueSchema = "legacy_baoboss";\n');
    await writeFixture(root, "src/dom.ts", 'const staleDomId = "legacy-shell-fragment";\n');
    await writeFixture(
      root,
      "src/signing.ts",
      "const keyLoader = 'loadCanonicalSmileclubArchiveSigningKey';\n",
    );
    await writeFixture(root, "src/routes.ts", "const routeMap = { baoArchiveJobs: true };\n");
    await writeFixture(
      root,
      "src/assets/locales/en.json",
      JSON.stringify({ baoComposer: { features: { "bao-archive-jobs": {} } } }),
    );

    const rules = await createFixtureRules(root, "bao-archive-policy");

    await expect(rules["bao-archive-policy"]()).rejects.toThrow("retired package naming");
  });

  test("bao archive policy rejects GitHub raw URL variants", async () => {
    const root = fixtureRoot("github-raw-package-naming");
    await writeFixture(
      root,
      "src/allowlist.ts",
      'const allowlistUrl = "https://github.com/d4551/baohaus/raw/refs/heads/main/model_allowlists/1_0_10.json";\n',
    );

    const rules = await createFixtureRules(root, "bao-archive-policy");

    await expect(rules["bao-archive-policy"]()).rejects.toThrow("retired package naming");
  });

  test("bao archive policy rejects non-canonical source metadata paths", async () => {
    const root = fixtureRoot("non-canonical-source-metadata");
    await writeFixture(root, "src/instructions.ts", 'const instructionPath = ".bao/BAO.md";\n');
    await writeFixture(root, "src/lock.ts", 'const lockPath = ".bao.lock";\n');

    const rules = await createFixtureRules(root, "bao-archive-policy");

    await expect(rules["bao-archive-policy"]()).rejects.toThrow("non-canonical .bao metadata path");
  });

  test("bao archive policy allows pending-publish locks outside release artifacts", async () => {
    const root = fixtureRoot("pending-publish-lock");
    await writeFixture(
      root,
      "bao.lock",
      JSON.stringify({
        resolved: [
          {
            name: "@baohaus/example",
            version: "0.1.0",
            ociDigest: null,
            integrity: null,
            signature: null,
            resolvedFrom: "pending-publish",
          },
        ],
      }),
    );

    const rules = await createFixtureRules(root, "bao-archive-policy");

    await expect(rules["bao-archive-policy"]()).resolves.toBeUndefined();
  });

  test("bao archive policy rejects pending-publish locks for release artifacts", async () => {
    const root = fixtureRoot("release-pending-publish-lock");
    await writeFixture(
      root,
      "bao.lock",
      JSON.stringify({
        resolved: [
          {
            name: "@baohaus/example",
            version: "0.1.0",
            ociDigest: null,
            integrity: null,
            signature: null,
            resolvedFrom: "pending-publish",
          },
        ],
      }),
    );

    const rules = await createFixtureRules(root, "bao-archive-policy", {
      forbidPendingPublishLocks: true,
    });

    await expect(rules["bao-archive-policy"]()).rejects.toThrow("pending-publish");
  });

  test("bao archive policy rejects null release trust fields", async () => {
    const root = fixtureRoot("release-null-trust-lock");
    await writeFixture(
      root,
      "bao.lock",
      JSON.stringify({
        resolved: [
          {
            name: "@baohaus/example",
            version: "0.1.0",
            ociDigest: null,
            integrity: "sha256-example",
            signature: "sigstore-example",
            resolvedFrom: "oci",
          },
        ],
      }),
    );

    const rules = await createFixtureRules(root, "bao-archive-policy", {
      forbidPendingPublishLocks: true,
    });

    await expect(rules["bao-archive-policy"]()).rejects.toThrow(
      "ociDigest, integrity, and signature are required",
    );
  });

  test("no unknown casts rejects implementation unknown ingress", async () => {
    const root = fixtureRoot("unknown-ingress");
    await writeFixture(root, "src/bad.ts", "export const parse = (value: unknown) => value;\n");

    const rules = await createFixtureRules(root, "no-unknown-casts");

    await expect(rules["no-unknown-casts"]()).rejects.toThrow("unknown");
  });

  test("htmx form contracts reject non-live error targets on read-only swaps", async () => {
    const root = fixtureRoot("htmx-readonly-error-target");
    await writeFixture(
      root,
      "src/server/html/routes/bad.ts",
      'export const html = `<button hx-get="/fragment" hx-target-error="#content-panel">Load</button><section id="content-panel"></section>`;\n',
    );

    const rules = await createFixtureRules(root, "htmx-form-contracts");

    await expect(rules["htmx-form-contracts"]()).rejects.toThrow("missing live alert region");
  });
});
