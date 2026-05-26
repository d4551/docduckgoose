/**
 * Cluster contract tests.
 *
 * @module @baohaus/bao-sandbox-spec/cluster.test
 */

import { describe, expect, test } from "bun:test";
import {
  CLUSTER_NODE_DRAIN_STATE,
  CLUSTER_NODE_HEALTH,
  CLUSTER_NODE_ROLE,
  type ClusterNodeState,
  mergeClusterCapacity,
} from "./cluster.ts";
import { SPAWNER_FAMILY } from "./scheduler.ts";

function node(input: {
  readonly nodeId: string;
  readonly cpuMilli: number;
  readonly memMiB: number;
  readonly b1Cpu: number;
  readonly queueDepth?: number;
  readonly health?: ClusterNodeState["health"];
  readonly drainState?: ClusterNodeState["drainState"];
}): ClusterNodeState {
  return {
    capacity: {
      emittedAt: "2026-05-12T00:00:00.000Z",
      families: [
        {
          activeReplicas: 1,
          cpuMilliInUse: input.b1Cpu,
          family: SPAWNER_FAMILY.b1,
          memMiBInUse: 128,
          queueDepth: input.queueDepth ?? 0,
        },
      ],
      revision: 1,
      system: {
        bandwidthKbps: 1000,
        cpuMilli: input.cpuMilli,
        diskMiB: 10_000,
        gpuMilli: 0,
        memMiB: input.memMiB,
      },
    },
    drainState: input.drainState ?? CLUSTER_NODE_DRAIN_STATE.accepting,
    endpoint: "unix:///tmp/baosandboxd.sock",
    health: input.health ?? CLUSTER_NODE_HEALTH.healthy,
    lastHeartbeatAt: "2026-05-12T00:00:00.000Z",
    nodeId: input.nodeId,
    role: CLUSTER_NODE_ROLE.localVm,
  };
}

describe("cluster capacity", () => {
  test("merges healthy accepting node capacity", () => {
    const merged = mergeClusterCapacity(
      [
        node({ b1Cpu: 100, cpuMilli: 1000, memMiB: 2048, nodeId: "a" }),
        node({ b1Cpu: 200, cpuMilli: 2000, memMiB: 4096, nodeId: "b", queueDepth: 3 }),
      ],
      "2026-05-12T00:00:01.000Z",
    );
    expect(merged.system.cpuMilli).toBe(3000);
    expect(merged.system.memMiB).toBe(6144);
    const b1 = merged.families.find((family) => family.family === SPAWNER_FAMILY.b1);
    expect(b1?.cpuMilliInUse).toBe(300);
    expect(b1?.queueDepth).toBe(3);
  });

  test("excludes unhealthy and draining nodes from merged schedulable capacity", () => {
    const merged = mergeClusterCapacity(
      [
        node({ b1Cpu: 100, cpuMilli: 1000, memMiB: 2048, nodeId: "healthy" }),
        node({
          b1Cpu: 900,
          cpuMilli: 9000,
          drainState: CLUSTER_NODE_DRAIN_STATE.draining,
          memMiB: 16_384,
          nodeId: "draining",
        }),
        node({
          b1Cpu: 900,
          cpuMilli: 9000,
          health: CLUSTER_NODE_HEALTH.unhealthy,
          memMiB: 16_384,
          nodeId: "unhealthy",
        }),
      ],
      "2026-05-12T00:00:01.000Z",
    );
    expect(merged.system.cpuMilli).toBe(1000);
    const b1 = merged.families.find((family) => family.family === SPAWNER_FAMILY.b1);
    expect(b1?.cpuMilliInUse).toBe(100);
  });
});
