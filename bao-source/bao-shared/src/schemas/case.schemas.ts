/**
 * Case Schema Definitions
 *
 * Baobox schema validation for pathology case creation and management.
 * Provides runtime type checking and compile-time type inference using
 * Baobox for consistent validation across client and server.
 *
 * Re-exports case status and priority types from the status utility module
 * for centralized access.
 *
 * @shared/schemas/case.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/** Case status/priority types re-exported for local schema references. */
export type { CaseStatus, CaseStatusConfigEntry } from "../utils/status/case";
export type { PriorityConfigEntry, PriorityLevel } from "../utils/status/priority";

/**
 * Case priority levels as a const array.
 * Used for Baobox union type generation.
 */
export const CASE_PRIORITIES: readonly ["routine", "priority", "urgent", "stat"] = [
  "routine",
  "priority",
  "urgent",
  "stat",
] as const;

/**
 * Case priority type derived from the const array.
 */
export type CasePriorityType = (typeof CASE_PRIORITIES)[number];

/**
 * Baobox schema for case priority.
 */
export const CasePrioritySchema: Type.TUnion<
  (
    | Type.TLiteral<"routine">
    | Type.TLiteral<"priority">
    | Type.TLiteral<"urgent">
    | Type.TLiteral<"stat">
  )[]
> = Type.Union(
  [Type.Literal("routine"), Type.Literal("priority"), Type.Literal("urgent"), Type.Literal("stat")],
  { default: "routine", description: "Case priority level" },
);

/**
 * Case status values as a const array.
 */
export const CASE_STATUS_VALUES: readonly [
  "pending",
  "in-progress",
  "completed",
  "cancelled",
  "archived",
] = ["pending", "in-progress", "completed", "cancelled", "archived"] as const;

/**
 * TypeBox schema for case status.
 */
export const CaseStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"pending">
    | Type.TLiteral<"in-progress">
    | Type.TLiteral<"completed">
    | Type.TLiteral<"cancelled">
    | Type.TLiteral<"archived">
  )[]
> = Type.Union(
  [
    Type.Literal("pending"),
    Type.Literal("in-progress"),
    Type.Literal("completed"),
    Type.Literal("cancelled"),
    Type.Literal("archived"),
  ],
  { description: "Case status" },
);

/**
 * Patient demographic information schema.
 */
export const PatientDemographicsSchema: Type.TObject<
  {
    readonly patientId: Type.TOptional<Type.TString>;
    readonly patientFirstName: Type.TOptional<Type.TString>;
    readonly patientLastName: Type.TOptional<Type.TString>;
    readonly patientName: Type.TOptional<Type.TString>;
    readonly patientDob: Type.TOptional<Type.TString>;
    readonly patientGender: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly patientId: Type.TOptional<Type.TString>;
    readonly patientFirstName: Type.TOptional<Type.TString>;
    readonly patientLastName: Type.TOptional<Type.TString>;
    readonly patientName: Type.TOptional<Type.TString>;
    readonly patientDob: Type.TOptional<Type.TString>;
    readonly patientGender: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    /** Unique patient identifier from EHR or system */
    patientId: Type.Optional(Type.String({ description: "Patient ID from EHR" })),
    /** Patient's first name */
    patientFirstName: Type.Optional(Type.String({ description: "Patient first name" })),
    /** Patient's last name */
    patientLastName: Type.Optional(Type.String({ description: "Patient last name" })),
    /** Combined patient display name */
    patientName: Type.Optional(Type.String({ description: "Patient display name" })),
    /** Patient date of birth (ISO 8601 or YYYY-MM-DD format) */
    patientDob: Type.Optional(Type.String({ format: "date", description: "Date of birth" })),
    /** Patient gender/sex */
    patientGender: Type.Optional(Type.String({ description: "Patient gender" })),
  },
  { description: "Patient demographic information" },
);

/**
 * Inferred type for patient demographics.
 */
export type PatientDemographics = Static<typeof PatientDemographicsSchema>;

/**
 * Schema for creating a new pathology case.
 *
 * Validation Rules:
 * - specimenType: Required, minimum 1 character
 * - specimenCount: Required, minimum value of 1
 * - priority: Optional, defaults to 'routine'
 * - All patient fields: Optional for partial demographic data
 *
 * @example
 * ```ts
 * import { Value } from '@baohaus/baobox/value';
 * import { NewCaseSchema, type NewCase } from '@baohaus/bao-schemas/case.ts';
 *
 * const caseData: NewCase = {
 *   patientName: 'John Doe',
 *   specimenType: 'biopsy',
 *   specimenCount: 3,
 *   priority: 'urgent',
 *   clinicalHistory: 'Patient presents with...'
 * };
 *
 * // Validate against schema
 * const isValid = Check(NewCaseSchema, caseData);
 * ```
 */
export const NewCaseSchema = Type.Intersect(
  [
    PatientDemographicsSchema,
    Type.Object({
      /** Type of specimen (e.g., biopsy, resection, cytology) - REQUIRED */
      specimenType: Type.String({ minLength: 1, description: "Type of specimen" }),
      /** Number of specimen containers/blocks - REQUIRED, minimum 1 */
      specimenCount: Type.Number({ minimum: 1, description: "Number of specimens" }),
      /** Case priority level */
      priority: Type.Optional(CasePrioritySchema),
      /** Clinical history and indication for examination */
      clinicalHistory: Type.Optional(Type.String({ description: "Clinical history" })),
      /** Laboratory accession number */
      accessionNumber: Type.Optional(Type.String({ description: "Accession number" })),
    }),
  ],
  { description: "New case creation payload" },
);

/**
 * Inferred TypeScript type from NewCaseSchema.
 */
export type NewCase = Static<typeof NewCaseSchema>;

/**
 * Case list item schema for paginated case listings.
 */
export const CaseListItemSchema = Type.Object(
  {
    id: Type.String({ description: "Case UUID" }),
    caseId: Type.String({ description: "Human-readable case ID" }),
    status: CaseStatusSchema,
    priority: CasePrioritySchema,
    specimenType: Type.String(),
    specimenCount: Type.Number(),
    patientName: Type.Optional(Type.String()),
    patientId: Type.Optional(Type.String()),
    accessionNumber: Type.Optional(Type.String()),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { description: "Case list item for table display" },
);

/**
 * Inferred type for case list items.
 */
export type CaseListItem = Static<typeof CaseListItemSchema>;

/**
 * Case detail schema with full case information.
 */
export const CaseDetailSchema = Type.Intersect(
  [
    CaseListItemSchema,
    Type.Object({
      clinicalHistory: Type.Optional(Type.String()),
      grossDescription: Type.Optional(Type.String()),
      microscopicDescription: Type.Optional(Type.String()),
      diagnosis: Type.Optional(Type.String()),
      notes: Type.Optional(Type.String()),
      workflowState: Type.Optional(Type.String()),
      assignedToId: Type.Optional(Type.String()),
      assignedToName: Type.Optional(Type.String()),
      imageCount: Type.Optional(Type.Number()),
      annotationCount: Type.Optional(Type.Number()),
    }),
  ],
  { description: "Full case detail" },
);

/**
 * Inferred type for case detail.
 */
export type CaseDetail = Static<typeof CaseDetailSchema>;

/**
 * Schema for updating an existing case.
 * All fields are optional.
 */
export const UpdateCaseSchema = Type.Partial(
  Type.Object({
    status: CaseStatusSchema,
    priority: CasePrioritySchema,
    patientName: Type.String(),
    patientId: Type.String(),
    specimenType: Type.String(),
    specimenCount: Type.Number({ minimum: 1 }),
    clinicalHistory: Type.String(),
    grossDescription: Type.String(),
    microscopicDescription: Type.String(),
    diagnosis: Type.String(),
    notes: Type.String(),
    workflowState: Type.String(),
    assignedToId: Type.String(),
  }),
  { description: "Case update payload" },
);

/**
 * Inferred type for case updates.
 */
export type UpdateCase = Static<typeof UpdateCaseSchema>;

/**
 * Case statistics summary schema.
 */
export const CaseStatsSchema: Type.TObject<
  {
    readonly total: Type.TNumber;
    readonly pending: Type.TNumber;
    readonly inProgress: Type.TNumber;
    readonly completed: Type.TNumber;
    readonly cancelled: Type.TNumber;
    readonly archived: Type.TNumber;
    readonly todayNew: Type.TOptional<Type.TNumber>;
    readonly thisWeekNew: Type.TOptional<Type.TNumber>;
  },
  "pending" | "completed" | "cancelled" | "archived" | "total" | "inProgress",
  Type.InferOptionalKeys<{
    readonly total: Type.TNumber;
    readonly pending: Type.TNumber;
    readonly inProgress: Type.TNumber;
    readonly completed: Type.TNumber;
    readonly cancelled: Type.TNumber;
    readonly archived: Type.TNumber;
    readonly todayNew: Type.TOptional<Type.TNumber>;
    readonly thisWeekNew: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    total: Type.Number({ description: "Total case count" }),
    pending: Type.Number({ description: "Pending cases" }),
    inProgress: Type.Number({ description: "Cases in progress" }),
    completed: Type.Number({ description: "Completed cases" }),
    cancelled: Type.Number({ description: "Cancelled cases" }),
    archived: Type.Number({ description: "Archived cases" }),
    todayNew: Type.Optional(Type.Number({ description: "New cases today" })),
    thisWeekNew: Type.Optional(Type.Number({ description: "New cases this week" })),
  },
  { description: "Case statistics summary" },
);

/**
 * Inferred type for case statistics.
 */
export type CaseStats = Static<typeof CaseStatsSchema>;
