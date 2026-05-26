const ENCODER = new TextEncoder();

const LOG_LEVELS = ["info", "warn", "error"] as const;
type LogLevel = (typeof LOG_LEVELS)[number];

interface LogPayload {
  scope: string;
  level: LogLevel;
  message: string;
  detail?: object;
}

function encode(payload: LogPayload): Uint8Array {
  const json = JSON.stringify(payload);
  return ENCODER.encode(`${json}\n`);
}

function sink(level: LogLevel): (chunk: Uint8Array) => void {
  if (level === "error") {
    return (chunk) => {
      Bun.write(Bun.stderr, chunk);
    };
  }
  return (chunk) => {
    Bun.write(Bun.stdout, chunk);
  };
}

export function logInfo(scope: string, message: string, detail?: object): void {
  sink("info")(encode({ scope, level: "info", message, ...(detail ? { detail } : {}) }));
}

export function logError(scope: string, message: string, detail?: object): void {
  sink("error")(encode({ scope, level: "error", message, ...(detail ? { detail } : {}) }));
}
