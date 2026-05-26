/** Env key for cross-peer federation HMAC bearer minting/verification. */
export const BAO_FEDERATION_HMAC_SECRET_ENV = "BAO_FEDERATION_HMAC_SECRET";

/**
 * Local-dev-only shared secret so forge/registry/runtime/gateway can pull peer
 * contribution snapshots without per-developer secret generation. Production
 * must set `BAO_FEDERATION_HMAC_SECRET` explicitly — never rely on this default.
 */
export const BAO_DEFAULT_LOCAL_FEDERATION_HMAC_SECRET =
  "bao-local-dev-federation-hmac-7c9e2a1f4b6d8e0a3f5c7b9d1e3a5c7f";
