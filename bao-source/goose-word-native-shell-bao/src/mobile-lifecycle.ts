import type { GooseWordServerPlugin, GooseWordServerStatus } from "./plugin-definitions.ts";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 8080;
const DEFAULT_HEALTH = "/api/health";

export type MobileLifecyclePhase = "idle" | "detecting" | "loading" | "ready" | "error";

export interface MobileLifecycleState {
  readonly phase: MobileLifecyclePhase;
  readonly platform: "android" | "ios" | null;
  readonly server: GooseWordServerStatus | null;
  readonly errorMessage: string | null;
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const pollHealth = async (
  loopbackUrl: string,
  healthPath: string,
  attempts: number,
): Promise<boolean> => {
  const url = `${loopbackUrl.replace(/\/$/, "")}${healthPath}`;
  for (let i = 0; i < attempts; i += 1) {
    const response = await fetch(url, { method: "GET" });
    if (response.status === 200) {
      return true;
    }
    await sleep(250);
  }
  return false;
};

export const createMobileLifecycle = (plugin: GooseWordServerPlugin) => {
  let state: MobileLifecycleState = {
    phase: "idle",
    platform: null,
    server: null,
    errorMessage: null,
  };

  const setState = (next: MobileLifecycleState): MobileLifecycleState => {
    state = next;
    return state;
  };

  return {
    getState: (): MobileLifecycleState => state,
    detect: async (): Promise<MobileLifecycleState> => {
      setState({ ...state, phase: "detecting", errorMessage: null });
      const detected = await plugin.detect();
      return setState({
        phase: "idle",
        platform: detected.platform,
        server: state.server,
        errorMessage: null,
      });
    },
    load: async (options?: {
      dataDir?: string;
      port?: number;
      healthPath?: string;
    }): Promise<MobileLifecycleState> => {
      const detected = await plugin.detect();
      setState({
        phase: "loading",
        platform: detected.platform,
        server: null,
        errorMessage: null,
      });
      const port = options?.port ?? DEFAULT_PORT;
      const healthPath = options?.healthPath ?? DEFAULT_HEALTH;
      const dataDir = options?.dataDir ?? "";
      const started = await plugin.start({ dataDir, port, healthPath });
      const loopbackUrl = `http://${DEFAULT_HOST}:${port}`;
      const healthy = await pollHealth(loopbackUrl, healthPath, 40);
      if (!healthy) {
        return setState({
          phase: "error",
          platform: detected.platform,
          server: started,
          errorMessage: "health probe failed",
        });
      }
      await plugin.injectDeviceContext({
        device: detected.platform,
        formFactor: detected.platform === "ios" ? "phone" : "phone",
        orientation: "portrait-primary",
      });
      return setState({
        phase: "ready",
        platform: detected.platform,
        server: started,
        errorMessage: null,
      });
    },
    unload: async (): Promise<MobileLifecycleState> => {
      await plugin.stop();
      return setState({
        phase: "idle",
        platform: state.platform,
        server: null,
        errorMessage: null,
      });
    },
  };
};
