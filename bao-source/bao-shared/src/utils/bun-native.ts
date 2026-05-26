/**
 * Bun 1.3.11+ Native Utilities
 *
 * This module provides Bao/Bun-native utilities.
 * Using native APIs improves performance and reduces dependencies.
 *
 * bun-native
 */

import { readEnvStringOrNull } from "@baohaus/bao-config/env";
import { toResult } from "@baohaus/bao-utils/async-result";
import { LOOPBACK_FALLBACK_HOST } from "../constants/loopback-hosts";
import { runBunCommand } from "./bun-exec";

const UUID_RE: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const NS_PER_MS = 1000000;
const SEMVER_PARTS = 3;
const RGB_SHIFT_R = 24;
const RGB_SHIFT_G = 16;
const RGB_SHIFT_B = 8;
const HEX_SHORT_LENGTH = 3;
const HEX_FULL_LENGTH = 6;
const HEX_SLICE_G_START = 2;
const HEX_SLICE_G_END = 4;
const HEX_SLICE_B_START = 4;
const HEX_SLICE_B_END = 6;
const HEX_RADIX = 16;
const BCRYPT_COST_RE: RegExp = /^\$2[aby]?\$(\d+)\$/;
const VERSION_PREFIX_RE: RegExp = /^v/;
const RGB_RE: RegExp = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
const RGBA_RE: RegExp = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;

// UUID Generation

/**
 * Generate a UUID v4 (random)
 */
export function uuid(): string {
  return crypto.randomUUID();
}

/**
 * Generate a UUID v7 (time-ordered, sortable)
 * Bun 1.3.11+ native - better for database primary keys
 */
export function uuidv7(): string {
  return Bun.randomUUIDv7();
}

/**
 * Validate UUID format
 */
export function isValidUuid(id: string): boolean {
  return UUID_RE.test(id);
}

// Nano ID Generation

const URL_SAFE_ALPHABET: string =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

/**
 * Generate a nano ID (URL-safe, unique ID)
 *
 * @param size - Length of the ID (default: 21, same as nanoid default)
 * @param alphabet - Custom alphabet (default: URL-safe)
 */
export function nanoid(size = 21, alphabet: string = URL_SAFE_ALPHABET): string {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);

  let id = "";
  const mask = alphabet.length - 1;

  for (let i = 0; i < size; i++) {
    const byte = bytes[i];
    if (byte === undefined) {
      continue;
    }
    const value = alphabet.charAt(byte & mask);
    if (value) {
      id += value;
    }
  }

  return id;
}

/**
 * Generate a custom ID with prefix
 * Useful for entity IDs like 'user_abc123'
 */
export function prefixedId(prefix: string, size = 12): string {
  return `${prefix}_${nanoid(size)}`;
}

/**
 * Generate a numeric ID string
 */
export function numericId(size = 10): string {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => (b % 10).toString()).join("");
}

// Port Detection

/**
 * Get an available port
 * @param preferred - Preferred port to try first
 * @param host - Host to bind to (default: canonical loopback from @shared/constants/loopback-hosts)
 */
export async function getPort(
  preferred?: number,
  host: string = LOOPBACK_FALLBACK_HOST,
): Promise<number> {
  // If preferred port specified, try it first
  if (preferred) {
    const isAvailable = await isPortAvailable(preferred, host);
    if (isAvailable) {
      return preferred;
    }
  }

  // Let OS assign a random available port
  const server = Bun.listen({
    hostname: host,
    port: 0, // Let OS pick
    socket: {
      data(socket): void {
        socket.end();
      },
    },
  });

  const port = server.port;
  server.stop();

  return port;
}

/**
 * Check if a port is available
 */
export function isPortAvailable(
  port: number,
  host: string = LOOPBACK_FALLBACK_HOST,
): Promise<boolean> {
  return Promise.resolve().then(
    () => {
      const server = Bun.listen({
        hostname: host,
        port,
        socket: {
          data(socket): void {
            socket.end();
          },
        },
      });
      server.stop();
      return true;
    },
    () => false,
  );
}

/**
 * Get multiple available ports
 */
export async function getPorts(
  count: number,
  host: string = LOOPBACK_FALLBACK_HOST,
): Promise<number[]> {
  const ports: number[] = [];
  for (let i = 0; i < count; i++) {
    const port = await getPort(undefined, host);
    ports.push(port);
  }
  return ports;
}

// Hashing (uses Bun.CryptoHasher)

type HashAlgorithm = "sha256" | "sha512" | "sha1" | "md5" | "blake2b256";

/**
 * Hash a string or buffer
 * Replaces: `crypto.createHash('sha256').update(data).digest('hex')`
 */
export function hash(
  data: string | Buffer | Uint8Array,
  algorithm: HashAlgorithm = "sha256",
): string {
  const hasher = new Bun.CryptoHasher(algorithm);
  hasher.update(data);
  return hasher.digest("hex");
}

/**
 * Hash a file by path
 */
export async function hashFile(
  filePath: string,
  algorithm: HashAlgorithm = "sha256",
): Promise<string> {
  const file = Bun.file(filePath);
  const buffer = await file.arrayBuffer();
  return hash(new Uint8Array(buffer), algorithm);
}

/**
 * Generate HMAC
 */
export function hmac(
  data: string | Buffer,
  key: string | Buffer,
  algorithm: HashAlgorithm = "sha256",
): string {
  const hasher = new Bun.CryptoHasher(algorithm, key);
  hasher.update(data);
  return hasher.digest("hex");
}

// File Operations (uses Bun.file / Bun.write)

/**
 * Read a file as text
 * Replaces: `fs.readFileSync(path, 'utf-8')`
 */
export function readText(filePath: string): Promise<string> {
  const file = Bun.file(filePath);
  return file.text();
}

/**
 * Read a file as JSON
 * Replaces: `JSON.parse(fs.readFileSync(path, 'utf-8'))`
 */
export function readJson<T = unknown>(filePath: string): Promise<T> {
  const file = Bun.file(filePath);
  return file.json();
}

/**
 * Read a file as buffer
 */
export async function readBuffer(filePath: string): Promise<Buffer> {
  const file = Bun.file(filePath);
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Write text to a file
 * Replaces: `fs.writeFileSync(path, content)`
 */
export async function writeText(filePath: string, content: string): Promise<void> {
  await Bun.write(filePath, content);
}

/**
 * Write JSON to a file
 */
export async function writeJson(filePath: string, data: unknown, pretty = false): Promise<void> {
  const content = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  await Bun.write(filePath, content);
}

/**
 * Check if file exists
 */
export function fileExists(filePath: string): Promise<boolean> {
  const file = Bun.file(filePath);
  return file.exists();
}

/**
 * Get file size in bytes
 */
export function fileSize(filePath: string): Promise<number> {
  const file = Bun.file(filePath);
  return Promise.resolve(file.size);
}

/**
 * Get file MIME type
 */
export function fileMimeType(filePath: string): string {
  const file = Bun.file(filePath);
  return file.type;
}

// Process Spawning (uses Bun.spawn)

interface SpawnOptions {
  cwd?: string;
  env?: Record<string, string>;
  stdin?: "inherit" | "pipe" | "ignore";
  stdout?: "inherit" | "pipe" | "ignore";
  stderr?: "inherit" | "pipe" | "ignore";
}

interface SpawnResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  success: boolean;
}

/**
 * Run a command asynchronously
 * Replaces: `child_process.spawn()`
 */
export async function exec(cmd: string[], options: SpawnOptions = {}): Promise<SpawnResult> {
  const commandResult = await runBunCommand({
    cmd,
    cwd: options.cwd,
    env: options.env,
    stdin: options.stdin,
    stdout: options.stdout ?? "pipe",
    stderr: options.stderr ?? "pipe",
  });

  return {
    exitCode: commandResult.exitCode,
    stdout: commandResult.stdout,
    stderr: commandResult.stderr,
    success: commandResult.exitCode === 0,
  };
}

// Timing Utilities

/**
 * Sleep for specified milliseconds
 * Replaces: `new Promise(resolve => setTimeout(resolve, ms))`
 */
export function sleep(ms: number): Promise<void> {
  return Bun.sleep(ms);
}

/**
 * Nanosecond timer
 */
export function nanoseconds(): number {
  return Bun.nanoseconds();
}

/**
 * Measure execution time
 */
export async function measure<T>(
  fn: () => T | Promise<T>,
): Promise<{ result: T; durationMs: number }> {
  const start = Bun.nanoseconds();
  const result = await fn();
  const end = Bun.nanoseconds();
  return {
    result,
    durationMs: Number(end - start) / NS_PER_MS,
  };
}

// Environment & System

/**
 * Get environment variable with a default value
 */
export function env(key: string, defaultValue?: string): string | undefined {
  return readEnvStringOrNull(key) ?? defaultValue;
}

/**
 * Check if running in production
 */
export function isProd(): boolean {
  return readEnvStringOrNull("NODE_ENV") === "production";
}

/**
 * Check if running in development
 */
export function isDev(): boolean {
  const runtimeEnv = readEnvStringOrNull("NODE_ENV");
  return runtimeEnv === "development" || !runtimeEnv;
}

/**
 * Get Bun version
 */
export function bunVersion(): string {
  return Bun.version;
}

// Glob Patterns (uses Bun.Glob)

interface GlobOptions {
  cwd?: string;
  dot?: boolean;
  ignore?: string[];
  absolute?: boolean;
}

/**
 * Find files matching a glob pattern
 * Replaces: `glob`, `fast-glob`, `globby`
 *
 * @example
 * const files = await glob('**\/*.ts');
 * const files = await glob(['src/**\/*.ts', 'lib/**\/*.ts'], { ignore: ['**\/*.test.ts'] });
 */
function isIgnoredByAnyPattern(file: string, ignorePatterns: readonly string[]): boolean {
  for (const ignorePattern of ignorePatterns) {
    const ignoreGlob = new Bun.Glob(ignorePattern);
    if (ignoreGlob.match(file)) {
      return true;
    }
  }
  return false;
}

/**
 * Resolve file paths matching one or more glob patterns using Bun.Glob.
 *
 * Supports negated patterns (prefix `!`) alongside an explicit `ignore`
 * list, optional `dot`, `absolute`, and `cwd` overrides, and deduplicates
 * results into a single sorted array.
 *
 * @param patterns - Single glob pattern or array of patterns to match.
 * @param options - Glob resolution options.
 * @returns Promise resolving to the matched file paths.
 */
export async function glob(
  patterns: string | string[],
  options: GlobOptions = {},
): Promise<string[]> {
  const { cwd = process.cwd(), dot = false, ignore = [], absolute = false } = options;
  const patternList = Array.isArray(patterns) ? patterns : [patterns];
  const results = new Set<string>();

  for (const pattern of patternList) {
    if (pattern.startsWith("!")) {
      ignore.push(pattern.slice(1));
      continue;
    }

    const bunGlob = new Bun.Glob(pattern);
    for await (const file of bunGlob.scan({ cwd, dot })) {
      if (!isIgnoredByAnyPattern(file, ignore)) {
        results.add(absolute ? `${cwd}/${file}` : file);
      }
    }
  }

  return Array.from(results);
}

/**
 * Synchronously find files matching a glob pattern
 * Note: Uses async iterator internally, returns Promise
 */
export const globSync: typeof glob = glob;

/**
 * Check if a string matches a glob pattern
 */
export function matchGlob(pattern: string, path: string): boolean {
  const bunGlob = new Bun.Glob(pattern);
  return bunGlob.match(path);
}

// Password Hashing (uses Bun.password)

type PasswordAlgorithm = "bcrypt" | "argon2id" | "argon2d" | "argon2i";

interface PasswordHashOptions {
  algorithm?: PasswordAlgorithm;
  cost?: number; // bcrypt rounds (4-31, default 10)
  memoryCost?: number; // argon2 memory in KiB
  timeCost?: number; // argon2 iterations
}

/**
 * Hash a password securely
 * Replaces: `bcrypt.hash()` or `argon2.hash()`
 *
 * @example
 * const hash = await hashPassword('user-password');
 * const hash = await hashPassword('user-password', { algorithm: 'argon2id' });
 */
export function hashPassword(password: string, options: PasswordHashOptions = {}): Promise<string> {
  const { algorithm = "bcrypt", cost = 10, memoryCost = 65536, timeCost = 2 } = options;

  if (algorithm === "bcrypt") {
    return Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost,
    });
  }

  // Argon2 variants
  return Bun.password.hash(password, {
    algorithm: algorithm as "argon2id" | "argon2d" | "argon2i",
    memoryCost,
    timeCost,
  });
}

/**
 * Verify a password against a hash
 * Replaces: `bcrypt.compare()` or `argon2.verify()`
 * Bun 1.3.11+: Uses promise rejection handling for cleaner error flow.
 *
 * @example
 * const isValid = await verifyPassword('user-input', storedHash);
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  // Bun.password.verify throws on invalid hash format - handle gracefully
  const result = await toResult(() => Bun.password.verify(password, storedHash));
  return result.ok ? result.value : false;
}

/**
 * Check if a hash needs to be rehashed (e.g., cost increased)
 * Useful for security upgrades
 */
export function needsRehash(storedHash: string, options: PasswordHashOptions = {}): boolean {
  const { algorithm = "bcrypt", cost = 10 } = options;

  if (algorithm === "bcrypt") {
    // Check bcrypt cost from hash format: $2b$10$...
    const match = storedHash.match(BCRYPT_COST_RE);
    if (!match) {
      return true;
    }
    const hashCost = parseInt(match[1] || "10", 10);
    return hashCost < cost;
  }

  // For argon2, always return false (complex to parse)
  return false;
}

// Semver Utilities (uses Bun.semver - Bun 1.3.11+)

/**
 * Compare two semver versions
 * Replaces: `semver` package
 *
 * @returns -1 if a < b, 0 if a == b, 1 if a > b
 * @example
 * semverCompare('1.0.0', '2.0.0'); // -1
 * semverCompare('2.0.0', '1.0.0'); // 1
 * semverCompare('1.0.0', '1.0.0'); // 0
 */
export function semverCompare(a: string, b: string): -1 | 0 | 1 {
  if (Bun.semver?.order) {
    return Bun.semver.order(a, b);
  }
  /**
   * Parse a semver string into numeric parts for comparison.
   *
   * @param v - Version string to parse
   * @returns Parsed numeric parts
   */
  const parseVersion = (v: string): number[] => {
    const version = v.replace(VERSION_PREFIX_RE, "").split("-")[0] ?? "";
    return version.split(".").map((n: string) => parseInt(n, 10) || 0);
  };
  const va = parseVersion(a);
  const vb = parseVersion(b);
  for (let i = 0; i < SEMVER_PARTS; i++) {
    const diff = (va[i] || 0) - (vb[i] || 0);
    if (diff < 0) {
      return -1;
    }
    if (diff > 0) {
      return 1;
    }
  }
  return 0;
}

/**
 * Check if version satisfies a range
 * Replaces: `semver.satisfies()`
 *
 * @example
 * semverSatisfies('1.5.0', '>=1.0.0 <2.0.0'); // true
 * semverSatisfies('2.0.0', '^1.0.0'); // false
 */
export function semverSatisfies(version: string, range: string): boolean {
  if (Bun.semver?.satisfies) {
    return Bun.semver.satisfies(version, range);
  }

  // Simple range handling.
  if (range.startsWith(">=")) {
    return semverCompare(version, range.slice(2)) >= 0;
  }
  if (range.startsWith("^")) {
    const min = range.slice(1);
    const parts = min.split(".");
    const part0 = parts[0];
    const nextMajor = `${parseInt(part0 || "0", 10) + 1}.0.0`;
    return semverCompare(version, min) >= 0 && semverCompare(version, nextMajor) < 0;
  }

  return version === range;
}

/**
 * Check if a > b
 */
export function semverGt(a: string, b: string): boolean {
  return semverCompare(a, b) === 1;
}

/**
 * Check if a >= b
 */
export function semverGte(a: string, b: string): boolean {
  return semverCompare(a, b) >= 0;
}

/**
 * Check if a < b
 */
export function semverLt(a: string, b: string): boolean {
  return semverCompare(a, b) === -1;
}

/**
 * Check if a <= b
 */
export function semverLte(a: string, b: string): boolean {
  return semverCompare(a, b) <= 0;
}

// String Utilities (uses Bun.stringWidth - Bun 1.3.11+)

/**
 * Get the display width of a Unicode string
 * Accounts for wide characters (CJK), emoji, etc.
 * Replaces: `string-width` package
 *
 * @example
 * stringWidth('hello'); // 5
 * stringWidth('你好'); // 4 (CJK characters are width 2)
 * stringWidth('好'); // 2 (CJK characters are width 2)
 */
export function stringWidth(str: string): number {
  if (Bun.stringWidth) {
    return Bun.stringWidth(str);
  }
  // Basic width handling.
  return str.length;
}

// Color Utilities (uses Bun.color - Bun 1.3.11+)

type ColorFormat =
  | "hex"
  | "rgb"
  | "rgba"
  | "hsl"
  | "hsla"
  | "css"
  | "ansi"
  | "ansi-16"
  | "ansi-256";

interface ColorRgb {
  r: number;
  g: number;
  b: number;
  a?: number;
}

type BunWithColor = typeof Bun & {
  color?: (color: string, format: ColorFormat) => string | null;
};

/**
 * Returns the Bun.color helper when available.
 */
function getBunColor(): ((color: string, format: ColorFormat) => string | null) | null {
  const bunColor = (Bun as BunWithColor).color;
  return typeof bunColor === "function" ? bunColor : null;
}

/**
 * Convert a color to different formats
 * Replaces: `color`, `tinycolor2`, `chroma-js` for simple conversions
 *
 * @example
 * colorConvert('#ff0000', 'rgb'); // 'rgb(255, 0, 0)'
 * colorConvert('red', 'hex'); // '#ff0000'
 * colorConvert('hsl(0, 100%, 50%)', 'rgb'); // 'rgb(255, 0, 0)'
 */
export function colorConvert(color: string, format: ColorFormat): string | null {
  const bunColor = getBunColor();
  if (bunColor) {
    const result = bunColor(color, format);
    return result ?? null;
  }
  // Fallback for basic hex <-> rgb
  if (format === "hex" && color.startsWith("rgb")) {
    const match = color.match(RGB_RE);
    if (match) {
      const [, r, g, b] = match.map(Number);
      if (r !== undefined && g !== undefined && b !== undefined) {
        return `#${((1 << RGB_SHIFT_R) + (r << RGB_SHIFT_G) + (g << RGB_SHIFT_B) + b).toString(HEX_RADIX).slice(1)}`;
      }
    }
  }
  return null;
}

/**
 * Parse a Bun-native rgba() output string into ColorRgb.
 *
 * @param rgba - The rgba/rgb string from Bun.color (e.g. "rgba(255, 0, 0, 1)")
 * @returns Parsed ColorRgb or null if the string cannot be parsed
 */
function parseBunRgbaString(rgba: string): ColorRgb | null {
  const match = rgba.match(RGBA_RE);
  if (!match) {
    return null;
  }
  const rStr = match[1];
  const gStr = match[2];
  const bStr = match[3];
  const aStr = match[4];
  if (!(rStr && gStr && bStr)) {
    return null;
  }
  return {
    r: parseInt(rStr, 10),
    g: parseInt(gStr, 10),
    b: parseInt(bStr, 10),
    a: aStr ? parseFloat(aStr) : 1,
  };
}

/**
 * Parse a hex color string (3 or 6 characters, without the '#' prefix) into ColorRgb.
 *
 * @param hex - Hex string without leading '#' (e.g. "ff0" or "ff0000")
 * @returns Parsed ColorRgb or null if the hex length is unsupported
 */
function parseHexColor(hex: string): ColorRgb | null {
  if (hex.length === HEX_SHORT_LENGTH) {
    const h0 = hex[0] || "0";
    const h1 = hex[1] || "0";
    const h2 = hex[2] || "0";
    return {
      r: parseInt(h0 + h0, 16),
      g: parseInt(h1 + h1, 16),
      b: parseInt(h2 + h2, 16),
    };
  }
  if (hex.length === HEX_FULL_LENGTH) {
    const h0 = hex.slice(0, HEX_SLICE_G_START) || "00";
    const h1 = hex.slice(HEX_SLICE_G_START, HEX_SLICE_G_END) || "00";
    const h2 = hex.slice(HEX_SLICE_B_START, HEX_SLICE_B_END) || "00";
    return {
      r: parseInt(h0, 16),
      g: parseInt(h1, 16),
      b: parseInt(h2, 16),
    };
  }
  return null;
}

/**
 * Parse a color string to RGB components
 *
 * @example
 * parseColor('#ff0000'); // { r: 255, g: 0, b: 0 }
 * parseColor('rgb(255, 0, 0)'); // { r: 255, g: 0, b: 0 }
 */
export function parseColor(color: string): ColorRgb | null {
  const bunColor = getBunColor();
  if (bunColor) {
    const rgba = bunColor(color, "rgba");
    if (rgba) {
      const result = parseBunRgbaString(rgba);
      if (result) {
        return result;
      }
    }
  }
  // Basic hex parsing.
  if (color.startsWith("#")) {
    return parseHexColor(color.slice(1));
  }
  return null;
}

// Base64 Encoding (uses Bun's native btoa/atob)

/**
 * Encode string to base64
 */
export function base64Encode(str: string): string {
  return btoa(str);
}

/**
 * Decode base64 to string
 */
export function base64Decode(b64: string): string {
  return atob(b64);
}

/**
 * Encode buffer to base64
 */
export function bufferToBase64(buffer: Buffer | Uint8Array): string {
  return Buffer.from(buffer).toString("base64");
}

/**
 * Decode base64 to buffer
 */
export function base64ToBuffer(b64: string): Buffer {
  return Buffer.from(b64, "base64");
}

// Exports
