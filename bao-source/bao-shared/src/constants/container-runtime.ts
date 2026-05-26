/**
 * Canonical container-runtime protocol constants.
 *
 * These values are OCI-native and centralized to keep protocol literals in one source of truth.
 *
 * @packageDocumentation
 */

/** Canonical synthetic transport prefix used by this repository for OCI registries. */
export const OCI_REGISTRY_TRANSPORT_PREFIX: "registry://" = "registry://" as const;

/** Canonical Containerfile frontend identifier used by OCI Builder. */
export const OCI_CONTAINERFILE_FRONTEND: "containerfile.v1" = "containerfile.v1" as const;

/** Canonical local input key for the containerfile directory in OCI builds. */
export const OCI_LOCAL_CONTAINERFILE_KEY: "containerfile" = "containerfile" as const;

/** Canonical context-ignore filename recognized by OCI builds. */
export const CONTAINER_IGNORE_FILENAME: ".containerignore" = ".containerignore" as const;

/** Canonical Kubernetes secret type for OCI registry auth config (OCI Distribution standard). */
export const K8S_OCI_REGISTRY_AUTH_SECRET_TYPE: "Opaque" = "Opaque" as const;

/** Canonical Kubernetes secret data key for OCI registry auth config payload (OCI Distribution standard). */
export const K8S_OCI_REGISTRY_AUTH_SECRET_DATA_KEY: "oci-registry-auth.json" =
  "oci-registry-auth.json" as const;

/** Canonical OCI multi-arch index media type. */
export const OCI_IMAGE_INDEX_MEDIA_TYPE: "application/vnd.oci.image.index.v1+json" =
  "application/vnd.oci.image.index.v1+json" as const;

/** Canonical OCI image manifest media type. */
export const OCI_IMAGE_MANIFEST_MEDIA_TYPE: "application/vnd.oci.image.manifest.v1+json" =
  "application/vnd.oci.image.manifest.v1+json" as const;

/** Canonical environment variable key for OCI auth config directory discovery (OCI Distribution standard). */
export const OCI_AUTH_CONFIG_DIRECTORY_ENV_KEY: "OCI_AUTH_CONFIG_DIR" =
  "OCI_AUTH_CONFIG_DIR" as const;
