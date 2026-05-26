/**
 * OpenMetrics pod annotation keys for Kubernetes scrape discovery.
 *
 * Single source of truth for platform-native metrics annotations.
 * Follows the industry-standard Prometheus scrape/port/path annotation pattern.
 *
 * @shared/constants/metrics-annotations
 */

/** Annotation key: enable Prometheus scrape for this pod. */
export const PROMETHEUS_ANNOTATION_SCRAPE = "prometheus.io/scrape";

/** Annotation key: port for metrics scrape. */
export const PROMETHEUS_ANNOTATION_PORT = "prometheus.io/port";

/** Annotation key: path for metrics scrape. */
export const PROMETHEUS_ANNOTATION_PATH = "prometheus.io/path";
