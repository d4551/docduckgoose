/**
 * @baohaus/ecosystem-events-bao/install-boot
 *
 * Canonical boot helper that wires `installCrossProcessBridge` against a
 * BaoBoss-backed transport in a single call. Eliminates the per-app
 * boilerplate of constructing the transport, threading replay/batch/poll
 * options, and remembering to capture the returned bridge handle for
 * graceful shutdown.
 *
 * Every Bao app (registry, bao-runtime, forge, bao-ai-gateway) wires the
 * bridge through THIS helper — direct calls to `installCrossProcessBridge`
 * or `createBaoBossEcosystemTransport` outside this module are reserved
 * for tests + the in-memory transport pair.
 */

import type { BaoBoss } from "@baohaus/bao-boss/BaoBoss";
import { createBaoBossEcosystemTransport } from "./baoboss-transport.ts";
import { type EcosystemEventBridgeHandle, installCrossProcessBridge } from "./bridge.ts";

/** Per-app boot options forwarded into the BaoBoss transport. */
export interface EcosystemBridgeBootOptions {
  readonly boss: BaoBoss;
  readonly queueName: string;
  readonly batchSize?: number;
  readonly pollingIntervalSeconds?: number;
  readonly replayBatchSize?: number;
}

/**
 * Construct the BaoBoss-backed ecosystem-event transport and install it
 * as the per-process cross-process bridge. Returns the bridge handle so
 * the caller can `await handle.close()` on SIGTERM / graceful shutdown.
 */
export async function installEcosystemBridgeAtBoot(
  options: EcosystemBridgeBootOptions,
): Promise<EcosystemEventBridgeHandle> {
  const transport = await createBaoBossEcosystemTransport(options);
  return installCrossProcessBridge(transport);
}
