const DEFAULT_BAO_REGISTRY_ORIGIN = "http://localhost:3000";
const HTTP_PROTOCOLS = new Set(["http:", "https:"]);

export interface BaoRegistryConfig {
  readonly origin: URL;
}

export const readBaoRegistryConfig = (): BaoRegistryConfig => {
  const origin = new URL(Bun.env.BAO_REGISTRY_ORIGIN ?? DEFAULT_BAO_REGISTRY_ORIGIN);
  if (!HTTP_PROTOCOLS.has(origin.protocol)) {
    throw new Error("BAO_REGISTRY_ORIGIN must use http or https");
  }
  return { origin };
};
