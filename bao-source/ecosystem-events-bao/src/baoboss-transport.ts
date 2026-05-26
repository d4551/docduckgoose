/**
 * BaoBoss-backed `EcosystemEventTransport` — production cross-process
 * transport for the ecosystem event bridge.
 *
 * Maps the bridge port (`publish` / `onEvent` / `close`) onto BaoBoss
 * pub/sub: outbound events go through `boss.publish(topic, payload)`,
 * inbound events arrive through a `boss.work(queue, handler)` worker
 * that decodes the wire payload and dispatches to subscribed callbacks.
 *
 * Topic is pinned to {@link QUEUE_TOPIC.ecosystemContributionChanged}
 * so every Bao app's bridge sees the same canonical wire-format
 * identifier — redeclaring the topic string is the "no duplicated wire
 * shapes" violation the queue-bao topic registry exists to prevent.
 *
 * Worker lifecycle: created on the FIRST `onEvent` call (lazy — apps
 * that only publish never spin a worker), torn down on `close`.
 *
 * @packageDocumentation
 */

import type { BaoBoss } from "@baohaus/bao-boss/BaoBoss";
import { QUEUE_TOPIC } from "@baohaus/bao-boss/topics";
import type { Job } from "@baohaus/bao-boss/types";
import {
  decodeEcosystemEvent,
  type EcosystemEventTransport,
  encodeEcosystemEvent,
} from "./bridge.ts";
import type { EcosystemContributionEvent } from "./types.ts";

/** Configuration for {@link createBaoBossEcosystemTransport}. */
export interface BaoBossEcosystemTransportOptions {
  /**
   * BaoBoss instance the adapter publishes / subscribes through. Each
   * app constructs its own BaoBoss against its broker connection and
   * passes it here.
   */
  readonly boss: BaoBoss;
  /**
   * Process-stable queue name. Each app process declares a UNIQUE
   * queue (e.g. `ecosystem.contribution-changed.bao-runtime.<pid>`) so
   * the broker fan-out semantics deliver every event to every
   * subscribing process. Sharing a queue across processes turns the
   * topic into a competing-consumer pattern (only one process per
   * event), which is NOT what the bridge wants.
   *
   * Recommended shape: `${QUEUE_TOPIC.ecosystemContributionChanged}.${appName}.${instanceId}`.
   */
  readonly queueName: string;
  /**
   * Worker batch size. Defaults to 16 — small enough to keep the
   * dispatcher responsive, large enough to amortize broker round-trips
   * during a contribution-change burst (a `.bao` install fans 5-10
   * events).
   */
  readonly batchSize?: number;
  /**
   * Worker poll interval (seconds). Defaults to 2 — matches the
   * canonical `BaoBoss` Worker default. Lower for low-latency UIs;
   * higher for batch ETL surfaces.
   */
  readonly pollingIntervalSeconds?: number;
  /**
   * Replay window on cold start. When > 0, the transport calls
   * `boss.fetch(queueName, { batchSize: replayBatchSize })` BEFORE
   * starting the steady-state worker, dispatching any persisted jobs
   * the broker still holds for this queue. Lets a freshly-booted
   * process catch up on `.bao` install / uninstall events that
   * landed in the broker while the process was down. Set to `0`
   * (default) for instance-unique queues that don't carry replay
   * semantics; set to e.g. 64 for shared-queue deployments where
   * the worker name is stable across restarts. The bridge's
   * idempotency LRU still suppresses duplicates, so over-fetching
   * is safe.
   */
  readonly replayBatchSize?: number;
}

/**
 * Build a BaoBoss-backed transport. The adapter holds every subscribed
 * callback in a `Set` and fans inbound jobs to all of them — matches
 * the in-process bus's broadcast semantics.
 *
 * The transport is BAOBOSS-aware but BRIDGE-agnostic — it implements
 * the {@link EcosystemEventTransport} contract and nothing else. The
 * bridge owns the loopback / idempotency / origin checks; the
 * transport just moves bytes.
 */
export async function createBaoBossEcosystemTransport(
  options: BaoBossEcosystemTransportOptions,
): Promise<EcosystemEventTransport> {
  const { boss, queueName } = options;
  const batchSize = options.batchSize ?? 16;
  const pollingIntervalSeconds = options.pollingIntervalSeconds ?? 2;
  const replayBatchSize = options.replayBatchSize ?? 0;
  const subscribers = new Set<(event: EcosystemContributionEvent) => void>();
  let workerId: string | null = null;
  let replayCompleted = false;

  await boss.subscribe(QUEUE_TOPIC.ecosystemContributionChanged, queueName);

  function dispatchJobs(jobs: readonly Job[]): void {
    for (const job of jobs) {
      const wire = readJobWireString(job);
      if (wire === null) {
        continue;
      }
      const decoded = decodeEcosystemEvent(wire);
      if (decoded === null) {
        continue;
      }
      for (const subscriber of Array.from(subscribers)) {
        subscriber(decoded);
      }
    }
  }

  async function replayBacklog(): Promise<void> {
    if (replayCompleted || replayBatchSize === 0) {
      replayCompleted = true;
      return;
    }
    const backlog = await boss.fetch(queueName, { batchSize: replayBatchSize });
    dispatchJobs(backlog);
    replayCompleted = true;
  }

  async function ensureWorker(): Promise<void> {
    if (workerId !== null) {
      return;
    }
    await replayBacklog();
    workerId = await boss.work(queueName, { batchSize, pollingIntervalSeconds }, async (jobs) => {
      dispatchJobs(jobs);
    });
  }

  return {
    async publish(event) {
      const payload = { wire: encodeEcosystemEvent(event) };
      await boss.publish(QUEUE_TOPIC.ecosystemContributionChanged, payload);
    },
    onEvent(callback) {
      subscribers.add(callback);
      void ensureWorker();
      return () => {
        subscribers.delete(callback);
      };
    },
    async close() {
      subscribers.clear();
      if (workerId !== null) {
        await boss.offWork(workerId);
        workerId = null;
      }
      await boss.unsubscribe(QUEUE_TOPIC.ecosystemContributionChanged, queueName);
    },
  };
}

/**
 * Extract the wire string from a `Job.data` payload. The adapter
 * publishes `{ wire: <encoded JSON> }` so the broker's `PersistedJson`
 * (`Prisma.JsonValue | null`) carries our canonical encoding without
 * further decoding at the broker level. The narrowing walks the
 * structural source type without any top-type escape — `Reflect.get`
 * returns the raw JSON cell, the `typeof` check pins it to `string`.
 */
function readJobWireString(job: Job): string | null {
  const data = job.data;
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return null;
  }
  const wire = Reflect.get(data, "wire");
  return typeof wire === "string" ? wire : null;
}
