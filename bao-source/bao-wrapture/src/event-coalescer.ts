/**
 * Event Coalescer for High-Frequency FlatBuffer Streams.
 *
 * Coalesces rapid-fire events from BunBuddy probe streams, hardware telemetry,
 * and device status updates into batched flushes. Reduces decode/process
 * overhead by combining multiple events per flush window.
 *
 * @packageDocumentation
 */

/**
 * Coalescer configuration.
 */
export interface EventCoalescerConfig {
  /** Maximum events to buffer before forcing a flush. Default: 16. */
  maxBatchSize: number;

  /** Maximum time in ms to wait before flushing. Default: 50. */
  flushIntervalMs: number;
}

/**
 * Flush callback type.
 */
export type FlushCallback<T> = (events: readonly T[]) => void;

/**
 * Default coalescer configuration.
 */
const DEFAULT_CONFIG: EventCoalescerConfig = {
  maxBatchSize: 16,
  flushIntervalMs: 50,
};

/**
 * Coalescer metrics snapshot.
 */
export interface CoalescerMetrics {
  /** Total events ingested. */
  totalIngested: number;
  /** Total flush operations. */
  totalFlushes: number;
  /** Average events per flush. */
  avgBatchSize: number;
  /** Events currently buffered. */
  currentBufferSize: number;
}

/**
 * Event coalescer for batching high-frequency event streams.
 *
 * Buffers incoming events and flushes them in batches when either:
 * - The buffer reaches `maxBatchSize`
 * - The `flushIntervalMs` timer expires
 *
 * @typeParam T - Event type being coalesced.
 */
export class EventCoalescer<T> {
  private readonly config: EventCoalescerConfig;
  private readonly onFlush: FlushCallback<T>;
  private buffer: T[] = [];
  private flushTimer: ReturnType<typeof setTimeout> | null = null;

  /** Total events ingested. */
  private totalIngested = 0;

  /** Total flush operations. */
  private totalFlushes = 0;

  /**
   * Create a new event coalescer.
   *
   * @param onFlush - Callback invoked with each batch of coalesced events.
   * @param config - Coalescer configuration.
   */
  constructor(onFlush: FlushCallback<T>, config: Partial<EventCoalescerConfig> = {}) {
    this.onFlush = onFlush;
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Ingest a single event into the coalescer.
   *
   * May trigger an immediate flush if the buffer is full.
   *
   * @param event - Event to buffer.
   */
  push(event: T): void {
    this.buffer.push(event);
    this.totalIngested++;

    if (this.buffer.length >= this.config.maxBatchSize) {
      this.flush();
      return;
    }

    if (!this.flushTimer) {
      this.flushTimer = setTimeout(() => {
        this.flushTimer = null;
        if (this.buffer.length > 0) {
          this.flush();
        }
      }, this.config.flushIntervalMs);
    }
  }

  /**
   * Force-flush all buffered events immediately.
   */
  flush(): void {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }

    if (this.buffer.length === 0) {
      return;
    }

    const batch = this.buffer;
    this.buffer = [];
    this.totalFlushes++;
    this.onFlush(batch);
  }

  /**
   * Dispose the coalescer, flushing any remaining events.
   */
  dispose(): void {
    this.flush();
  }

  /**
   * Get current coalescer metrics.
   *
   * @returns Metrics snapshot.
   */
  getMetrics(): CoalescerMetrics {
    return {
      totalIngested: this.totalIngested,
      totalFlushes: this.totalFlushes,
      avgBatchSize: this.totalFlushes > 0 ? this.totalIngested / this.totalFlushes : 0,
      currentBufferSize: this.buffer.length,
    };
  }

  /**
   * Reset internal state and metrics. Intended for testing.
   */
  reset(): void {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    this.buffer = [];
    this.totalIngested = 0;
    this.totalFlushes = 0;
  }
}
