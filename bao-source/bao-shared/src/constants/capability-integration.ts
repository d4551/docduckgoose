/**
 * Capability integration constants.
 *
 * Single source of truth for capability domains, API paths, and cross-capability
 * collaboration chains. Used by AI, XR, USD, hardware, drivers, MCP, RPA,
 * libraries, and plugins for consistent capability resolution.
 *
 * Edges and roles are config-driven at runtime; these constants provide
 * capability IDs and path mappings for discovery and tooling.
 *
 * @shared/constants/capability-integration
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";

/**
 * Capability domain identifiers for AI/XR/USD/hardware/drivers/MCP/RPA integration.
 */
export const CAPABILITY_DOMAINS: {
  readonly ai: "ai";
  readonly xr: "xr";
  readonly usd: "usd";
  readonly hardware: "hardware";
  readonly drivers: "drivers";
  readonly mcp: "mcp";
  readonly rpa: "rpa";
  readonly pipelines: "pipelines";
  readonly libraries: "libraries";
  readonly vision: "vision";
  readonly perception: "perception";
  readonly three: "three";
  readonly gaussian: "gaussian";
  readonly drone: "drone";
  readonly robotics: "robotics";
  readonly scanner: "scanner";
  readonly imager: "imager";
} = {
  ai: "ai",
  xr: "xr",
  usd: "usd",
  hardware: "hardware",
  drivers: "drivers",
  mcp: "mcp",
  rpa: "rpa",
  pipelines: "pipelines",
  libraries: "libraries",
  vision: "vision",
  perception: "perception",
  three: "three",
  gaussian: "gaussian",
  drone: "drone",
  robotics: "robotics",
  scanner: "scanner",
  imager: "imager",
} as const;

/** Union of all capability domain string literals (e.g. 'ai', 'xr', 'hardware'). */
export type CapabilityDomain = (typeof CAPABILITY_DOMAINS)[keyof typeof CAPABILITY_DOMAINS];

/**
 * API path mapping for each capability domain.
 * Used by MCP resources, RPA tools, chat tools, and pipeline handlers.
 */
export const CAPABILITY_API_PATHS: Record<CapabilityDomain, string> = {
  [CAPABILITY_DOMAINS.ai]: API_PATHS.ai,
  [CAPABILITY_DOMAINS.xr]: API_PATHS.xr,
  [CAPABILITY_DOMAINS.usd]: API_PATHS.usd,
  [CAPABILITY_DOMAINS.hardware]: API_PATHS.hardware,
  [CAPABILITY_DOMAINS.drivers]: API_PATHS.drivers,
  [CAPABILITY_DOMAINS.mcp]: API_PATHS.mcp,
  [CAPABILITY_DOMAINS.rpa]: API_PATHS.rpa,
  [CAPABILITY_DOMAINS.pipelines]: API_PATHS.pipelines,
  [CAPABILITY_DOMAINS.libraries]: API_PATHS.libraries,
  [CAPABILITY_DOMAINS.vision]: API_PATHS.vision,
  [CAPABILITY_DOMAINS.perception]: API_PATHS.perception,
  [CAPABILITY_DOMAINS.three]: API_PATHS.three,
  [CAPABILITY_DOMAINS.gaussian]: API_PATHS.gaussian,
  [CAPABILITY_DOMAINS.drone]: API_PATHS.drone,
  [CAPABILITY_DOMAINS.robotics]: API_PATHS.robotics,
  [CAPABILITY_DOMAINS.scanner]: API_PATHS.scanner,
  [CAPABILITY_DOMAINS.imager]: API_PATHS.imager,
};

/**
 * Cross-capability collaboration chain IDs.
 * Matches config capabilities.graph edges and pipeline definitions.
 * Enables AI/MCP to reason about "ble -> basler -> vision" flows.
 */
export const CAPABILITY_CHAINS: {
  readonly bleBaslerVision: "ble:basler:vision";
  readonly bleScannerVision: "ble:scanner:vision";
  readonly bleImagerVision: "ble:imager:vision";
  readonly baslerVision: "basler:vision";
  readonly scannerVision: "scanner:vision";
  readonly scannerGaussian: "scanner:gaussian";
  readonly usbVision: "usb:vision";
  readonly droneVision: "drone:vision";
  readonly roboticsPerception: "robotics:perception";
} = {
  bleBaslerVision: "ble:basler:vision",
  bleScannerVision: "ble:scanner:vision",
  bleImagerVision: "ble:imager:vision",
  baslerVision: "basler:vision",
  scannerVision: "scanner:vision",
  scannerGaussian: "scanner:gaussian",
  usbVision: "usb:vision",
  droneVision: "drone:vision",
  roboticsPerception: "robotics:perception",
} as const;

/** Union of cross-capability collaboration chain string identifiers (e.g. 'ble:basler:vision'). */
export type CapabilityChainId = (typeof CAPABILITY_CHAINS)[keyof typeof CAPABILITY_CHAINS];

/**
 * Pipeline identifiers mapped to capability chain IDs for AI/MCP/RPA discovery.
 * Enables "bluetooth-imager-vision" pipeline to resolve to "ble:imager:vision" chain.
 *
 * @example AI tool: "I can run the BLE→Imager→Vision pipeline" → resolves chain for routing.
 */
export const PIPELINE_TO_CAPABILITY_CHAIN: Record<string, CapabilityChainId> = {
  "bluetooth-imager-vision": CAPABILITY_CHAINS.bleImagerVision,
  "bluetooth-imager-vision-summary": CAPABILITY_CHAINS.bleImagerVision,
  "ble-basler-vision": CAPABILITY_CHAINS.bleBaslerVision,
  "vision-lightning-train": CAPABILITY_CHAINS.baslerVision,
  "gaussian-pytorch3d": CAPABILITY_CHAINS.scannerGaussian,
  "scanner-gaussian": CAPABILITY_CHAINS.scannerGaussian,
  "drone-perception-robotics": CAPABILITY_CHAINS.roboticsPerception,
} as const;

/**
 * Resolve capability chain ID for a pipeline.
 *
 * @param pipelineId - Pipeline identifier (e.g. bluetooth-imager-vision).
 * @returns Capability chain ID or null when pipeline has no known chain mapping.
 */
export function resolveCapabilityChainForPipeline(pipelineId: string): CapabilityChainId | null {
  return (
    (PIPELINE_TO_CAPABILITY_CHAIN as Record<string, CapabilityChainId | undefined>)[pipelineId] ??
    null
  );
}

/**
 * BunBuddy kinds that participate in capability collaboration.
 * Aligns with BUNBUDDY_KINDS and config capabilities.graph.roles.
 */
export const CAPABILITY_BUNBUDDY_KINDS: readonly [
  "ble",
  "usb",
  "basler",
  "scanner",
  "vision",
  "perception",
  "gaussian",
  "drone",
  "robotics",
  "rpa",
  "lighting",
  "printer",
  "industrial",
  "iot",
] = [
  "ble",
  "usb",
  "basler",
  "scanner",
  "vision",
  "perception",
  "gaussian",
  "drone",
  "robotics",
  "rpa",
  "lighting",
  "printer",
  "industrial",
  "iot",
] as const;
