/// <reference types="bun" />
type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonObject {
  readonly [key: string]: JsonField;
}
export const sha256Hex = (value: string | Uint8Array | ArrayBuffer): string => {
  const hasher = new Bun.CryptoHasher("sha256");
  if (value instanceof ArrayBuffer) {
    hasher.update(new Uint8Array(value));
  } else {
    hasher.update(value);
  }
  return hasher.digest("hex");
};

export const sha256Base64 = (value: string | Uint8Array | ArrayBuffer): string => {
  const hasher = new Bun.CryptoHasher("sha256");
  if (value instanceof ArrayBuffer) {
    hasher.update(new Uint8Array(value));
  } else {
    hasher.update(value);
  }
  return hasher.digest("base64");
};

export const canonicalJson = (value: object | JsonValue): string =>
  `${JSON.stringify(value, null, 2)}\n`;

export const spawnChecked = (args: readonly string[], failure: string): void => {
  const result = Bun.spawnSync([...args], { stdout: "pipe", stderr: "pipe" });
  if (result.exitCode === 0) {
    return;
  }
  const stderr = new TextDecoder().decode(result.stderr).trim();
  throw new Error(stderr.length > 0 ? `${failure}: ${stderr}` : failure);
};

export const listTarMembers = (archive: string): string[] => {
  const result = Bun.spawnSync(["tar", "-tf", archive], { stdout: "pipe", stderr: "pipe" });
  if (result.exitCode !== 0) {
    const stderr = new TextDecoder().decode(result.stderr).trim();
    throw new Error(`Failed to list archive members (${archive}): ${stderr}`);
  }
  return new TextDecoder()
    .decode(result.stdout)
    .split("\n")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .sort();
};

export const readTarMember = (archive: string, member: string): Uint8Array => {
  const result = Bun.spawnSync(["tar", "-xOf", archive, member], {
    stdout: "pipe",
    stderr: "pipe",
  });
  if (result.exitCode !== 0) {
    const stderr = new TextDecoder().decode(result.stderr).trim();
    throw new Error(`Failed to read archive member (${archive}:${member}): ${stderr}`);
  }
  return new Uint8Array(result.stdout);
};
