/**
 * Remote build session projection builder.
 *
 * Pure projection logic for BaoControlPlaneRemoteBuildSessionProjection. Consumed by
 * bao-runtime and infrastructure SSR. Scripts subsystem delegates here.
 *
 * @shared/bao-control-plane/remote-build-session-projection
 */

import type { BaoControlPlaneRemoteBuildSessionProjection } from "@baohaus/bao-schemas/bao-runtime.schemas";
import type { RemoteBuildSessionSummary } from "./remote-build-session-summary.reader";

/**
 * Build runtime projection from persisted summary.
 *
 * @param summary - Persisted remote build session summary.
 * @returns Aggregate projection for bao-runtime and infrastructure SSR.
 */
export function buildRemoteBuildSessionProjection(
  summary: RemoteBuildSessionSummary,
): BaoControlPlaneRemoteBuildSessionProjection {
  const retained = summary.sessions.filter(
    (s) => s.lifecycleStatus === "active" || s.lifecycleStatus === "retained",
  ).length;
  const released = summary.sessions.filter((s) => s.lifecycleStatus === "released").length;
  const failed = summary.sessions.filter((s) => s.lifecycleStatus === "failed").length;
  const anySynced = summary.sessions.some((s) => s.hasSyncedRemoteRootBackToLocal);
  const lastSyncBack = anySynced ? summary.updatedAt : null;

  return {
    retainedCount: retained,
    releasedCount: released,
    failedCount: failed,
    lastSyncBack,
    totalSessions: summary.sessions.length,
  };
}
