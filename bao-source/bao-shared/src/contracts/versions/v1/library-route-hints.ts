/**
 * Library route hint registry (v1)
 *
 * Centralizes API route hints associated with capability-adjacent libraries.
 *
 * @shared/contracts/versions/v1/library-route-hints
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";
import { CAPABILITY_CONTRACTS_V1 } from "./capability/registry";

const HTTP_METHOD_PREFIX_RE: RegExp = /^[A-Z]+\s+/;
const LEADING_SLASHES_RE: RegExp = /^\/+/;

/**
 * Convert contract route strings into path-only hints.
 *
 * @param routes - Contract route strings (e.g., "GET /api/v1/foo").
 * @returns Path-only route list.
 */
function toContractPaths(routes: readonly string[]): string[] {
  return routes.map((route) => route.replace(HTTP_METHOD_PREFIX_RE, ""));
}

const CAPABILITY_ROUTE_HINTS_V1 = {
  perception: toContractPaths(CAPABILITY_CONTRACTS_V1.perception.routes),
  gaussian: toContractPaths(CAPABILITY_CONTRACTS_V1.gaussian.routes),
  scanner: toContractPaths(CAPABILITY_CONTRACTS_V1.scanner.routes),
  drone: toContractPaths(CAPABILITY_CONTRACTS_V1.drone.routes),
  robotics: toContractPaths(CAPABILITY_CONTRACTS_V1.robotics.routes),
  rpa: toContractPaths(CAPABILITY_CONTRACTS_V1.rpa.routes),
  vision: toContractPaths(CAPABILITY_CONTRACTS_V1.vision.routes),
  ai: toContractPaths(CAPABILITY_CONTRACTS_V1.ai.routes),
  onnx: toContractPaths(CAPABILITY_CONTRACTS_V1.onnx.routes),
  training: toContractPaths(CAPABILITY_CONTRACTS_V1.training.routes),
  xr: toContractPaths(CAPABILITY_CONTRACTS_V1.xr.routes),
  usd: toContractPaths(CAPABILITY_CONTRACTS_V1.usd.routes),
  three: toContractPaths(CAPABILITY_CONTRACTS_V1.three.routes),
  pipelines: toContractPaths(CAPABILITY_CONTRACTS_V1.pipelines.routes),
  hardware: toContractPaths(CAPABILITY_CONTRACTS_V1.hardware.routes),
  mcp: toContractPaths(CAPABILITY_CONTRACTS_V1.mcp.routes),
} as const;

const AUTH_ROUTE_HINTS_V1: readonly string[] = [
  API_PATHS.authBase,
  API_PATHS.authOk,
  API_PATHS.authDiscovery,
  API_PATHS.authJwks,
  API_PATHS.authSession,
  API_PATHS.ssoStatus,
] as const;

const SPA_ROUTE_HINTS_V1: string[] = [
  API_PATHS.base,
  API_PATHS.health,
  API_PATHS.ready,
  API_PATHS.clientErrors,
  API_PATHS.webVitals,
  API_PATHS.realtimeWs,
];

/**
 * Build an API v1 path from a relative suffix.
 *
 * @param suffix - Relative route suffix without `/api/v1`.
 * @returns Canonical API path.
 */
function buildApiV1Path(suffix: string): string {
  const normalized = suffix.replace(LEADING_SLASHES_RE, "");
  return `${API_PATHS.base}/${normalized}`;
}

const DEVICE_BLUETOOTH_HINTS: readonly string[] = [
  buildApiV1Path("devices/bluetooth"),
  buildApiV1Path("devices/detect"),
];
const BASLER_DEVICE_HINTS: readonly string[] = [
  buildApiV1Path("devices/basler"),
  API_PATHS.devices,
];
const PRINTER_SCAN_HINTS: readonly string[] = [
  buildApiV1Path("printer/scan"),
  buildApiV1Path("printer/scan/barcode"),
];
const LIGHTING_ENUMERATION_HINTS: readonly string[] = [
  buildApiV1Path("lighting/devices"),
  buildApiV1Path("lighting/enumerate"),
];
const PRINTER_PRINT_HINTS: readonly string[] = [
  buildApiV1Path("printer/print/receipt"),
  buildApiV1Path("printer/print/label"),
];
const PRINTER_QR_HINTS: readonly string[] = [
  buildApiV1Path("printer/scan/qr"),
  buildApiV1Path("printer/scan"),
];
const IOT_SENSOR_HINTS: readonly string[] = [
  buildApiV1Path("iot/sensors"),
  buildApiV1Path("iot/outputs"),
];
const INDUSTRIAL_SCAN_HINTS: readonly string[] = [
  buildApiV1Path("industrial/scan"),
  buildApiV1Path("industrial/devices"),
];
const IOT_METRIC_HINTS: readonly string[] = [
  buildApiV1Path("iot/sensors"),
  buildApiV1Path("iot/metrics"),
];
const INDUSTRIAL_METRIC_HINTS: readonly string[] = [
  buildApiV1Path("industrial/devices"),
  buildApiV1Path("industrial/metrics"),
];
const SERIAL_DEVICE_HINTS: readonly string[] = [buildApiV1Path("devices/serial")];
const PRINTER_JOB_HINTS: readonly string[] = [
  buildApiV1Path("printer/print/text"),
  buildApiV1Path("printer/jobs"),
];
const ONVIF_DISCOVERY_HINTS: readonly string[] = [buildApiV1Path("network/discover/onvif")];

/**
 * Library route hints registry (v1).
 */
export const LIBRARY_ROUTE_HINTS_V1: Record<string, readonly string[]> = {
  "@abandonware/noble": DEVICE_BLUETOOTH_HINTS,
  "@anthropic-ai/sdk": CAPABILITY_ROUTE_HINTS_V1.ai,
  "@better-auth/sso": [...AUTH_ROUTE_HINTS_V1],
  "@azure/storage-blob": CAPABILITY_ROUTE_HINTS_V1.usd,
  "@baohaus/openapi-mantou": [API_PATHS.docs],
  "@baohaus/otel-bao": [API_PATHS.metrics],
  "@baohaus/static-bao": [API_PATHS.base],
  "@pylon/camera": BASLER_DEVICE_HINTS,
  "@cohere-ai/cohere-sdk": CAPABILITY_ROUTE_HINTS_V1.ai,
  "@opentelemetry/context-zone": SPA_ROUTE_HINTS_V1,
  "@opentelemetry/exporter-trace-otlp-http": SPA_ROUTE_HINTS_V1,
  "@opentelemetry/instrumentation": SPA_ROUTE_HINTS_V1,
  "@opentelemetry/instrumentation-fetch": SPA_ROUTE_HINTS_V1,
  "@opentelemetry/instrumentation-xml-http-request": SPA_ROUTE_HINTS_V1,
  "@opentelemetry/resources": SPA_ROUTE_HINTS_V1,
  "@opentelemetry/sdk-trace-base": SPA_ROUTE_HINTS_V1,
  "@opentelemetry/sdk-trace-web": SPA_ROUTE_HINTS_V1,
  "@opentelemetry/semantic-conventions": SPA_ROUTE_HINTS_V1,
  "@baohaus/eden-bao": [API_PATHS.base, API_PATHS.health, API_PATHS.ready],
  "@google/generative-ai": CAPABILITY_ROUTE_HINTS_V1.ai,
  "@google/model-viewer": CAPABILITY_ROUTE_HINTS_V1.xr,
  "@huggingface/hub": CAPABILITY_ROUTE_HINTS_V1.ai,
  "@huggingface/inference": CAPABILITY_ROUTE_HINTS_V1.ai,
  "@huggingface/transformers": CAPABILITY_ROUTE_HINTS_V1.ai,
  "@undecaf/zbar-wasm": PRINTER_SCAN_HINTS,
  artnet: LIGHTING_ENUMERATION_HINTS,
  "better-auth": [...AUTH_ROUTE_HINTS_V1],
  "@baohaus/mdns-bao": [API_PATHS.network],
  bleak: CAPABILITY_ROUTE_HINTS_V1.scanner,
  "cohere-ai": CAPABILITY_ROUTE_HINTS_V1.ai,
  daisyui: SPA_ROUTE_HINTS_V1,
  dmx: LIGHTING_ENUMERATION_HINTS,
  elysia: [API_PATHS.base, API_PATHS.health, API_PATHS.ready, API_PATHS.docs],
  escpos: PRINTER_PRINT_HINTS,
  "escpos-usb": PRINTER_PRINT_HINTS,
  gsplat: CAPABILITY_ROUTE_HINTS_V1.gaussian,
  "groq-sdk": CAPABILITY_ROUTE_HINTS_V1.ai,
  jsqr: PRINTER_QR_HINTS,
  "johnny-five": IOT_SENSOR_HINTS,
  jose: [...AUTH_ROUTE_HINTS_V1],
  localforage: [API_PATHS.base, API_PATHS.health, API_PATHS.ready],
  "memvid-sdk": CAPABILITY_ROUTE_HINTS_V1.vision,
  memvid: CAPABILITY_ROUTE_HINTS_V1.vision,
  "@mistralai/mistralai": CAPABILITY_ROUTE_HINTS_V1.ai,
  "@modelcontextprotocol/sdk": CAPABILITY_ROUTE_HINTS_V1.mcp,
  "modbus-serial": INDUSTRIAL_SCAN_HINTS,
  mqtt: IOT_METRIC_HINTS,
  "node-bacnet": INDUSTRIAL_METRIC_HINTS,
  "node-hid": [buildApiV1Path("devices/detect"), API_PATHS.devices],
  prisma: [API_PATHS.storage],
  ardupilot: CAPABILITY_ROUTE_HINTS_V1.drone,
  "px4-autopilot": CAPABILITY_ROUTE_HINTS_V1.drone,
  pytorch3d: CAPABILITY_ROUTE_HINTS_V1.gaussian,
  "@prisma/client": [API_PATHS.storage],
  "pytorch-lightning": CAPABILITY_ROUTE_HINTS_V1.vision,
  "node-mavlink": CAPABILITY_ROUTE_HINTS_V1.drone,
  "node-opcua": INDUSTRIAL_METRIC_HINTS,
  "node-thermal-printer": PRINTER_JOB_HINTS,
  "onnxruntime-node": CAPABILITY_ROUTE_HINTS_V1.onnx,
  "onnxruntime-web": CAPABILITY_ROUTE_HINTS_V1.onnx,
  onnxruntime: CAPABILITY_ROUTE_HINTS_V1.onnx,
  "onnxruntime-gpu": CAPABILITY_ROUTE_HINTS_V1.onnx,
  onnx: CAPABILITY_ROUTE_HINTS_V1.vision,
  onvif: ONVIF_DISCOVERY_HINTS,
  ollama: CAPABILITY_ROUTE_HINTS_V1.ai,
  "openid-client": [...AUTH_ROUTE_HINTS_V1],
  open3d: CAPABILITY_ROUTE_HINTS_V1.scanner,
  openai: CAPABILITY_ROUTE_HINTS_V1.ai,
  "opencv-python": CAPABILITY_ROUTE_HINTS_V1.perception,
  "opencv-python-headless": CAPABILITY_ROUTE_HINTS_V1.scanner,
  pypylon: BASLER_DEVICE_HINTS,
  pyvips: CAPABILITY_ROUTE_HINTS_V1.vision,
  ramalama: CAPABILITY_ROUTE_HINTS_V1.ai,
  rclnodejs: CAPABILITY_ROUTE_HINTS_V1.robotics,
  "ros-navigation2": CAPABILITY_ROUTE_HINTS_V1.robotics,
  "ros-perception": CAPABILITY_ROUTE_HINTS_V1.perception,
  "rpi-ws281x-native": LIGHTING_ENUMERATION_HINTS,
  serialport: SERIAL_DEVICE_HINTS,
  sharp: CAPABILITY_ROUTE_HINTS_V1.three,
  "segmentation-models-pytorch": CAPABILITY_ROUTE_HINTS_V1.vision,
  systeminformation: [API_PATHS.hardware, API_PATHS.devices],
  htmx: SPA_ROUTE_HINTS_V1,
  tailwindcss: SPA_ROUTE_HINTS_V1,
  "grad-cam": CAPABILITY_ROUTE_HINTS_V1.vision,
  timm: CAPABILITY_ROUTE_HINTS_V1.vision,
  three: CAPABILITY_ROUTE_HINTS_V1.three,
  torch: CAPABILITY_ROUTE_HINTS_V1.vision,
  torchmetrics: CAPABILITY_ROUTE_HINTS_V1.vision,
  torchvision: CAPABILITY_ROUTE_HINTS_V1.vision,
  "troika-three-text": CAPABILITY_ROUTE_HINTS_V1.three,
  trimesh: CAPABILITY_ROUTE_HINTS_V1.scanner,
  usb: [buildApiV1Path("devices/detect"), API_PATHS.devices],
  "vit-pytorch": CAPABILITY_ROUTE_HINTS_V1.vision,
  "web-vitals": [API_PATHS.webVitals, API_PATHS.clientErrors],
  "weaviate-client": CAPABILITY_ROUTE_HINTS_V1.ai,
};

/**
 * Resolve library route hints for a package name.
 *
 * @param name - Canonical library name.
 * @returns Route hints for the library.
 */
export function getLibraryRouteHintsV1(name: string): readonly string[] {
  return LIBRARY_ROUTE_HINTS_V1[name] ?? [];
}
