/**
 * Cluster contract for Bao-managed sandbox capacity.
 *
 * A local Lima VM, a Linux host sandbox daemon, and future remote Bao workers
 * all report the same node shape. Schedulers consume the merged capacity view
 * without learning which substrate produced it.
 *
 * @module @baohaus/bao-sandbox-spec/cluster
 */

import {
  type CapacitySnapshot,
  SPAWNER_FAMILY,
  type SpawnerFamily,
  type SpawnerUtilisation,
  type SystemCapacity,
} from "./scheduler.ts";

export type ClusterNodeId = string;

export const CLUSTER_NODE_ROLE = {
  localVm: "local-vm",
  localHost: "local-host",
  worker: "worker",
} as const;
export type ClusterNodeRole = (typeof CLUSTER_NODE_ROLE)[keyof typeof CLUSTER_NODE_ROLE];

export const CLUSTER_NODE_HEALTH = {
  starting: "starting",
  healthy: "healthy",
  degraded: "degraded",
  unhealthy: "unhealthy",
} as const;
export type ClusterNodeHealth = (typeof CLUSTER_NODE_HEALTH)[keyof typeof CLUSTER_NODE_HEALTH];

export const CLUSTER_NODE_DRAIN_STATE = {
  accepting: "accepting",
  draining: "draining",
  drained: "drained",
} as const;
export type ClusterNodeDrainState =
  (typeof CLUSTER_NODE_DRAIN_STATE)[keyof typeof CLUSTER_NODE_DRAIN_STATE];

export interface ClusterNodeState {
  readonly nodeId: ClusterNodeId;
  readonly role: ClusterNodeRole;
  readonly health: ClusterNodeHealth;
  readonly drainState: ClusterNodeDrainState;
  readonly capacity: CapacitySnapshot;
  readonly endpoint: string | null;
  readonly lastHeartbeatAt: string;
}

export interface ClusterCapacitySnapshot {
  readonly revision: number;
  readonly emittedAt: string;
  readonly nodes: readonly ClusterNodeState[];
  readonly system: SystemCapacity;
  readonly families: readonly SpawnerUtilisation[];
}

export interface ClusterControlPlanePort {
  readonly getNodes: () => readonly ClusterNodeState[];
  readonly getCapacity: () => ClusterCapacitySnapshot;
  readonly publishNode: (node: ClusterNodeState) => void;
  readonly removeNode: (nodeId: ClusterNodeId) => void;
}

function emptySystemCapacity(): SystemCapacity {
  return {
    bandwidthKbps: 0,
    cpuMilli: 0,
    diskMiB: 0,
    gpuMilli: 0,
    memMiB: 0,
  };
}

function addSystemCapacity(left: SystemCapacity, right: SystemCapacity): SystemCapacity {
  return {
    bandwidthKbps: left.bandwidthKbps + right.bandwidthKbps,
    cpuMilli: left.cpuMilli + right.cpuMilli,
    diskMiB: left.diskMiB + right.diskMiB,
    gpuMilli: left.gpuMilli + right.gpuMilli,
    memMiB: left.memMiB + right.memMiB,
  };
}

function emptyFamilyUtilisation(family: SpawnerFamily): SpawnerUtilisation {
  return {
    activeReplicas: 0,
    cpuMilliInUse: 0,
    family,
    memMiBInUse: 0,
    queueDepth: 0,
  };
}

function addFamilyUtilisation(
  left: SpawnerUtilisation,
  right: SpawnerUtilisation,
): SpawnerUtilisation {
  return {
    activeReplicas: left.activeReplicas + right.activeReplicas,
    cpuMilliInUse: left.cpuMilliInUse + right.cpuMilliInUse,
    family: left.family,
    memMiBInUse: left.memMiBInUse + right.memMiBInUse,
    queueDepth: left.queueDepth + right.queueDepth,
  };
}

function mergeFamilies(nodes: readonly ClusterNodeState[]): readonly SpawnerUtilisation[] {
  const families = new Map<SpawnerFamily, SpawnerUtilisation>();
  for (const family of Object.values(SPAWNER_FAMILY)) {
    families.set(family, emptyFamilyUtilisation(family));
  }
  for (const node of nodes) {
    if (
      node.health !== CLUSTER_NODE_HEALTH.healthy ||
      node.drainState !== CLUSTER_NODE_DRAIN_STATE.accepting
    ) {
      continue;
    }
    for (const utilisation of node.capacity.families) {
      const current =
        families.get(utilisation.family) ?? emptyFamilyUtilisation(utilisation.family);
      families.set(utilisation.family, addFamilyUtilisation(current, utilisation));
    }
  }
  return [...families.values()];
}

export function mergeClusterCapacity(
  nodes: readonly ClusterNodeState[],
  emittedAt: string,
): ClusterCapacitySnapshot {
  let system = emptySystemCapacity();
  let revision = 0;
  for (const node of nodes) {
    if (
      node.health !== CLUSTER_NODE_HEALTH.healthy ||
      node.drainState !== CLUSTER_NODE_DRAIN_STATE.accepting
    ) {
      continue;
    }
    system = addSystemCapacity(system, node.capacity.system);
    revision = Math.max(revision, node.capacity.revision);
  }
  return {
    emittedAt,
    families: mergeFamilies(nodes),
    nodes,
    revision,
    system,
  };
}
