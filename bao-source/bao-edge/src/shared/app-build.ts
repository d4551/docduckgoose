import {
  type DesktopBuildVariant,
  isSupportedDesktopBuildVariant,
} from "../contracts/flow-contracts";

const DESKTOP_OS_MAP = {
  darwin: "darwin",
  linux: "linux",
  win32: "windows",
} as const;

const DESKTOP_ARCH_MAP = {
  x64: "x64",
  arm64: "arm64",
  amd64: "x64",
  aarch64: "arm64",
} as const;

function normalizeDesktopPlatform(hostPlatform: string): string | null {
  return DESKTOP_OS_MAP[hostPlatform as keyof typeof DESKTOP_OS_MAP] ?? null;
}

function normalizeDesktopArchitecture(hostArchitecture: string): string | null {
  return DESKTOP_ARCH_MAP[hostArchitecture as keyof typeof DESKTOP_ARCH_MAP] ?? null;
}

/** Resolve the canonical desktop build variant for the active host or return `null` when unsupported. */
export function resolveDefaultDesktopBuildVariant(
  hostPlatform: string,
  hostArchitecture: string,
): DesktopBuildVariant | null {
  const normalizedOs = normalizeDesktopPlatform(hostPlatform);
  const normalizedArch = normalizeDesktopArchitecture(hostArchitecture);
  if (!(normalizedOs && normalizedArch)) {
    return null;
  }
  const variant = `${normalizedOs}-${normalizedArch}`;
  return isSupportedDesktopBuildVariant(variant) ? variant : null;
}
