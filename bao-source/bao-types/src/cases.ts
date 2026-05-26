/**
 * Shared case-related contract types.
 *
 * Mirrors server API contracts for cases to keep Eden/client alignment.
 *
 * @packageDocumentation
 */

/**
 * Upload configuration payload returned by `GET /api/v1/cases/config`.
 */
export interface CaseUploadConfig {
  /** Payload status flag. */
  ok: true;
  /** Maximum file size in bytes. */
  maxFileSizeBytes: number;
  /** Human-readable size label. */
  maxFileSizeLabel: string;
  /** Maximum number of files allowed per case. */
  maxFilesPerCase: number;
  /** Accepted MIME types for uploads. */
  acceptedMimeTypes: string[];
  /** Accepted file extensions for uploads. */
  acceptedExtensions: string[];
}
