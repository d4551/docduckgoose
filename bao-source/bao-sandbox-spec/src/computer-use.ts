/**
 * Computer-use sandbox contract.
 *
 * This submodule owns the lifecycle, viewport, input, frame, and artifact
 * shapes shared by Forge, .bao Registry, and BaoRuntime. Runtime code drives
 * these contracts through the sandbox manager and artifact storage surfaces.
 *
 * @module @baohaus/bao-sandbox-spec/computer-use
 */

import {
  AGENT_ARTIFACT_OWNER_SURFACES,
  type AgentArtifactOwnerSurface,
  isAgentArtifactOwnerSurface,
} from "@baohaus/bao-constants/agent-artifact-owner-surfaces";
import {
  BAO_SANDBOX_INTENT,
  BAO_SANDBOX_NET_MODE,
  BAO_SANDBOX_TIER,
  type BaoSandboxManifest,
  type BaoSandboxNet,
} from "./schema.ts";

export const COMPUTER_USE_SESSION_PHASE = {
  queued: "queued",
  provisioning: "provisioning",
  running: "running",
  paused: "paused",
  ended: "ended",
  failed: "failed",
} satisfies Record<string, string>;
export type ComputerUseSessionPhase =
  (typeof COMPUTER_USE_SESSION_PHASE)[keyof typeof COMPUTER_USE_SESSION_PHASE];

export const COMPUTER_USE_INPUT_KIND = {
  key: "key",
  text: "text",
  mouse: "mouse",
  resize: "resize",
  navigate: "navigate",
  capture: "capture",
} satisfies Record<string, string>;
export type ComputerUseInputKind =
  (typeof COMPUTER_USE_INPUT_KIND)[keyof typeof COMPUTER_USE_INPUT_KIND];

export const COMPUTER_USE_ARTIFACT_KIND = {
  screenshot: "screenshot",
  console: "console",
  network: "network",
  trace: "trace",
  generatedFile: "generated-file",
} satisfies Record<string, string>;
export type ComputerUseArtifactKind =
  (typeof COMPUTER_USE_ARTIFACT_KIND)[keyof typeof COMPUTER_USE_ARTIFACT_KIND];

export const COMPUTER_USE_OWNER_SURFACES = AGENT_ARTIFACT_OWNER_SURFACES;
export type ComputerUseOwnerSurface = AgentArtifactOwnerSurface;

export function isComputerUseOwnerSurface(
  value: string | null | undefined,
): value is ComputerUseOwnerSurface {
  return isAgentArtifactOwnerSurface(value);
}

export interface ComputerUseViewport {
  readonly width: number;
  readonly height: number;
  readonly deviceScaleFactor: number;
}

export interface ComputerUseFrame {
  readonly frameId: string;
  readonly sessionId: string;
  readonly viewport: ComputerUseViewport;
  readonly capturedAt: string;
  readonly artifactId: string;
  readonly downloadPath: string;
  readonly sizeBytes: number;
}

export interface ComputerUseArtifact {
  readonly artifactId: string;
  readonly kind: ComputerUseArtifactKind;
  readonly label: string;
  readonly downloadPath: string;
  readonly createdAt: string;
  readonly sizeBytes: number;
}

/** Session activity entry for the shared state-timeline partial in HTML shells. */
export interface ComputerUseSessionActivityEntry {
  readonly state: string;
  readonly at: string;
  readonly reason: string | null;
}

export interface ComputerUseSession {
  readonly id: string;
  readonly sandboxSessionId: string;
  readonly phase: ComputerUseSessionPhase;
  readonly targetUrl: string;
  readonly ownerSurface: ComputerUseOwnerSurface;
  readonly viewport: ComputerUseViewport;
  readonly startedAt: string;
  readonly endedAt?: string;
  readonly latestFrame?: ComputerUseFrame;
  readonly artifacts: readonly ComputerUseArtifact[];
  readonly activityLog: readonly ComputerUseSessionActivityEntry[];
}

export interface ComputerUseStartRequest {
  readonly targetUrl: string;
  readonly ownerSurface: ComputerUseSession["ownerSurface"];
  readonly viewport?: Partial<ComputerUseViewport>;
  readonly fullPage?: boolean;
}

export interface ComputerUseInputEvent {
  readonly kind: ComputerUseInputKind;
  readonly sessionId: string;
  readonly issuedAt: string;
  readonly x?: number;
  readonly y?: number;
  readonly button?: "left" | "middle" | "right";
  readonly key?: string;
  readonly text?: string;
  readonly url?: string;
  readonly viewport?: ComputerUseViewport;
}

export const COMPUTER_USE_BROWSER_PACKAGE_ID = "browser-bao";
export const COMPUTER_USE_BROWSER_PACKAGE_NAME = "@baohaus/browser-bao";
export const COMPUTER_USE_AGENT_ARTIFACT_PACKAGE_ID = "agent-artifact-bao";
export const COMPUTER_USE_SCREENSHOT_PATH = "/tmp/bao-computer-use/frame.png";
export const COMPUTER_USE_RUNNER_PATH = "/payload/shared/dist/cli.js";

const DEFAULT_VIEWPORT: ComputerUseViewport = {
  width: 1280,
  height: 720,
  deviceScaleFactor: 1,
};

function normalizeViewport(input: Partial<ComputerUseViewport> | undefined): ComputerUseViewport {
  return {
    width: input?.width ?? DEFAULT_VIEWPORT.width,
    height: input?.height ?? DEFAULT_VIEWPORT.height,
    deviceScaleFactor: input?.deviceScaleFactor ?? DEFAULT_VIEWPORT.deviceScaleFactor,
  };
}

function netForTargetUrl(targetUrl: string): BaoSandboxNet {
  const url = new URL(targetUrl);
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1") {
    return { mode: BAO_SANDBOX_NET_MODE.loopback };
  }
  const port =
    url.port.length > 0 ? Number.parseInt(url.port, 10) : url.protocol === "https:" ? 443 : 80;
  return {
    mode: BAO_SANDBOX_NET_MODE.egressAllowlist,
    egress: [{ host: url.hostname, port, protocol: "tcp" }],
  };
}

export function buildComputerUseSandboxManifest(input: {
  readonly targetUrl: string;
  readonly viewport?: Partial<ComputerUseViewport>;
}): BaoSandboxManifest {
  const viewport = normalizeViewport(input.viewport);
  return {
    tier: BAO_SANDBOX_TIER.b2,
    intent: BAO_SANDBOX_INTENT.shell,
    rootfs: { base: COMPUTER_USE_BROWSER_PACKAGE_NAME },
    mounts: [],
    net: netForTargetUrl(input.targetUrl),
    syscalls: { default: "allow" },
    resources: {
      cpuMilli: 1000,
      memMiB: 1024,
      pidLimit: 128,
      wallMs: 120000,
    },
    hostname: "bao-computer-use",
    env: [
      { name: "BAO_COMPUTER_USE_VIEWPORT_WIDTH", value: viewport.width.toString() },
      { name: "BAO_COMPUTER_USE_VIEWPORT_HEIGHT", value: viewport.height.toString() },
      {
        name: "BAO_COMPUTER_USE_DEVICE_SCALE_FACTOR",
        value: viewport.deviceScaleFactor.toString(),
      },
    ],
    entrypoint: COMPUTER_USE_RUNNER_PATH,
  };
}

export function buildComputerUseRunnerArgv(input: {
  readonly targetUrl: string;
  readonly viewport?: Partial<ComputerUseViewport>;
  readonly fullPage?: boolean;
  readonly outputPath?: string;
}): readonly string[] {
  const viewport = normalizeViewport(input.viewport);
  return [
    "bun",
    COMPUTER_USE_RUNNER_PATH,
    "screenshot",
    "--url",
    input.targetUrl,
    "--output",
    input.outputPath ?? COMPUTER_USE_SCREENSHOT_PATH,
    "--width",
    viewport.width.toString(),
    "--height",
    viewport.height.toString(),
    "--scale",
    viewport.deviceScaleFactor.toString(),
    ...(input.fullPage === true ? ["--full-page"] : []),
  ];
}

export function computerUseViewport(input?: Partial<ComputerUseViewport>): ComputerUseViewport {
  return normalizeViewport(input);
}
