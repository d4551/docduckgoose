const DIGITS_RE: RegExp = /^\d+$/;

type PointerContainer = Record<string, unknown> | unknown[];
type PointerResolution =
  | { parent: unknown[]; key: number }
  | { parent: Record<string, unknown>; key: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseArrayIndex(token: string): number | undefined {
  const index = Number(token);
  return Number.isInteger(index) && index >= 0 ? index : undefined;
}

function parsePointer(pointer: string): string[] {
  if (pointer === "") {
    return [];
  }
  if (!pointer.startsWith("/")) {
    throw new Error(`Invalid JSON Pointer: "${pointer}" - must start with "/" or be empty`);
  }
  return pointer
    .slice(1)
    .split("/")
    .map((token) => token.replace(/~1/g, "/").replace(/~0/g, "~"));
}

function encodeToken(token: string): string {
  return token.replace(/~/g, "~0").replace(/\//g, "~1");
}

function getChild(container: PointerContainer, token: string): unknown {
  if (Array.isArray(container)) {
    const index = parseArrayIndex(token);
    return index === undefined || index >= container.length ? undefined : container[index];
  }
  return container[token];
}

function setChild(container: PointerContainer, token: string, value: unknown): boolean {
  if (Array.isArray(container)) {
    const index = parseArrayIndex(token);
    if (index === undefined) {
      return false;
    }
    while (container.length <= index) {
      container.push(undefined);
    }
    container[index] = value;
    return true;
  }
  container[token] = value;
  return true;
}

function ensureContainer(
  container: PointerContainer,
  token: string,
  nextIsNumeric: boolean,
): PointerContainer | undefined {
  const existing = getChild(container, token);
  if (Array.isArray(existing) || isRecord(existing)) {
    return existing;
  }

  const nextContainer: PointerContainer = nextIsNumeric ? [] : {};
  return setChild(container, token, nextContainer) ? nextContainer : undefined;
}

function resolve(value: unknown, tokens: readonly string[]): PointerResolution | undefined {
  if (tokens.length === 0 || !(Array.isArray(value) || isRecord(value))) {
    return;
  }

  let current: PointerContainer = value;
  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i];
    if (token === undefined) {
      return;
    }
    const next = getChild(current, token);
    if (!(Array.isArray(next) || isRecord(next))) {
      return;
    }
    current = next;
  }

  const lastToken = tokens[tokens.length - 1];
  if (lastToken === undefined) {
    return;
  }
  if (Array.isArray(current)) {
    const idx = parseArrayIndex(lastToken);
    if (idx === undefined) {
      return;
    }
    return { parent: current, key: idx };
  }
  return { parent: current, key: lastToken };
}

export namespace Pointer {
  export function Get(value: unknown, pointer: string): unknown {
    const tokens = parsePointer(pointer);
    if (tokens.length === 0) {
      return value;
    }

    let current: unknown = value;
    for (const token of tokens) {
      if (!(Array.isArray(current) || isRecord(current))) {
        return;
      }
      current = getChild(current, token);
      if (current === undefined) {
        return;
      }
    }
    return current;
  }

  export function Assign(value: unknown, pointer: string, setValue: unknown): unknown {
    const tokens = parsePointer(pointer);
    if (tokens.length === 0) {
      return setValue;
    }

    const firstToken = tokens[0];
    let rootValue = value;
    if (rootValue === null || rootValue === undefined) {
      if (firstToken === undefined) {
        return setValue;
      }
      rootValue = DIGITS_RE.test(firstToken) ? [] : {};
    }
    if (!(Array.isArray(rootValue) || isRecord(rootValue))) {
      return rootValue;
    }

    let current: PointerContainer = rootValue;
    for (let i = 0; i < tokens.length - 1; i++) {
      const token = tokens[i];
      const nextToken = tokens[i + 1];
      if (token === undefined || nextToken === undefined) {
        return rootValue;
      }
      const nextIsNumeric = DIGITS_RE.test(nextToken);
      const next = ensureContainer(current, token, nextIsNumeric);
      if (next === undefined) {
        return rootValue;
      }
      current = next;
    }

    const lastToken = tokens[tokens.length - 1];
    if (lastToken === undefined) {
      return rootValue;
    }
    setChild(current, lastToken, setValue);

    return rootValue;
  }

  export function Delete(value: unknown, pointer: string): unknown {
    const tokens = parsePointer(pointer);
    if (tokens.length === 0) {
      return value;
    }

    const resolved = resolve(value, tokens);
    if (resolved === undefined) {
      return value;
    }

    const { parent, key } = resolved;
    if (Array.isArray(parent) && typeof key === "number") {
      if (key >= 0 && key < parent.length) {
        parent.splice(key, 1);
      }
    } else if (!Array.isArray(parent) && typeof key === "string") {
      delete parent[key];
    }

    return value;
  }

  export function Has(value: unknown, pointer: string): boolean {
    const tokens = parsePointer(pointer);
    if (tokens.length === 0) {
      return true;
    }

    const resolved = resolve(value, tokens);
    if (resolved === undefined) {
      return false;
    }

    const { parent, key } = resolved;
    if (Array.isArray(parent) && typeof key === "number") {
      return key >= 0 && key < parent.length;
    }
    return key in parent;
  }

  export function Create(...tokens: string[]): string {
    if (tokens.length === 0) {
      return "";
    }
    return `/${tokens.map(encodeToken).join("/")}`;
  }
}
