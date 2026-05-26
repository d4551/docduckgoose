/** Install-target handler logger for goose-word (stderr, no console.*). */
export interface GooseWordBaoInstallLoggerPort {
  readonly info: (message: string, context?: Readonly<Record<string, string>>) => void;
  readonly warn: (message: string, context?: Readonly<Record<string, string>>) => void;
  readonly error: (message: string, context?: Readonly<Record<string, string>>) => void;
}

const formatLine = (
  level: string,
  message: string,
  context?: Readonly<Record<string, string>>,
): string => {
  if (context === undefined) {
    return `[goose-word:bao-install:${level}] ${message}\n`;
  }
  const pairs = Object.entries(context)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ");
  return `[goose-word:bao-install:${level}] ${message} ${pairs}\n`;
};

export const gooseWordBaoInstallLogger: GooseWordBaoInstallLoggerPort = {
  info(message, context) {
    Bun.stderr.write(formatLine("info", message, context));
  },
  warn(message, context) {
    Bun.stderr.write(formatLine("warn", message, context));
  },
  error(message, context) {
    Bun.stderr.write(formatLine("error", message, context));
  },
};
