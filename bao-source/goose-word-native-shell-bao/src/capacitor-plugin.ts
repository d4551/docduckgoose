import { registerPlugin } from "@capacitor/core";
import type { GooseWordServerPlugin } from "./plugin-definitions.ts";

/** Capacitor 7: registerPlugin name must match @CapacitorPlugin / jsName on native side. */
export const GooseWordServer = registerPlugin<GooseWordServerPlugin>("GooseWordServer", {
  web: () => import("./web-plugin-stub.ts").then((m) => new m.GooseWordServerWeb()),
});
