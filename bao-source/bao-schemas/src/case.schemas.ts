/**
 * Case Schema Definitions
 *
 * TypeBox schema validation for pathology case creation and management.
 * Provides runtime type checking and compile-time type inference using
 * Sinclair TypeBox for consistent validation across client and server.
 *
 * Re-exports case status and priority types from the status utility module
 * for centralized access.
 *
 * @shared/schemas/case.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

export type CaseStatus = "pending" | "in-progress" | "completed" | "cancelled" | "archived";

export interface CaseStatusConfigEntry {
  label: string;
  description: string;
  color: string;
  icon: string;
  badge: string;
  order: number;
}

export type PriorityLevel = 0 | 1 | 2 | 3;

export interface PriorityConfigEntry {
  label: string;
  labelKey: "routine" | "priority" | "urgent" | "stat";
  description: string;
  color: string;
  icon: string;
  badge: string;
  order: number;
  urgency: "low" | "medium" | "high";
}

/**
 * Case priority levels as a const array.
 * Used for TypeBox union type generation.
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
 * TypeBox schema for case priority.
 */
export const CasePrioritySchema: TUnion<
  (TLiteral<"routine"> | TLiteral<"priority"> | TLiteral<"urgent"> | TLiteral<"stat">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("routine"),
    TypeExports.Literal("priority"),
    TypeExports.Literal("urgent"),
    TypeExports.Literal("stat"),
  ],
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
export const CaseStatusSchema: TUnion<
  (
    | TLiteral<"pending">
    | TLiteral<"in-progress">
    | TLiteral<"completed">
    | TLiteral<"cancelled">
    | TLiteral<"archived">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("pending"),
    TypeExports.Literal("in-progress"),
    TypeExports.Literal("completed"),
    TypeExports.Literal("cancelled"),
    TypeExports.Literal("archived"),
  ],
  { description: "Case status" },
);

/**
 * Patient demographic information schema.
 */
export const PatientDemographicsSchema: TObject<
  {
    readonly patientId: TOptional<TString>;
    readonly patientFirstName: TOptional<TString>;
    readonly patientLastName: TOptional<TString>;
    readonly patientName: TOptional<TString>;
    readonly patientDob: TOptional<TString>;
    readonly patientGender: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly patientId: TOptional<TString>;
    readonly patientFirstName: TOptional<TString>;
    readonly patientLastName: TOptional<TString>;
    readonly patientName: TOptional<TString>;
    readonly patientDob: TOptional<TString>;
    readonly patientGender: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    /** Unique patient identifier from EHR or system */
    patientId: TypeExports.Optional(TypeExports.String({ description: "Patient ID from EHR" })),
    /** Patient's first name */
    patientFirstName: TypeExports.Optional(
      TypeExports.String({ description: "Patient first name" }),
    ),
    /** Patient's last name */
    patientLastName: TypeExports.Optional(TypeExports.String({ description: "Patient last name" })),
    /** Combined patient display name */
    patientName: TypeExports.Optional(TypeExports.String({ description: "Patient display name" })),
    /** Patient date of birth (ISO 8601 or YYYY-MM-DD format) */
    patientDob: TypeExports.Optional(
      TypeExports.String({ format: "date", description: "Date of birth" }),
    ),
    /** Patient gender/sex */
    patientGender: TypeExports.Optional(TypeExports.String({ description: "Patient gender" })),
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
export const NewCaseSchema = TypeExports.Intersect(
  [
    PatientDemographicsSchema,
    TypeExports.Object({
      /** Type of specimen (e.g., biopsy, resection, cytology) - REQUIRED */
      specimenType: TypeExports.String({ minLength: 1, description: "Type of specimen" }),
      /** Number of specimen containers/blocks - REQUIRED, minimum 1 */
      specimenCount: TypeExports.Number({ minimum: 1, description: "Number of specimens" }),
      /** Case priority level */
      priority: TypeExports.Optional(CasePrioritySchema),
      /** Clinical history and indication for examination */
      clinicalHistory: TypeExports.Optional(
        TypeExports.String({ description: "Clinical history" }),
      ),
      /** Laboratory accession number */
      accessionNumber: TypeExports.Optional(
        TypeExports.String({ description: "Accession number" }),
      ),
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
export const CaseListItemSchema = TypeExports.Object(
  {
    id: TypeExports.String({ description: "Case UUID" }),
    caseId: TypeExports.String({ description: "Human-readable case ID" }),
    status: CaseStatusSchema,
    priority: CasePrioritySchema,
    specimenType: TypeExports.String(),
    specimenCount: TypeExports.Number(),
    patientName: TypeExports.Optional(TypeExports.String()),
    patientId: TypeExports.Optional(TypeExports.String()),
    accessionNumber: TypeExports.Optional(TypeExports.String()),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
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
export const CaseDetailSchema = TypeExports.Intersect(
  [
    CaseListItemSchema,
    TypeExports.Object({
      clinicalHistory: TypeExports.Optional(TypeExports.String()),
      grossDescription: TypeExports.Optional(TypeExports.String()),
      microscopicDescription: TypeExports.Optional(TypeExports.String()),
      diagnosis: TypeExports.Optional(TypeExports.String()),
      notes: TypeExports.Optional(TypeExports.String()),
      workflowState: TypeExports.Optional(TypeExports.String()),
      assignedToId: TypeExports.Optional(TypeExports.String()),
      assignedToName: TypeExports.Optional(TypeExports.String()),
      imageCount: TypeExports.Optional(TypeExports.Number()),
      annotationCount: TypeExports.Optional(TypeExports.Number()),
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
export const UpdateCaseSchema = TypeExports.Partial(
  TypeExports.Object({
    status: CaseStatusSchema,
    priority: CasePrioritySchema,
    patientName: TypeExports.String(),
    patientId: TypeExports.String(),
    specimenType: TypeExports.String(),
    specimenCount: TypeExports.Number({ minimum: 1 }),
    clinicalHistory: TypeExports.String(),
    grossDescription: TypeExports.String(),
    microscopicDescription: TypeExports.String(),
    diagnosis: TypeExports.String(),
    notes: TypeExports.String(),
    workflowState: TypeExports.String(),
    assignedToId: TypeExports.String(),
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
export const CaseStatsSchema: TObject<
  {
    readonly total: TNumber;
    readonly pending: TNumber;
    readonly inProgress: TNumber;
    readonly completed: TNumber;
    readonly cancelled: TNumber;
    readonly archived: TNumber;
    readonly todayNew: TOptional<TNumber>;
    readonly thisWeekNew: TOptional<TNumber>;
  },
  "pending" | "completed" | "cancelled" | "archived" | "total" | "inProgress",
  InferOptionalKeys<{
    readonly total: TNumber;
    readonly pending: TNumber;
    readonly inProgress: TNumber;
    readonly completed: TNumber;
    readonly cancelled: TNumber;
    readonly archived: TNumber;
    readonly todayNew: TOptional<TNumber>;
    readonly thisWeekNew: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    total: TypeExports.Number({ description: "Total case count" }),
    pending: TypeExports.Number({ description: "Pending cases" }),
    inProgress: TypeExports.Number({ description: "Cases in progress" }),
    completed: TypeExports.Number({ description: "Completed cases" }),
    cancelled: TypeExports.Number({ description: "Cancelled cases" }),
    archived: TypeExports.Number({ description: "Archived cases" }),
    todayNew: TypeExports.Optional(TypeExports.Number({ description: "New cases today" })),
    thisWeekNew: TypeExports.Optional(TypeExports.Number({ description: "New cases this week" })),
  },
  { description: "Case statistics summary" },
);

/**
 * Inferred type for case statistics.
 */
export type CaseStats = Static<typeof CaseStatsSchema>;
