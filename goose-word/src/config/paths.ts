import { homedir } from "node:os";
import { join } from "node:path";

export const GOOSE_WORD_APP_ID = "goose-word" as const;

const readEnvPort = (): number => {
  const raw = Bun.env.GOOSE_WORD_PORT ?? "8080";
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    return 8080;
  }
  return parsed;
};

export const GOOSE_WORD_PORT = readEnvPort();

const resolveDataDir = (): string => {
  const fromEnv = Bun.env.GOOSE_WORD_DATA_DIR;
  if (typeof fromEnv === "string" && fromEnv.length > 0) {
    return fromEnv;
  }
  return join(homedir(), ".goose-word");
};

export const gooseWordDataDir = resolveDataDir();
export const gooseWordBaoPluginsDir = join(gooseWordDataDir, "bao");
export const gooseWordDbPath = join(gooseWordDataDir, "docs.db");
export const gooseWordTemplatesDbPath = join(gooseWordDataDir, "templates.db");
export const gooseWordDbUrl = `file:${gooseWordDbPath}`;
export const gooseWordDocumentsDir = join(homedir(), "Documents", "goose-word");

export const GOOSE_WORD_DATA_DIR = gooseWordDataDir;
export const GOOSE_WORD_BAO_DIR = gooseWordBaoPluginsDir;
export const GOOSE_WORD_DB_PATH = gooseWordDbPath;
export const GOOSE_WORD_TEMPLATES_DB_PATH = gooseWordTemplatesDbPath;
export const GOOSE_WORD_DOCS_DIR = gooseWordDocumentsDir;

/** Canonical `.bao` native-shell package (registry SSOT, not a legacy duplicate). */
export const gooseWordNativeShellBaoDir = join(
  import.meta.dir,
  "../../../bao-source/goose-word-native-shell-bao",
);

const readProofBase = (): string => {
  const fromEnv = Bun.env.GOOSE_WORD_PROOF_BASE;
  if (typeof fromEnv === "string" && fromEnv.length > 0) {
    return fromEnv;
  }
  return `http://127.0.0.1:${String(GOOSE_WORD_PORT)}`;
};

export const GOOSE_WORD_PROOF_BASE = readProofBase();
