/**
 * Canonical service and BunBuddy port resolution — SSOT for env overrides and defaults.
 *
 * @packageDocumentation
 */

import { BIND_ALL_IPV4 } from "@baohaus/bao-constants/loopback-hosts";
import defaultPorts from "./default-ports.json";
import { readEnvStringOrNull } from "./env.ts";

export type BunBuddyEnvConfig = {
  readonly kind: string;
  readonly hostEnv: string;
  readonly portEnv: string;
  readonly defaultHost: string;
  readonly defaultPort: number;
};

export const DEFAULT_PORTS: Readonly<typeof defaultPorts> = defaultPorts;

const BUNBUDDY_ENV_CONFIG: Readonly<Record<string, BunBuddyEnvConfig>> = {
  basler: {
    kind: "basler",
    hostEnv: "BASLER_BUNBUDDY_HOST",
    portEnv: "BASLER_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.basler,
  },
  usb: {
    kind: "usb",
    hostEnv: "USB_BUNBUDDY_HOST",
    portEnv: "USB_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.usb,
  },
  ble: {
    kind: "ble",
    hostEnv: "BLE_BUNBUDDY_HOST",
    portEnv: "BLE_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.ble,
  },
  lighting: {
    kind: "lighting",
    hostEnv: "LIGHTING_BUNBUDDY_HOST",
    portEnv: "LIGHTING_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.lighting,
  },
  printer: {
    kind: "printer",
    hostEnv: "PRINTER_BUNBUDDY_HOST",
    portEnv: "PRINTER_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.printer,
  },
  industrial: {
    kind: "industrial",
    hostEnv: "INDUSTRIAL_BUNBUDDY_HOST",
    portEnv: "INDUSTRIAL_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.industrial,
  },
  iot: {
    kind: "iot",
    hostEnv: "IOT_BUNBUDDY_HOST",
    portEnv: "IOT_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.iot,
  },
  scanner: {
    kind: "scanner",
    hostEnv: "SCANNER_BUNBUDDY_HOST",
    portEnv: "SCANNER_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.scanner,
  },
  drone: {
    kind: "drone",
    hostEnv: "DRONE_BUNBUDDY_HOST",
    portEnv: "DRONE_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.drone,
  },
  robotics: {
    kind: "robotics",
    hostEnv: "ROBOTICS_BUNBUDDY_HOST",
    portEnv: "ROBOTICS_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.robotics,
  },
  perception: {
    kind: "perception",
    hostEnv: "PERCEPTION_BUNBUDDY_HOST",
    portEnv: "PERCEPTION_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.perception,
  },
  rpa: {
    kind: "rpa",
    hostEnv: "RPA_BUNBUDDY_HOST",
    portEnv: "RPA_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.rpa,
  },
  vision: {
    kind: "vision",
    hostEnv: "VISION_BUNBUDDY_HOST",
    portEnv: "VISION_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.vision,
  },
  gaussian: {
    kind: "gaussian",
    hostEnv: "GAUSSIAN_BUNBUDDY_HOST",
    portEnv: "GAUSSIAN_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.gaussian,
  },
  scoutdumpling: {
    kind: "scoutdumpling",
    hostEnv: "SCOUTDUMPLING_BUNBUDDY_HOST",
    portEnv: "SCOUTDUMPLING_BUNBUDDY_PORT",
    defaultHost: BIND_ALL_IPV4,
    defaultPort: DEFAULT_PORTS.scoutdumpling,
  },
};

const AUXILIARY_PORT_ENV_KEYS: Readonly<Record<string, readonly string[]>> = {
  dimsum: ["DIMSUM_PORT"],
  dicomPort: ["DIMSUM_DICOM_PORT", "DICOM_PORT"],
};

function readConfiguredPort(envKeys: readonly string[]): number | null {
  for (const envKey of envKeys) {
    const rawValue = readEnvStringOrNull(envKey);
    if (!rawValue) {
      continue;
    }
    const parsed = Number(rawValue);
    if (Number.isFinite(parsed) && parsed > 0) {
      return Math.trunc(parsed);
    }
  }
  return null;
}

export function getBunBuddyEnvConfig(kind: string): BunBuddyEnvConfig {
  return (
    BUNBUDDY_ENV_CONFIG[kind] ?? {
      kind,
      hostEnv: `${kind.toUpperCase()}_BUNBUDDY_HOST`,
      portEnv: `${kind.toUpperCase()}_BUNBUDDY_PORT`,
      defaultHost: BIND_ALL_IPV4,
      defaultPort: 3000,
    }
  );
}

export function getPortFromEnv(kind: string): number | null {
  const envConfig = BUNBUDDY_ENV_CONFIG[kind];
  if (envConfig) {
    return readConfiguredPort([envConfig.portEnv, "BUNBUDDY_PORT"]);
  }

  const auxiliaryEnvKeys = AUXILIARY_PORT_ENV_KEYS[kind];
  if (auxiliaryEnvKeys) {
    return readConfiguredPort(auxiliaryEnvKeys);
  }

  const inferredPortEnv = `${kind.toUpperCase()}_BUNBUDDY_PORT`;
  return readConfiguredPort([inferredPortEnv, "BUNBUDDY_PORT"]);
}

export function requireDefaultPort(kind: string): number {
  const envConfig = BUNBUDDY_ENV_CONFIG[kind];
  if (envConfig) {
    return envConfig.defaultPort;
  }

  const defaultPort = DEFAULT_PORTS[kind as keyof typeof DEFAULT_PORTS];
  if (typeof defaultPort === "number" && Number.isFinite(defaultPort)) {
    return defaultPort;
  }

  throw new Error(`Missing default port for service "${kind}"`);
}

export function getDefaultPort(kind: string): number | null {
  const envConfig = BUNBUDDY_ENV_CONFIG[kind];
  if (envConfig) {
    return envConfig.defaultPort;
  }

  const defaultPort = DEFAULT_PORTS[kind as keyof typeof DEFAULT_PORTS];
  return typeof defaultPort === "number" && Number.isFinite(defaultPort) ? defaultPort : null;
}
