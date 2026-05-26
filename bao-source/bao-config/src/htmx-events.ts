import { safeJsonParse } from "@baohaus/bao-utils/safe-json-parse";

/**
 * Canonical HTMX trigger event names and header helpers.
 */
export const HTMX_TRIGGER_EVENTS: {
  readonly happydumplingIntegrationsReady: "happydumpling:integrations-ready";
  readonly happydumplingIntegrationsEmpty: "happydumpling:integrations-empty";
  readonly happydumplingOwnershipReady: "happydumpling:ownership-ready";
  readonly happydumplingOwnershipEmpty: "happydumpling:ownership-empty";
  readonly happydumplingOwnershipError: "happydumpling:ownership-error";
} = {
  happydumplingIntegrationsReady: "happydumpling:integrations-ready",
  happydumplingIntegrationsEmpty: "happydumpling:integrations-empty",
  happydumplingOwnershipReady: "happydumpling:ownership-ready",
  happydumplingOwnershipEmpty: "happydumpling:ownership-empty",
  happydumplingOwnershipError: "happydumpling:ownership-error",
} as const;

/**
 * Allowed HTMX trigger header keys.
 */
export type HtmxTriggerHeaderKey = "HX-Trigger" | "HX-Trigger-After-Swap";

/**
 * Append an HTMX trigger payload into a mutable header map.
 *
 * @param headers - Mutable header object.
 * @param key - Trigger header key.
 * @param payload - Trigger payload.
 */
export function appendHtmxTriggerHeader(
  headers: Record<string, string | number | undefined>,
  key: HtmxTriggerHeaderKey,
  payload: Record<string, unknown>,
): void {
  const existingRaw = headers[key];
  if (!existingRaw) {
    headers[key] = JSON.stringify(payload);
    return;
  }
  const parsed = safeJsonParse<Record<string, unknown>>(String(existingRaw), null);
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    headers[key] = JSON.stringify({ ...parsed, ...payload });
    return;
  }
  headers[key] = JSON.stringify(payload);
}
