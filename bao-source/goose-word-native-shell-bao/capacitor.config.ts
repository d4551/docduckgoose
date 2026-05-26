import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.baohaus.gooseword",
  appName: "Goose Word",
  webDir: "www",
  server: {
    url: "http://127.0.0.1:8080/docs",
    cleartext: true,
    androidScheme: "http",
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
