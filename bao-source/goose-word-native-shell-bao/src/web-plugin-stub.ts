import { WebPlugin } from "@capacitor/core";
import type { GooseWordServerPlugin, GooseWordServerStatus } from "./plugin-definitions.ts";

export class GooseWordServerWeb extends WebPlugin implements GooseWordServerPlugin {
  async detect(): Promise<{ platform: "android" | "ios" }> {
    return { platform: "android" };
  }

  async start(options: {
    dataDir: string;
    port: number;
    healthPath: string;
  }): Promise<GooseWordServerStatus> {
    return {
      running: false,
      loopbackUrl: `http://127.0.0.1:${options.port}`,
      platform: "android",
    };
  }

  async stop(): Promise<{ stopped: boolean }> {
    return { stopped: true };
  }

  async getStatus(): Promise<GooseWordServerStatus> {
    return { running: false, loopbackUrl: "http://127.0.0.1:8080", platform: "android" };
  }

  async injectDeviceContext(): Promise<{ ok: boolean }> {
    return { ok: true };
  }
}
