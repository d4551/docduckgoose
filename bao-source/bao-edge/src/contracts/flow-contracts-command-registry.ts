import type { FlowCommand, FlowCommandSpec } from "./flow-contracts-1";

/** Supported command registry used by parser validation and execution coverage. */
export const SUPPORTED_FLOW_COMMANDS: readonly FlowCommandSpec[] = [
  { type: "launchApp", description: "Launch the target app (no arguments)." },
  { type: "tapOn", description: "Tap by selector target." },
  { type: "inputText", description: "Type a text value into the focused element." },
  { type: "assertVisible", description: "Assert a target is visible on screen." },
  { type: "assertNotVisible", description: "Assert a target is not visible on screen." },
  { type: "assertText", description: "Assert a target's text equals a value." },
  { type: "selectOption", description: "Select an option value for a target." },
  { type: "scroll", description: "Scroll a direction with optional repeat count." },
  { type: "swipe", description: "Swipe gesture with direction and optional distance." },
  { type: "screenshot", description: "Capture a full-screen screenshot artifact." },
  {
    type: "readVisibleState",
    description: "Capture structured visible-state evidence for the current UI.",
  },
  { type: "clipboardRead", description: "Read current clipboard contents." },
  { type: "clipboardWrite", description: "Write value to system clipboard." },
  { type: "windowFocus", description: "Focus desktop window by identifier/title." },
  { type: "hideKeyboard", description: "Dismiss on-screen keyboard." },
  { type: "waitForAnimation", description: "Wait for a duration in milliseconds." },
] as const;

/** Set of supported flow command names used by runtime checks. */
export const SUPPORTED_FLOW_COMMAND_TYPES = SUPPORTED_FLOW_COMMANDS.map(
  ({ type }) => type,
) as readonly FlowCommand["type"][];

/** Runtime command lookup optimized with constant-time membership checks. */
export const SUPPORTED_FLOW_COMMAND_SET: ReadonlySet<string> = new Set(
  SUPPORTED_FLOW_COMMAND_TYPES,
);

/** Convert flow commands to a lookup for constant-time checks. */
export function isFlowCommandType(value: string): value is FlowCommand["type"] {
  return SUPPORTED_FLOW_COMMAND_SET.has(value);
}

/** Command registry snapshot for tooling and docs parity checks. */
export function getSupportedFlowCommandTypes(): readonly FlowCommand["type"][] {
  return SUPPORTED_FLOW_COMMAND_TYPES;
}

/** Command registry snapshot including docs descriptions for registry audits. */
export function getSupportedFlowCommandSpecs(): readonly FlowCommandSpec[] {
  return SUPPORTED_FLOW_COMMANDS;
}
