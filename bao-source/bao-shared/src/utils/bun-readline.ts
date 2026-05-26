/**
 * Centralized readline boundary for interactive CLI prompts.
 *
 * @packageDocumentation
 */

const CARRIAGE_RETURN_RE: RegExp = /\r$/;

type InputStream = {
  on: (event: string, listener: (chunk: unknown) => void) => void;
  off?: (event: string, listener: (chunk: unknown) => void) => void;
  removeListener?: (event: string, listener: (chunk: unknown) => void) => void;
};

type OutputStream = {
  write: (value: string) => unknown;
};

type CreateInterfaceOptions = {
  input?: InputStream;
  output?: OutputStream;
};

/** Readline-like interface returned by this adapter. */
export type Interface = {
  question: (query: string, callback: (answer: string) => void) => void;
  close: () => void;
};

function normalizeChunk(chunk: unknown): string {
  if (typeof chunk === "string") {
    return chunk;
  }
  if (chunk instanceof Uint8Array) {
    return new TextDecoder().decode(chunk);
  }
  return String(chunk ?? "");
}

function writeQuery(output: OutputStream | undefined, query: string): void {
  if (output && typeof output.write === "function") {
    output.write(query);
  } else if (typeof process.stdout.write === "function") {
    process.stdout.write(query);
  }
}

function detachListener(target: InputStream, listener: (chunk: unknown) => void): void {
  if (typeof target.off === "function") {
    target.off("data", listener);
    target.off("end", listener);
    return;
  }

  if (typeof target.removeListener === "function") {
    target.removeListener("data", listener);
    target.removeListener("end", listener);
  }
}

/**
 * Minimal readline-compatible interface built on top of Bun streams.
 */
export function createInterface(options: CreateInterfaceOptions = {}): Interface {
  const input = options.input ?? (process.stdin as InputStream);
  const output = options.output ?? (process.stdout as OutputStream);
  const pendingQuestions: Array<(value: string) => void> = [];
  const queuedLines: string[] = [];
  let buffer = "";
  let closed = false;

  const deliverLine = (raw: string): void => {
    const pending = pendingQuestions.shift();
    const answer = raw.replace(CARRIAGE_RETURN_RE, "");

    if (!pending) {
      queuedLines.push(answer);
      return;
    }

    pending(answer);
  };

  const pushChunk = (chunk: unknown): void => {
    buffer += normalizeChunk(chunk);
    while (buffer.length > 0) {
      const newline = buffer.indexOf("\n");
      if (newline === -1) {
        break;
      }

      const line = buffer.slice(0, newline);
      buffer = buffer.slice(newline + 1);
      deliverLine(line);
    }
  };

  const handleData = (chunk: unknown): void => {
    pushChunk(chunk);
  };

  const flushOnClose = (): void => {
    if (buffer.length > 0) {
      deliverLine(buffer);
      buffer = "";
    }
    while (pendingQuestions.length > 0) {
      deliverLine("");
    }
  };

  const handleEnd = (): void => {
    if (!closed) {
      flushOnClose();
    }
  };

  if (typeof input.on === "function") {
    input.on("data", handleData);
    input.on("end", handleEnd);
  }

  return {
    question(query: string, callback: (answer: string) => void): void {
      if (closed) {
        callback("");
        return;
      }

      writeQuery(output, query);

      const next = queuedLines.shift();
      if (typeof next === "string") {
        callback(next);
      } else {
        pendingQuestions.push(callback);
      }
    },

    close(): void {
      if (closed) {
        return;
      }
      closed = true;
      detachListener(input, handleData);
      detachListener(input, handleEnd);
      flushOnClose();
      pendingQuestions.length = 0;
      queuedLines.length = 0;
    },
  };
}

export const readline = { createInterface } as const;
