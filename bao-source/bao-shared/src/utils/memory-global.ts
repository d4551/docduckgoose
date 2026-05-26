/**
 * Global Memory Profile Utilities.
 *
 * Provides memory profiling utilities for tracking component-level memory usage.
 * This module includes:
 *
 * - Memory snapshot capture and storage
 * - Component profile aggregation and retrieval
 * - Active component tracking
 * - Memory statistics formatting
 * - Leak detection support via profile analysis
 *
 * @shared/utils/memory-global
 */

import { formatFileSize } from "./formatting/filesizes";

/**
 * Interface MemorySnapshot.
 */
export interface MemorySnapshot {
  timestamp: number;
  heapUsed: number;
  heapTotal: number;
  rss: number;
  external: number;
  componentName: string;
  lifecycle: string;
  trackedRefs: number;
  trackedComputed: number;
}

// Global registry for memory profiles
/** componentProfiles constant. */
export const componentProfiles: Map<string, MemorySnapshot[]> = new Map<string, MemorySnapshot[]>();
/** activeComponents constant. */
export const activeComponents: Set<string> = new Set<string>();

/**
 * Global memory profile utilities.
 */
export const MemoryProfileGlobal: {
  getAllProfiles(): Array<{
    name: string;
    snapshots: MemorySnapshot[];
    latest?: MemorySnapshot;
    count: number;
  }>;
  getActiveComponents(): string[];
  clearProfiles(): void;
  exportProfiles(): {
    timestamp: number;
    profiles: Array<{ componentName: string; snapshots: MemorySnapshot[] }>;
    activeComponents: string[];
  };
  getSummary(): {
    totalComponents: number;
    activeComponents: number;
    totalSnapshots: number;
    maxHeapUsed: string;
    maxHeapComponent: string;
  };
} = {
  /**
   * Get all component profiles.
   *
   * @returns Array of component profile summaries.
   */
  getAllProfiles(): Array<{
    name: string;
    snapshots: MemorySnapshot[];
    latest?: MemorySnapshot;
    count: number;
  }> {
    return Array.from(componentProfiles.entries()).map(([name, snapshots]) => ({
      name,
      snapshots,
      latest: snapshots[snapshots.length - 1],
      count: snapshots.length,
    }));
  },

  /**
   * Get active component names.
   *
   * @returns Array of active component names.
   */
  getActiveComponents(): string[] {
    return Array.from(activeComponents);
  },

  /**
   * Clear all tracked profiles.
   *
   * @returns Void.
   */
  clearProfiles(): void {
    componentProfiles.clear();
  },

  /**
   * Export profiles for analysis.
   *
   * @returns Snapshot export payload.
   */
  exportProfiles(): {
    timestamp: number;
    profiles: Array<{ componentName: string; snapshots: MemorySnapshot[] }>;
    activeComponents: string[];
  } {
    return {
      timestamp: Date.now(),
      profiles: Array.from(componentProfiles.entries()).map(([name, snapshots]) => ({
        componentName: name,
        snapshots,
      })),
      activeComponents: Array.from(activeComponents),
    };
  },

  /**
   * Get memory summary.
   *
   * @returns Summary metrics for tracked profiles.
   */
  getSummary(): {
    totalComponents: number;
    activeComponents: number;
    totalSnapshots: number;
    maxHeapUsed: string;
    maxHeapComponent: string;
  } {
    const profiles = Array.from(componentProfiles.entries());
    const totalSnapshots = profiles.reduce((sum, [, snaps]) => sum + snaps.length, 0);

    let maxHeap = 0;
    let maxComponent = "";

    for (const [name, snapshots] of profiles) {
      for (const snap of snapshots) {
        if (snap.heapUsed > maxHeap) {
          maxHeap = snap.heapUsed;
          maxComponent = name;
        }
      }
    }

    return {
      totalComponents: profiles.length,
      activeComponents: activeComponents.size,
      totalSnapshots,
      maxHeapUsed: formatFileSize(maxHeap),
      maxHeapComponent: maxComponent,
    };
  },
};

// Expose to window for DevTools access
declare global {
  interface Window {
    __ISLAND_MEMORY_PROFILE__?: typeof MemoryProfileGlobal;
  }
}

if (typeof window !== "undefined") {
  window.__ISLAND_MEMORY_PROFILE__ = MemoryProfileGlobal;
}
