/**
 * Canonical UI result/error state-machine contract shared across frontend composables
 * and API consumers.
 *
 * This module is the single source of truth for state tokens used to map
 * API/auth/error semantics to deterministic UI rendering.
 */

/**
 * Ordered canonical UI state tokens.
 */
export const UI_STATE_MACHINE_VALUES: readonly [
  "idle",
  "loading",
  "refreshing",
  "success",
  "empty",
  "partial",
  "error.retryable",
  "error.non-retryable",
  "error.auth",
  "error.unauthorized",
  "error.forbidden",
  "error.validation",
  "degraded",
  "unavailable",
] = [
  "idle",
  "loading",
  "refreshing",
  "success",
  "empty",
  "partial",
  "error.retryable",
  "error.non-retryable",
  "error.auth",
  "error.unauthorized",
  "error.forbidden",
  "error.validation",
  "degraded",
  "unavailable",
] as const;

/**
 * Canonical UI state token union.
 */
export type UiStateMachineValue = (typeof UI_STATE_MACHINE_VALUES)[number];

/**
 * Canonical error-state token subset.
 */
export const UI_STATE_MACHINE_ERROR_VALUES: readonly [
  "error.retryable",
  "error.non-retryable",
  "error.auth",
  "error.unauthorized",
  "error.forbidden",
  "error.validation",
] = [
  "error.retryable",
  "error.non-retryable",
  "error.auth",
  "error.unauthorized",
  "error.forbidden",
  "error.validation",
] as const;

/**
 * Error-state token union.
 */
export type UiStateMachineErrorValue = (typeof UI_STATE_MACHINE_ERROR_VALUES)[number];

/**
 * Terminal UI states where no additional loading transition is expected.
 */
export const UI_STATE_MACHINE_TERMINAL_VALUES: readonly [
  "success",
  "empty",
  "partial",
  "error.retryable",
  "error.non-retryable",
  "error.auth",
  "error.unauthorized",
  "error.forbidden",
  "error.validation",
  "degraded",
  "unavailable",
] = [
  "success",
  "empty",
  "partial",
  "error.retryable",
  "error.non-retryable",
  "error.auth",
  "error.unauthorized",
  "error.forbidden",
  "error.validation",
  "degraded",
  "unavailable",
] as const;

/**
 * Terminal-state token union.
 */
export type UiStateMachineTerminalValue = (typeof UI_STATE_MACHINE_TERMINAL_VALUES)[number];

/**
 * Deterministic transition map for the canonical UI state machine.
 */
export const UI_STATE_MACHINE_TRANSITIONS: Readonly<
  Record<UiStateMachineValue, readonly UiStateMachineValue[]>
> = {
  idle: [
    "loading",
    "success",
    "empty",
    "error.retryable",
    "error.non-retryable",
    "error.auth",
    "error.unauthorized",
    "error.forbidden",
    "error.validation",
    "degraded",
    "unavailable",
  ],
  loading: [
    "refreshing",
    "success",
    "empty",
    "partial",
    "error.retryable",
    "error.non-retryable",
    "error.auth",
    "error.unauthorized",
    "error.forbidden",
    "error.validation",
    "degraded",
    "unavailable",
  ],
  refreshing: [
    "success",
    "empty",
    "partial",
    "error.retryable",
    "error.non-retryable",
    "error.auth",
    "error.unauthorized",
    "error.forbidden",
    "error.validation",
    "degraded",
    "unavailable",
  ],
  success: [
    "refreshing",
    "partial",
    "degraded",
    "unavailable",
    "error.retryable",
    "error.non-retryable",
    "error.auth",
    "error.unauthorized",
    "error.forbidden",
    "error.validation",
  ],
  empty: [
    "loading",
    "refreshing",
    "success",
    "error.retryable",
    "error.non-retryable",
    "error.auth",
    "error.unauthorized",
    "error.forbidden",
    "error.validation",
    "degraded",
    "unavailable",
  ],
  partial: [
    "refreshing",
    "success",
    "error.retryable",
    "error.non-retryable",
    "error.auth",
    "error.unauthorized",
    "error.forbidden",
    "error.validation",
    "degraded",
    "unavailable",
  ],
  "error.retryable": [
    "loading",
    "refreshing",
    "success",
    "empty",
    "partial",
    "error.non-retryable",
    "degraded",
    "unavailable",
  ],
  "error.non-retryable": [
    "loading",
    "refreshing",
    "success",
    "empty",
    "partial",
    "degraded",
    "unavailable",
  ],
  "error.auth": ["loading", "success", "empty", "error.unauthorized", "error.forbidden"],
  "error.unauthorized": ["loading", "success", "empty", "error.auth"],
  "error.forbidden": ["loading", "success", "empty", "error.auth"],
  "error.validation": [
    "loading",
    "refreshing",
    "success",
    "empty",
    "partial",
    "error.retryable",
    "error.non-retryable",
  ],
  degraded: [
    "refreshing",
    "success",
    "partial",
    "error.retryable",
    "error.non-retryable",
    "error.auth",
    "error.unauthorized",
    "error.forbidden",
    "error.validation",
    "unavailable",
  ],
  unavailable: [
    "loading",
    "refreshing",
    "success",
    "empty",
    "error.retryable",
    "error.non-retryable",
    "error.auth",
    "error.unauthorized",
    "error.forbidden",
    "error.validation",
    "degraded",
  ],
};

/**
 * Typed result/error contract for composables and API consumers.
 *
 * @typeParam TData - Data payload type.
 * @typeParam TError - Error payload type.
 * @typeParam TState - State token type.
 */
export interface UiResultStateContract<
  TData,
  TError = unknown,
  TState extends string = UiStateMachineValue,
> {
  /** Current UI state token. */
  state: TState;
  /** Last known data payload. */
  data: TData | null | undefined;
  /** Last known error payload. */
  error: TError | null;
}

/**
 * Machine descriptor for artifact/document generation.
 */
export interface UiStateMachineSpec {
  /** Contract version identifier. */
  version: "ui-state-machine.v1";
  /** All canonical state tokens. */
  states: readonly UiStateMachineValue[];
  /** Error-state subset. */
  errorStates: readonly UiStateMachineErrorValue[];
  /** Terminal-state subset. */
  terminalStates: readonly UiStateMachineTerminalValue[];
  /** Allowed transitions keyed by source state. */
  transitions: Readonly<Record<UiStateMachineValue, readonly UiStateMachineValue[]>>;
}

/**
 * Canonical machine descriptor consumed by CI/artifact generation.
 */
export const UI_STATE_MACHINE_SPEC: UiStateMachineSpec = {
  version: "ui-state-machine.v1",
  states: UI_STATE_MACHINE_VALUES,
  errorStates: UI_STATE_MACHINE_ERROR_VALUES,
  terminalStates: UI_STATE_MACHINE_TERMINAL_VALUES,
  transitions: UI_STATE_MACHINE_TRANSITIONS,
};
