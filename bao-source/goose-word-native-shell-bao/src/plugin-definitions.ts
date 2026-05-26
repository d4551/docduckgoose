export interface GooseWordServerStatus {
  readonly running: boolean;
  readonly loopbackUrl: string;
  readonly platform: "android" | "ios";
  readonly pid?: number;
}

export interface GooseWordServerPlugin {
  detect(): Promise<{ platform: "android" | "ios" }>;
  start(options: {
    dataDir: string;
    port: number;
    healthPath: string;
  }): Promise<GooseWordServerStatus>;
  stop(): Promise<{ stopped: boolean }>;
  getStatus(): Promise<GooseWordServerStatus>;
  injectDeviceContext(options: {
    device: string;
    formFactor: string;
    orientation: string;
  }): Promise<{ ok: boolean }>;
}
