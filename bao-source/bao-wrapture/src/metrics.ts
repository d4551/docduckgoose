/**
 * Wrapture encode/decode performance metrics.
 *
 * Lightweight counters and histograms for observability on high-frequency
 * FlatBuffers paths. No external dependencies — uses monotonic Bun/perf timing.
 *
 * Includes sampling support: at extreme rates (>1 kHz), timing overhead from
 * `performance.now()` can become significant. The `sampledRecordEncode`/`sampledRecordDecode`
 * variants only measure timing every Nth operation, reducing overhead by ~90% while
 * still providing statistically accurate average latency.
 *
 * @shared/wrapture
 *
 * @internal NS_PER_MS converts performance.now() milliseconds to nanoseconds.
 */

const NS_PER_MS = 1000000;

/** Per-protocol operation counters. */
interface ProtocolMetrics {
  encodeCount: number;
  decodeCount: number;
  encodeBytes: number;
  decodeBytes: number;
  encodeErrors: number;
  decodeErrors: number;
  encodeNanos: number;
  decodeNanos: number;
  /** Encode operations where timing was actually sampled. */
  encodeSampled: number;
  /** Decode operations where timing was actually sampled. */
  decodeSampled: number;
  /** Peak encode bytes seen in a single operation. */
  peakEncodeBytes: number;
  /** Peak decode bytes seen in a single operation. */
  peakDecodeBytes: number;
  /** Buffer verifications that passed. */
  verifyPass: number;
  /** Buffer verifications that failed. */
  verifyFail: number;
  /** Verify failure reasons for diagnostics. */
  verifyFailByReason: Record<string, number>;
}

/** Supported protocol labels. */
export type WraptureProtocolLabel =
  | "bao-install"
  | "bao-manifest"
  | "cache"
  | "baodown"
  | "module-lifecycle"
  | "observability"
  | "perception.pointcloud"
  | "perception.mesh"
  | "hardware-state"
  | "realtime.drone"
  | "realtime.scanner"
  | "realtime.telemetry"
  | "realtime.device"
  | "realtime.gimbal"
  | "realtime.envelope";

const metrics: Map<WraptureProtocolLabel, ProtocolMetrics> = new Map<
  WraptureProtocolLabel,
  ProtocolMetrics
>();

/**
 * Default sampling rate: record timing every Nth operation.
 * Counters and byte totals are always recorded; only timing is sampled.
 */
let samplingRate = 16;

/** High-resolution timer using Bun's performance.now() (ms with sub-ms precision). */
function hrtimeNs(): number {
  return performance.now() * NS_PER_MS;
}

/**
 * Get or create metrics for a protocol label.
 *
 * @param label - Protocol identifier.
 * @returns Mutable metrics reference.
 */
function getOrCreate(label: WraptureProtocolLabel): ProtocolMetrics {
  let m = metrics.get(label);
  if (!m) {
    m = {
      encodeCount: 0,
      decodeCount: 0,
      encodeBytes: 0,
      decodeBytes: 0,
      encodeErrors: 0,
      decodeErrors: 0,
      encodeNanos: 0,
      decodeNanos: 0,
      encodeSampled: 0,
      decodeSampled: 0,
      peakEncodeBytes: 0,
      peakDecodeBytes: 0,
      verifyPass: 0,
      verifyFail: 0,
      verifyFailByReason: {},
    };
    metrics.set(label, m);
  }
  return m;
}

/**
 * Set the sampling rate for timing measurements.
 *
 * At rate N, timing is recorded every Nth operation. Counters and byte
 * totals are always accumulated regardless of sampling.
 *
 * @param rate - Sampling rate (1 = every op, 16 = every 16th op). Must be >= 1.
 */
export function setMetricsSamplingRate(rate: number): void {
  samplingRate = Math.max(1, Math.trunc(rate));
}

/**
 * Record an encode operation.
 *
 * @param label - Protocol label.
 * @param byteSize - Output buffer size in bytes.
 * @param startNs - Start timestamp from `hrtimeNs()`.
 */
export function recordEncode(
  label: WraptureProtocolLabel,
  byteSize: number,
  startNs: number,
): void {
  const m = getOrCreate(label);
  m.encodeCount++;
  m.encodeBytes += byteSize;
  if (byteSize > m.peakEncodeBytes) {
    m.peakEncodeBytes = byteSize;
  }
  m.encodeSampled++;
  m.encodeNanos += hrtimeNs() - startNs;
}

/**
 * Record a decode operation.
 *
 * @param label - Protocol label.
 * @param byteSize - Input buffer size in bytes.
 * @param startNs - Start timestamp from `hrtimeNs()`.
 */
export function recordDecode(
  label: WraptureProtocolLabel,
  byteSize: number,
  startNs: number,
): void {
  const m = getOrCreate(label);
  m.decodeCount++;
  m.decodeBytes += byteSize;
  if (byteSize > m.peakDecodeBytes) {
    m.peakDecodeBytes = byteSize;
  }
  m.decodeSampled++;
  m.decodeNanos += hrtimeNs() - startNs;
}

/**
 * Record an encode with sampled timing. Counters are always incremented;
 * timing is only measured every `samplingRate` operations.
 *
 * For hot paths running >1 kHz where `performance.now()` overhead matters.
 *
 * @param label - Protocol label.
 * @param byteSize - Output buffer size in bytes.
 * @param startNs - Start timestamp (only used when this is a sampled op).
 */
export function sampledRecordEncode(
  label: WraptureProtocolLabel,
  byteSize: number,
  startNs: number,
): void {
  const m = getOrCreate(label);
  m.encodeCount++;
  m.encodeBytes += byteSize;
  if (byteSize > m.peakEncodeBytes) {
    m.peakEncodeBytes = byteSize;
  }
  if (m.encodeCount % samplingRate === 0) {
    m.encodeSampled++;
    m.encodeNanos += hrtimeNs() - startNs;
  }
}

/**
 * Record a decode with sampled timing.
 *
 * @param label - Protocol label.
 * @param byteSize - Input buffer size in bytes.
 * @param startNs - Start timestamp (only used when this is a sampled op).
 */
export function sampledRecordDecode(
  label: WraptureProtocolLabel,
  byteSize: number,
  startNs: number,
): void {
  const m = getOrCreate(label);
  m.decodeCount++;
  m.decodeBytes += byteSize;
  if (byteSize > m.peakDecodeBytes) {
    m.peakDecodeBytes = byteSize;
  }
  if (m.decodeCount % samplingRate === 0) {
    m.decodeSampled++;
    m.decodeNanos += hrtimeNs() - startNs;
  }
}

/**
 * Check whether timing should be measured for the current operation.
 *
 * Allows callers to skip `performance.now()` entirely on non-sampled operations,
 * avoiding the syscall overhead. Use with `sampledRecordEncode`/`sampledRecordDecode`.
 *
 * @param label - Protocol label.
 * @returns True when this operation will be timed.
 */
export function shouldSampleTiming(label: WraptureProtocolLabel): boolean {
  const m = metrics.get(label);
  if (!m) {
    return true;
  }
  return (m.encodeCount + m.decodeCount + 1) % samplingRate === 0;
}

/**
 * Record an encode error.
 *
 * @param label - Protocol label.
 */
export function recordEncodeError(label: WraptureProtocolLabel): void {
  getOrCreate(label).encodeErrors++;
}

/**
 * Record a decode error.
 *
 * @param label - Protocol label.
 */
export function recordDecodeError(label: WraptureProtocolLabel): void {
  getOrCreate(label).decodeErrors++;
}

/**
 * Record a successful buffer verification.
 *
 * @param label - Protocol label.
 */
export function recordVerifyPass(label: WraptureProtocolLabel): void {
  getOrCreate(label).verifyPass++;
}

/**
 * Record a failed buffer verification.
 *
 * @param label - Protocol label.
 * @param reason - Machine-readable failure reason.
 */
export function recordVerifyFail(label: WraptureProtocolLabel, reason: string): void {
  const m = getOrCreate(label);
  m.verifyFail++;
  m.verifyFailByReason[reason] = (m.verifyFailByReason[reason] ?? 0) + 1;
}

/**
 * Start a timing measurement.
 *
 * @returns Nanosecond timestamp for use with `recordEncode`/`recordDecode`.
 */
export function startTiming(): number {
  return hrtimeNs();
}

/**
 * Start a timing measurement only when this operation will be sampled.
 *
 * Returns 0 when not sampled, which avoids the `performance.now()` syscall.
 *
 * @param label - Protocol label to check sampling against.
 * @returns Nanosecond timestamp or 0 when not sampled.
 */
export function startSampledTiming(label: WraptureProtocolLabel): number {
  return shouldSampleTiming(label) ? hrtimeNs() : 0;
}

/**
 * Snapshot of all protocol metrics.
 */
export interface WraptureMetricsSnapshot {
  protocols: Record<
    string,
    ProtocolMetrics & {
      avgEncodeNs: number;
      avgDecodeNs: number;
    }
  >;
  totals: {
    encodeCount: number;
    decodeCount: number;
    encodeBytes: number;
    decodeBytes: number;
    encodeErrors: number;
    decodeErrors: number;
  };
  /** Current sampling rate. */
  samplingRate: number;
}

/**
 * Snapshot current metrics for monitoring/logging.
 *
 * Average nanoseconds are computed from sampled operations, then extrapolated
 * to represent per-operation averages. When sampling rate is N, only 1/N operations
 * are timed, but the average reflects the actual per-op cost.
 *
 * @returns Metrics snapshot with per-protocol and aggregate totals.
 */
export function getWraptureMetrics(): WraptureMetricsSnapshot {
  const protocols: WraptureMetricsSnapshot["protocols"] = {};
  const totals = {
    encodeCount: 0,
    decodeCount: 0,
    encodeBytes: 0,
    decodeBytes: 0,
    encodeErrors: 0,
    decodeErrors: 0,
  };

  for (const [label, m] of metrics) {
    protocols[label] = {
      ...m,
      avgEncodeNs: m.encodeSampled > 0 ? m.encodeNanos / m.encodeSampled : 0,
      avgDecodeNs: m.decodeSampled > 0 ? m.decodeNanos / m.decodeSampled : 0,
    };
    totals.encodeCount += m.encodeCount;
    totals.decodeCount += m.decodeCount;
    totals.encodeBytes += m.encodeBytes;
    totals.decodeBytes += m.decodeBytes;
    totals.encodeErrors += m.encodeErrors;
    totals.decodeErrors += m.decodeErrors;
  }

  return { protocols, totals, samplingRate };
}

/**
 * Reset all metrics (testing only).
 */
export function resetWraptureMetrics(): void {
  metrics.clear();
}
