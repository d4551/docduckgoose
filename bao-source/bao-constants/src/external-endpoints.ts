/**
 * Canonical external endpoint constants.
 *
 * Centralizes third-party and standards URLs so scripts, server, and UI modules
 * reference one typed source of truth.
 *
 * @shared/constants/external-endpoints
 */

const LEADING_SLASHES_RE: RegExp = /^\/+/;
const HTTP_SCHEME = "http:" as const;
const HTTPS_SCHEME = "https:" as const;
const SLASH_SEPARATOR = "//" as const;
const BAOHAUS_SCHEMAS_SEGMENT = "schemas" as const;
const ROBOT_FRAMEWORK_LIBRARY_DOCS_PATH = "/robotframework/latest/libraries" as const;

/** JSON-LD context URL used for SEO metadata. */
export const SCHEMA_ORG_CONTEXT_URL: "https://schema.org" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}schema.org` as const;

/** JSON Schema draft URL used for generated tracing schema artifacts. */
export const JSON_SCHEMA_DRAFT_2020_12_URL: "https://json-schema.org/draft/2020-12/schema" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}json-schema.org/draft/2020-12/schema` as const;

/** GitHub API endpoint used to resolve Bun's latest stable release metadata. */
export const BUN_GITHUB_RELEASES_LATEST_URL: "https://api.github.com/repos/oven-sh/bun/releases/latest" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}api.github.com/repos/oven-sh/bun/releases/latest` as const;

/** Apple plist DTD URL used when emitting macOS plist XML documents. */
export const APPLE_PROPERTY_LIST_DTD_URL: "http://www.apple.com/DTDs/PropertyList-1.0.dtd" =
  `${HTTP_SCHEME}${SLASH_SEPARATOR}www.apple.com/DTDs/PropertyList-1.0.dtd` as const;

/** Base origin for generated Baohaus schemas. */
export const BAOHAUS_SCHEMA_BASE_ORIGIN: "https://baohaus.dev" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}baohaus.dev` as const;

/** Deterministic URI example used when schema format requires URL-like values. */
export const EXAMPLE_RESOURCE_URL: "https://example.com/resource" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}example.com/resource` as const;

/** Hugging Face whoami endpoint used for token verification. */
export const HUGGINGFACE_WHOAMI_V2_URL: "https://huggingface.co/api/whoami-v2" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}huggingface.co/api/whoami-v2` as const;

/** Hugging Face API base URL used for dataset and model metadata calls. */
export const HUGGINGFACE_API_BASE_URL: "https://huggingface.co/api" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}huggingface.co/api` as const;

/** Default npm-compatible registry endpoint for dependency metadata lookups. */
export const NPM_REGISTRY_BASE_URL: "https://registry.npmjs.org" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}registry.npmjs.org` as const;

/** Better Auth official documentation URL for setup guidance. */
export const BETTER_AUTH_DOCS_URL: "https://www.better-auth.com/" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}www.better-auth.com/` as const;

/** Kubernetes schema bundle URL used for offline manifest validation. */
export const K8S_SCHEMA_DEFINITIONS_BUNDLE_URL: "https://kubernetesjsonschema.dev/master-standalone-strict/_definitions.json" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}kubernetesjsonschema.dev/master-standalone-strict/_definitions.json` as const;

/** Default BaoControlPlane k0 installer URL. */
export const DEFAULT_BAO_CONTROL_PLANE_K0_INSTALL_URL: "https://get.k0s.sh" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}get.k0s.sh` as const;

/** Default BaoControlPlane k3 installer URL. */
export const DEFAULT_BAO_CONTROL_PLANE_K3_INSTALL_URL: "https://get.k3s.io" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}get.k3s.io` as const;

/** Default Azure Active Directory authority host for OAuth2 client credentials flow. */
export const AZURE_DEFAULT_AUTHORITY_HOST: "https://login.microsoftonline.com" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}login.microsoftonline.com` as const;

/**
 * UX example host for Azure OpenAI endpoint input in AI settings forms.
 *
 * This is a display string for form examples, not runtime config. Real
 * values come from env/config (e.g. AZURE_OPENAI_ENDPOINT).
 */
export const AZURE_OPENAI_ENDPOINT_EXAMPLE_HOST: "my-resource.openai.azure.com" =
  "my-resource.openai.azure.com" as const;

/**
 * Full UX example URL for Azure OpenAI endpoint input in AI settings forms.
 *
 * Derived from AZURE_OPENAI_ENDPOINT_EXAMPLE_HOST. Real values come from
 * env/config.
 */
export const AZURE_OPENAI_ENDPOINT_EXAMPLE_URL: "https://my-resource.openai.azure.com" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}${AZURE_OPENAI_ENDPOINT_EXAMPLE_HOST}` as const;

/** Base URL for Robot Framework standard library documentation pages. */
export const ROBOT_FRAMEWORK_LIBRARY_DOCS_BASE_URL: "https://robotframework.org/robotframework/latest/libraries" =
  `${HTTPS_SCHEME}${SLASH_SEPARATOR}robotframework.org${ROBOT_FRAMEWORK_LIBRARY_DOCS_PATH}` as const;

/**
 * Resolve the canonical Baohaus schema URL.
 *
 * @param schemaPath - Relative schema path under `/schemas`.
 * @returns Absolute schema URL.
 */
export function resolveBaohausSchemaUrl(schemaPath: string): string {
  const normalizedPath = schemaPath.replace(LEADING_SLASHES_RE, "");
  return `${BAOHAUS_SCHEMA_BASE_ORIGIN}/${BAOHAUS_SCHEMAS_SEGMENT}/${normalizedPath}`;
}

/**
 * Resolve the Robot Framework library documentation URL.
 *
 * @param libraryName - Robot Framework library name.
 * @returns Canonical library documentation URL.
 */
export function resolveRobotFrameworkLibraryDocUrl(libraryName: string): string {
  const trimmedName = libraryName.trim();
  return `${ROBOT_FRAMEWORK_LIBRARY_DOCS_BASE_URL}/${trimmedName}.html`;
}
