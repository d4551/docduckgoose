/**
 * Canonical Better Auth route definitions.
 *
 * Shared by runtime route registration, OpenAPI decoration, and capability
 * contract binding so auth endpoint ownership cannot drift.
 *
 * @shared/constants/auth-routes
 */

/**
 * Supported HTTP verbs for Better Auth routes.
 */
export type AuthRouteMethod = "get" | "post";

/**
 * Better Auth route definition.
 */
export interface AuthRouteDefinition {
  /** HTTP method used by the route. */
  method: AuthRouteMethod;
  /** Relative route path (prefix applied externally). */
  path: string;
}

/**
 * Stable list of Better Auth routes that must remain consistent between
 * contract typing and runtime routing.
 */
export const AUTH_ROUTE_DEFINITIONS: readonly AuthRouteDefinition[] = [
  { method: "get", path: "/.well-known/openid-configuration" },
  { method: "get", path: "/jwks" },
  { method: "get", path: "/oauth2/authorize" },
  { method: "post", path: "/oauth2/token" },
  { method: "get", path: "/oauth2/userinfo" },
  { method: "post", path: "/sign-in/email" },
  { method: "post", path: "/sign-up/email" },
  { method: "post", path: "/request-password-reset" },
  { method: "post", path: "/reset-password" },
  { method: "get", path: "/reset-password/:token" },
  { method: "get", path: "/verify-email" },
  { method: "post", path: "/send-verification-email" },
  { method: "get", path: "/get-session" },
  { method: "post", path: "/get-session" },
  { method: "post", path: "/update-session" },
  { method: "get", path: "/list-sessions" },
  { method: "post", path: "/revoke-other-sessions" },
  { method: "post", path: "/revoke-session" },
  { method: "post", path: "/revoke-sessions" },
  { method: "post", path: "/sign-out" },
  { method: "post", path: "/change-email" },
  { method: "post", path: "/change-password" },
  { method: "post", path: "/verify-password" },
  { method: "post", path: "/update-user" },
  { method: "get", path: "/oauth2/client/:id" },
  { method: "post", path: "/oauth2/register" },
  { method: "post", path: "/oauth2/consent" },
  { method: "post", path: "/sign-in/sso" },
  { method: "get", path: "/callback/:id" },
  { method: "post", path: "/callback/:id" },
  { method: "get", path: "/sso/callback/:providerId" },
  { method: "post", path: "/sso/register" },
] as const satisfies readonly AuthRouteDefinition[];
