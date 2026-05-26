/**
 * Annotation CRUD and AI annotation job websocket payloads.
 *
 * @packageDocumentation
 */

import type { AnnotationRecord } from "../annotations.ts";

/**
 * Realtime payload for annotation CRUD events.
 */
export interface AnnotationChangedEventPayload {
  /** Operation applied to the annotation record. */
  action: "created" | "updated" | "deleted";
  /** Canonical server ID for the annotation. */
  annotationId: string;
  /**
   * Full annotation payload when available.
   * Omitted for delete events when the server does not include a record snapshot.
   */
  annotation?: AnnotationRecord;
  /** Optional context identifiers for client-side filtering. */
  contextType?: AnnotationRecord["contextType"];
  caseId?: string | null;
  assetId?: string | null;
  xrExperienceId?: string | null;
  subjectType?: string | null;
  subjectId?: string | null;
  /** Origin of the change to support UI labeling. */
  source?: "api" | "sync" | "batch";
}

/**
 * AI annotation job status values emitted over realtime events.
 */
export type AiAnnotationJobStatus = "queued" | "processing" | "completed" | "failed";

/**
 * Realtime payload for AI annotation job status events.
 */
export interface AiAnnotationJobEventPayload {
  /** AI job identifier. */
  jobId: string;
  /** Current job status. */
  status: AiAnnotationJobStatus;
  /** Optional context identifiers for client-side filtering. */
  assetId: string | null;
  annotationSetId: string | null;
  subjectType: string | null;
  subjectId: string | null;
  /** Provider/model metadata. */
  provider: string | null;
  model: string | null;
  /** Audit metadata. */
  createdBy: string | null;
  queuedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  /** Error message when status is failed. */
  error: string | null;
}
