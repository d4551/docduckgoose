export interface ServerErrorContext {
  readonly url?: string;
  readonly method?: string;
  readonly message: string;
}

const formatServerError = (context: ServerErrorContext): string => {
  const parts = [
    "[goose-word:http:error]",
    context.message,
    context.method !== undefined ? `method=${context.method}` : "",
    context.url !== undefined ? `url=${context.url}` : "",
  ].filter((part) => part.length > 0);
  return `${parts.join(" ")}\n`;
};

export const logServerError = (context: ServerErrorContext): void => {
  Bun.stderr.write(formatServerError(context));
};
