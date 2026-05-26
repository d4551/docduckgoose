import { gooseWordBaoPluginsDir } from "../config/paths.ts";
import { gooseWordContributionSurfaces } from "./contribution-surfaces.ts";

export const gooseWordInstallHandlerRegistry = Object.freeze({
  appId: "goose-word",
  surfaces: gooseWordContributionSurfaces,
  driverRegistryDir: `${gooseWordBaoPluginsDir}/drivers`,
  mode: "copy-first-local-mvp",
});
