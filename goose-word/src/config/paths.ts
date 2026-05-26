import { homedir } from "node:os";
import { join } from "node:path";

export const GOOSE_WORD_APP_ID = "goose-word" as const;
export const GOOSE_WORD_PORT = Number(Bun.env.GOOSE_WORD_PORT ?? "8080");

export const gooseWordDataDir = join(homedir(), ".goose-word");
export const gooseWordBaoPluginsDir = join(gooseWordDataDir, "bao");
export const gooseWordDbPath = join(gooseWordDataDir, "docs.db");
export const gooseWordDbUrl = `file:${gooseWordDbPath}`;
export const gooseWordDocumentsDir = join(homedir(), "Documents", "goose-word");

export const GOOSE_WORD_DATA_DIR = gooseWordDataDir;
export const GOOSE_WORD_BAO_DIR = gooseWordBaoPluginsDir;
export const GOOSE_WORD_DB_PATH = gooseWordDbPath;
export const GOOSE_WORD_DOCS_DIR = gooseWordDocumentsDir;
