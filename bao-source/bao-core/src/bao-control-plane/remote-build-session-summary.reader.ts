/**
 * Shared read logic for persisted remote build session summary.
 *
 * Single source of truth for parsing the remote build session summary file.
 * Used by scripts (remote-build-session-summary.service) and server
 * (bao-control-plane-bootstrap-summary-reader.service) to project persisted summary
 * into runtime diagnostics.
 *
 * @shared/bao-control-plane/remote-build-session-summary.reader
 */

import { BAO_RUNTIME_REMOTE_BUILD_SESSION_SUMMARY_PATH } from "@baohaus/bao-constants/build-paths";
import { toResult } from "@baohaus/bao-utils/async-result";
import { path } from "@baohaus/bao-utils/bun-path";

/** Lifecycle status for a persisted remote build session. */
export type RemoteBuildSessionLifecycleStatus = "active" | "retained" | "released" | "failed";

/** Persisted session entry schema. */
export type PersistedRemoteBuildSessionEntry = {
  sessionId: string;
  imageName: string | null;
  stageName: string | null;
  remoteRoot: string;
  uploadCount: number;
  syncAttemptCount: number;
  hasSyncedRemoteRootBackToLocal: boolean;
  lifecycleStatus: RemoteBuildSessionLifecycleStatus;
  failurePhase: string | null;
  /** Local OCI stage root path (key for process-local lookup). */
  localRoot?: string;
};

/** Summary file schema. */
export type RemoteBuildSessionSummary = {
  sessions: PersistedRemoteBuildSessionEntry[];
  updatedAt: string;
};

/**
 * Resolve the remote build session summary file path.
 *
 * @param repositoryRoot - Repository root directory.
 * @returns Absolute path to the summary file.
 */
export function resolveRemoteBuildSessionSummaryPath(repositoryRoot: string): string {
  return path.join(repositoryRoot, BAO_RUNTIME_REMOTE_BUILD_SESSION_SUMMARY_PATH);
}

/**
 * Read and parse the remote build session summary from disk.
 *
 * Returns empty default on missing file or parse error. Callers must handle
 * the empty case gracefully.
 *
 * @param fullPath - Absolute path to the summary file.
 * @returns Parsed summary or empty default.
 */
export async function readRemoteBuildSessionSummaryFile(
  fullPath: string,
): Promise<RemoteBuildSessionSummary> {
  const readResult = await toResult(async () => {
    const file = Bun.file(fullPath);
    if (!(await file.exists())) {
      return { sessions: [], updatedAt: new Date().toISOString() };
    }
    const text = await file.text();
    const raw: unknown = JSON.parse(text);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return { sessions: [], updatedAt: new Date().toISOString() };
    }
    const sessions = "sessions" in raw && Array.isArray(raw.sessions) ? raw.sessions : [];
    const updatedAt =
      "updatedAt" in raw && typeof raw.updatedAt === "string"
        ? raw.updatedAt
        : new Date().toISOString();
    return { sessions, updatedAt };
  });

  if (!readResult.ok) {
    return { sessions: [], updatedAt: new Date().toISOString() };
  }

  return readResult.value;
}
