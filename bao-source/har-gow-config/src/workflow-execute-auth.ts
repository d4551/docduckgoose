/**
 * Optional Bearer verification for workflow execution (shared signing utilities).
 */

import { timingSafeEqual } from "node:crypto";

export function bearerMatchesSecret(header: string | null, secret: string): boolean {
  if (secret.length === 0 || header === null) {
    return false;
  }
  const prefix = "Bearer ";
  if (!header.startsWith(prefix)) {
    return false;
  }
  const token = header.slice(prefix.length);
  const a = Buffer.from(token, "utf8");
  const b = Buffer.from(secret, "utf8");
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}
