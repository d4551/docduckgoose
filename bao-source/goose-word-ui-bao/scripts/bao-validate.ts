import { existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  GOOSE_WORD_CLIENT_ASSETS,
  GOOSE_WORD_UI_APP_CSS_PATH,
  GOOSE_WORD_UI_CLIENT_DIR,
  GOOSE_WORD_UI_DAISY_CSS_PATH,
  GOOSE_WORD_UI_MANIFEST_PATH,
} from "../src/manifest.ts";

const root = resolve(import.meta.dir, "..");
const failures: string[] = [];

const requireFile = (relativePath: string): void => {
  const path = join(root, relativePath);
  if (!existsSync(path) || !statSync(path).isFile()) {
    failures.push(`Missing UI asset: ${relativePath}`);
  }
};

requireFile(GOOSE_WORD_UI_DAISY_CSS_PATH);
requireFile(GOOSE_WORD_UI_APP_CSS_PATH);
requireFile(GOOSE_WORD_UI_MANIFEST_PATH);

for (const file of Object.values(GOOSE_WORD_CLIENT_ASSETS)) {
  requireFile(join(GOOSE_WORD_UI_CLIENT_DIR, file));
}

if (failures.length > 0) {
  console.error(`goose-word-ui-bao validate failed (${failures.length})`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("goose-word-ui-bao validate ok");
