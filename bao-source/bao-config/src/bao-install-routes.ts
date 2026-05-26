export const BAO_INSTALL_API_PATHS = {
  PREFIX: "/api/v1/bao",
  REGISTRY_INSTALL: "/api/v1/install",
  VALIDATE: "/validate",
  INSTALL: "/install",
  STATUS: "/:id/status",
  MOUNT: "/mount",
} as const;

export type BaoInstallApiPathKey = keyof typeof BAO_INSTALL_API_PATHS;
export type BaoInstallApiPath = (typeof BAO_INSTALL_API_PATHS)[BaoInstallApiPathKey];
