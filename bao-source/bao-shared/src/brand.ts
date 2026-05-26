/**
 * Shared brand-context contract used by SSR shells and page metadata.
 *
 * Provides a typed brand context, default light/dark theme tokens, and an
 * AsyncLocalStorage-backed scope so request handlers can resolve the active
 * brand without a mutable global.
 *
 */

import { AsyncLocalStorage } from "node:async_hooks";

import { t } from "./i18n";

/** Shared brand-theme token contract. */
export type BrandThemeTokens = Readonly<{
  primary: string;
  primaryContent: string;
  secondary: string;
  secondaryContent: string;
  accent: string;
  accentContent: string;
  neutral: string;
  neutralContent: string;
  base100: string;
  base200: string;
  base300: string;
  baseContent: string;
  info: string;
  infoContent: string;
  success: string;
  successContent: string;
  warning: string;
  warningContent: string;
  error: string;
  errorContent: string;
}>;

/** Shared brand context consumed by SSR shells and page metadata. */
export type BrandContext = Readonly<{
  profileId: string;
  partyId: string | null;
  displayName: string;
  appTagline: string;
  logoUrl: string;
  logoSquareUrl: string;
  faviconUrl: string;
  metaTitle: string;
  metaDescription: string;
  activeHostname: string;
  primaryHostname: string;
  requestOrigin: string;
  status: string;
  isDefault: boolean;
  lightTheme: BrandThemeTokens;
  darkTheme: BrandThemeTokens;
}>;

export const BRAND_THEME_TOKEN_FIELDS = [
  "primary",
  "primaryContent",
  "secondary",
  "secondaryContent",
  "accent",
  "accentContent",
  "neutral",
  "neutralContent",
  "base100",
  "base200",
  "base300",
  "baseContent",
  "info",
  "infoContent",
  "success",
  "successContent",
  "warning",
  "warningContent",
  "error",
  "errorContent",
] as const;

export type BrandThemeTokenField = (typeof BRAND_THEME_TOKEN_FIELDS)[number];

export const DEFAULT_BRAND_PROFILE_ID = "default-brand-profile";

const brandContextStorage = new AsyncLocalStorage<BrandContext>();
let brandContextFallbackResolver: (() => BrandContext) | null = null;

export const DEFAULT_LIGHT_THEME: BrandThemeTokens = {
  primary: "#002d5f",
  primaryContent: "#ffffff",
  secondary: "#003523",
  secondaryContent: "#d0dda4",
  accent: "#79b1e0",
  accentContent: "#002d5f",
  neutral: "#1a2b3d",
  neutralContent: "#e8eff6",
  base100: "#ffffff",
  base200: "#f0f5fa",
  base300: "#d8e4ef",
  baseContent: "#1a2b3d",
  info: "#6caddf",
  infoContent: "#002d5f",
  success: "#003523",
  successContent: "#d0dda4",
  warning: "#762f0b",
  warningContent: "#f2d8a5",
  error: "#4c2432",
  errorContent: "#e7b0b8",
};

export const DEFAULT_DARK_THEME: BrandThemeTokens = {
  primary: "#79b1e0",
  primaryContent: "#002d5f",
  secondary: "#9bb95f",
  secondaryContent: "#003523",
  accent: "#b5d5f0",
  accentContent: "#002d5f",
  neutral: "#0c1a2b",
  neutralContent: "#b5d5f0",
  base100: "#0d1f33",
  base200: "#081525",
  base300: "#1a3352",
  baseContent: "#e8eff6",
  info: "#6caddf",
  infoContent: "#081525",
  success: "#9bb95f",
  successContent: "#003523",
  warning: "#e4a143",
  warningContent: "#5e2508",
  error: "#c07090",
  errorContent: "#ffffff",
};

export type DefaultBrandProfile = Readonly<{
  displayName: string;
  appTagline: string;
  logoUrl: string;
  logoSquareUrl: string;
  faviconUrl: string;
  metaTitle: string;
  metaDescription: string;
  lightTheme: BrandThemeTokens;
  darkTheme: BrandThemeTokens;
}>;

export const buildDefaultBrandProfile = (): DefaultBrandProfile => ({
  displayName: t("app.name"),
  appTagline: t("app.tagline"),
  logoUrl: "/static/images/platform-logo.svg",
  logoSquareUrl: "/static/images/platform-logo.png",
  faviconUrl: "/static/images/platform-logo.png",
  metaTitle: t("app.name"),
  metaDescription: t("public.meta.description"),
  lightTheme: DEFAULT_LIGHT_THEME,
  darkTheme: DEFAULT_DARK_THEME,
});

export const buildDefaultBrandContext = (baseUrl: string, requestOrigin?: string): BrandContext => {
  const defaultBrandProfile = buildDefaultBrandProfile();
  const primaryHostname = new URL(baseUrl).hostname.toLowerCase();

  return {
    profileId: DEFAULT_BRAND_PROFILE_ID,
    partyId: null,
    displayName: defaultBrandProfile.displayName,
    appTagline: defaultBrandProfile.appTagline,
    logoUrl: defaultBrandProfile.logoUrl,
    logoSquareUrl: defaultBrandProfile.logoSquareUrl,
    faviconUrl: defaultBrandProfile.faviconUrl,
    metaTitle: defaultBrandProfile.metaTitle,
    metaDescription: defaultBrandProfile.metaDescription,
    activeHostname: primaryHostname,
    primaryHostname,
    requestOrigin: requestOrigin ?? baseUrl,
    status: "ACTIVE",
    isDefault: true,
    lightTheme: defaultBrandProfile.lightTheme,
    darkTheme: defaultBrandProfile.darkTheme,
  };
};

export const setCurrentBrandContext = (brandContext: BrandContext): void => {
  brandContextStorage.enterWith(brandContext);
};

export const clearCurrentBrandContext = (): void => {
  brandContextStorage.disable();
};

export const runWithBrandContext = <T>(brandContext: BrandContext, callback: () => T): T =>
  brandContextStorage.run(brandContext, callback);

export const peekCurrentBrandContext = (): BrandContext | null =>
  brandContextStorage.getStore() ?? null;

export const configureBrandContextFallbackResolver = (
  resolver: (() => BrandContext) | null,
): void => {
  brandContextFallbackResolver = resolver;
};

export const getCurrentBrandContext = (): BrandContext => {
  const brandContext = peekCurrentBrandContext();
  if (brandContext !== null) {
    return brandContext;
  }

  const fallbackBrandContext = brandContextFallbackResolver?.();
  if (fallbackBrandContext !== undefined) {
    return fallbackBrandContext;
  }

  throw new Error("Brand context is not configured for the current execution scope.");
};

export const resolvePrimaryOrigin = (
  brandContext: Pick<BrandContext, "primaryHostname" | "requestOrigin">,
): string => {
  if (!URL.canParse(brandContext.requestOrigin)) {
    return `https://${brandContext.primaryHostname}`;
  }

  const requestOrigin = new URL(brandContext.requestOrigin);
  const port = requestOrigin.port;
  const includePort =
    port.length > 0 &&
    !(
      (requestOrigin.protocol === "http:" && port === "80") ||
      (requestOrigin.protocol === "https:" && port === "443")
    );

  return `${requestOrigin.protocol}//${brandContext.primaryHostname}${includePort ? `:${port}` : ""}`;
};
