/**
 * @baohaus/ecosystem-events-bao/install-boot-with-baoboss
 *
 * Canonical end-to-end boot helper that constructs a {@link BaoBoss}
 * instance, migrates + starts it, installs the cross-process ecosystem
 * bridge, and returns a single handle that shuts down both layers in
 * the correct order on SIGTERM / graceful shutdown.
 *
 * This is the single seam every Bao app (registry, bao-runtime, forge,
 * bao-ai-gateway) wires through. Per-app callers supply the connection
 * string (resolved through the app's own config seam), the app-name
 * literal used to derive the per-process queue name, and a minimal
 * structured-info logger port. The two prior near-identical per-app
 * lifecycle modules collapse into app-config seams that own only env
 * + logger lift and singleton state — all broker construction,
 * migrate/start, replay, and shutdown live here exactly once.
 */

import { BaoBoss } from "@baohaus/bao-boss/BaoBoss";
import { QUEUE_TOPIC } from "@baohaus/bao-boss/topics";
import type { EcosystemEventBridgeHandle } from "./bridge.ts";
import { installEcosystemBridgeAtBoot } from "./install-boot.ts";
import { setLocalPeerId } from "./service.ts";

/** Default replay batch size for the BaoBoss-backed transport. */
export const DEFAULT_ECOSYSTEM_BRIDGE_REPLAY_BATCH_SIZE = 64;

/** Default BaoBoss schema for the ecosystem-event publisher. */
export const DEFAULT_ECOSYSTEM_BRIDGE_SCHEMA = "baoboss";

/**
 * Minimal structured-info logger port. Both the gateway and bao-runtime
 * logger interfaces expose a compatible `info(message, fields?)` signature;
 * accepting only this port lets the helper avoid coupling to either
 * concrete Logger interface.
 */
export type EcosystemBridgeInfoFn = (
  message: string,
  fields?: Readonly<Record<string, string | number | boolean | null | undefined>>,
) => void;

/** Optional BaoBoss connection-pool tuning forwarded verbatim. */
export interface EcosystemBridgeConnectionPool {
  readonly min?: number;
  readonly max?: number;
  readonly idleTimeoutMillis?: number;
  readonly connectionTimeoutMillis?: number;
  readonly statementTimeout?: number;
}

/** Per-app boot options resolved by each consumer's own config seam. */
export interface InstallBootWithBaoBossOptions {
  /** App-name literal used in the per-process queue name (e.g. "bao-runtime"). */
  readonly appName: string;
  /** PostgreSQL connection string (resolved by the per-app config seam). */
  readonly connectionString: string;
  /** Info-level logger callback. */
  readonly info: EcosystemBridgeInfoFn;
  /** BaoBoss schema. Defaults to {@link DEFAULT_ECOSYSTEM_BRIDGE_SCHEMA}. */
  readonly schema?: string;
  /** BaoBoss completed-job archive window. */
  readonly archiveCompletedAfterSeconds?: number;
  /** BaoBoss archived-job deletion window (days). */
  readonly deleteArchivedAfterDays?: number;
  /** Optional dedicated connection-pool config. */
  readonly connectionPool?: EcosystemBridgeConnectionPool;
  /** Replay batch size. Defaults to {@link DEFAULT_ECOSYSTEM_BRIDGE_REPLAY_BATCH_SIZE}. */
  readonly replayBatchSize?: number;
}

/**
 * Composite lifecycle handle returned by {@link installBootWithBaoBoss}.
 * Calling `close()` drains the bridge then stops BaoBoss in order.
 */
export interface EcosystemBridgeWithBaoBossHandle {
  readonly close: () => Promise<void>;
  readonly bridge: EcosystemEventBridgeHandle;
  readonly boss: BaoBoss;
  readonly queueName: string;
}

/**
 * Build the canonical per-process queue name used by every Bao app's
 * ecosystem-event consumer.
 */
export function buildEcosystemBridgeQueueName(appName: string): string {
  const pid = String(process.pid);
  return `${QUEUE_TOPIC.ecosystemContributionChanged}.${appName}.${pid}`;
}

/**
 * Construct + start a BaoBoss instance and install the cross-process
 * ecosystem bridge. Returns a composite handle for graceful shutdown.
 */
export async function installBootWithBaoBoss(
  options: InstallBootWithBaoBossOptions,
): Promise<EcosystemBridgeWithBaoBossHandle> {
  setLocalPeerId(options.appName);
  const queueName = buildEcosystemBridgeQueueName(options.appName);
  const boss = new BaoBoss({
    connectionString: options.connectionString,
    schema: options.schema ?? DEFAULT_ECOSYSTEM_BRIDGE_SCHEMA,
    ...(options.archiveCompletedAfterSeconds === undefined
      ? {}
      : { archiveCompletedAfterSeconds: options.archiveCompletedAfterSeconds }),
    ...(options.deleteArchivedAfterDays === undefined
      ? {}
      : { deleteArchivedAfterDays: options.deleteArchivedAfterDays }),
    ...(options.connectionPool === undefined ? {} : { connectionPool: options.connectionPool }),
  });
  await boss.migrate();
  await boss.start();
  const bridge = await installEcosystemBridgeAtBoot({
    boss,
    queueName,
    replayBatchSize: options.replayBatchSize ?? DEFAULT_ECOSYSTEM_BRIDGE_REPLAY_BATCH_SIZE,
  });
  options.info("ecosystem-events bridge installed", { queueName });
  let closed = false;
  const close = async (): Promise<void> => {
    if (closed) {
      return;
    }
    closed = true;
    await bridge.close();
    await boss.stop();
    options.info("ecosystem-events bridge stopped");
  };
  return { close, bridge, boss, queueName };
}
