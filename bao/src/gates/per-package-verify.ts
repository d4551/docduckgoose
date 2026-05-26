import { join } from "node:path";
import { type CatalogPackageEntry, loadCatalog } from "../catalog.ts";
import { REPO_ROOT } from "../constants.ts";
import { logError, logInfo } from "../logger.ts";
import { loadCurrentPackageJson } from "../package-json.ts";

const GATE_NAME = "per-package-verify";
const SAMPLE_LIMIT = 10;
const PER_PACKAGE_PARALLELISM = 8;
const SUCCESS_EXIT_CODE = 0;

const REQUIRED_CANONICAL_SCRIPTS = [
  "build",
  "typecheck",
  "test",
  "bao:build",
  "bao:validate",
] as const;
const OPTIONAL_CANONICAL_SCRIPTS = ["lint"] as const;
const CANONICAL_SCRIPTS = [...REQUIRED_CANONICAL_SCRIPTS, ...OPTIONAL_CANONICAL_SCRIPTS] as const;
type CanonicalScript = (typeof CANONICAL_SCRIPTS)[number];

interface PackageFailure {
  id: string;
  script: CanonicalScript;
  exit: number;
}

function runScript(entry: CatalogPackageEntry, script: CanonicalScript): PackageFailure | null {
  const proc = Bun.spawnSync(["bun", "run", script], {
    cwd: join(REPO_ROOT, entry.targetSourceProjectPath),
    stdout: "pipe",
    stderr: "pipe",
  });
  if (proc.exitCode === SUCCESS_EXIT_CODE) {
    return null;
  }
  return { id: entry.id, script, exit: proc.exitCode ?? 1 };
}

async function resolveScriptsToRun(entry: CatalogPackageEntry): Promise<CanonicalScript[]> {
  const scripts: CanonicalScript[] = [...REQUIRED_CANONICAL_SCRIPTS];
  const packageJson = await loadCurrentPackageJson(entry);
  if (typeof packageJson?.scripts?.lint === "string" && packageJson.scripts.lint.length > 0) {
    scripts.push("lint");
  }
  return scripts;
}

async function runOneEntry(entry: CatalogPackageEntry): Promise<PackageFailure[]> {
  const failures: PackageFailure[] = [];
  const scripts = await resolveScriptsToRun(entry);
  for (const script of scripts) {
    const failure = runScript(entry, script);
    if (failure !== null) {
      failures.push(failure);
    }
  }
  return failures;
}

interface WorkerState {
  entries: CatalogPackageEntry[];
  failures: PackageFailure[];
  cursor: { value: number };
}

function takeNext(state: WorkerState): CatalogPackageEntry | null {
  const index = state.cursor.value;
  if (index >= state.entries.length) {
    return null;
  }
  state.cursor.value = index + 1;
  return state.entries[index] ?? null;
}

async function runWorker(state: WorkerState): Promise<void> {
  while (true) {
    const entry = takeNext(state);
    if (!entry) {
      return;
    }
    const entryFailures = await runOneEntry(entry);
    state.failures.push(...entryFailures);
  }
}

export async function runPerPackageVerifyGate(): Promise<number> {
  const catalog = await loadCatalog();
  const state: WorkerState = {
    entries: [...catalog.packages],
    failures: [],
    cursor: { value: 0 },
  };
  const inFlight: Promise<void>[] = [];
  for (let lane = 0; lane < PER_PACKAGE_PARALLELISM; lane += 1) {
    inFlight.push(runWorker(state));
  }
  await Promise.all(inFlight);
  const failures = state.failures;
  const entries = state.entries;

  if (failures.length > 0) {
    logError(GATE_NAME, "One or more packages failed their canonical verify scripts", {
      count: failures.length,
      samples: failures.slice(0, SAMPLE_LIMIT),
    });
    return 1;
  }

  logInfo(GATE_NAME, "All catalog entries pass their canonical verify scripts", {
    packages: entries.length,
  });
  return 0;
}
