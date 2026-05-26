/**
 * TypeScript shape mirroring `bao/schemas/bao-sandbox-v1.schema.json`.
 *
 * One source of truth: when the JSON schema changes, bump this in lockstep.
 * The `validate.ts` validator returns this typed shape.
 *
 * @module @baohaus/bao-sandbox-spec/schema
 */

export const BAO_SANDBOX_TIER = {
  b0: "B0",
  b1: "B1",
  b2: "B2",
  b3: "B3",
  bw: "Bw",
} as const;
export type BaoSandboxTier = (typeof BAO_SANDBOX_TIER)[keyof typeof BAO_SANDBOX_TIER];

export const BAO_SANDBOX_INTENT = {
  build: "build",
  test: "test",
  run: "run",
  shell: "shell",
} as const;
export type BaoSandboxIntent = (typeof BAO_SANDBOX_INTENT)[keyof typeof BAO_SANDBOX_INTENT];

export const BAO_SANDBOX_NET_MODE = {
  none: "none",
  loopback: "loopback",
  egressAllowlist: "egress-allowlist",
  full: "full",
} as const;
export type BaoSandboxNetMode = (typeof BAO_SANDBOX_NET_MODE)[keyof typeof BAO_SANDBOX_NET_MODE];

export const BAO_SANDBOX_DEFAULT_ACTION = {
  allow: "allow",
  errno: "errno",
  killProcess: "kill-process",
  log: "log",
  trap: "trap",
} as const;
export type BaoSandboxDefaultAction =
  (typeof BAO_SANDBOX_DEFAULT_ACTION)[keyof typeof BAO_SANDBOX_DEFAULT_ACTION];

export const BAO_SANDBOX_LANDLOCK_FS = {
  execute: "execute",
  writeFile: "write-file",
  readFile: "read-file",
  readDir: "read-dir",
  removeDir: "remove-dir",
  removeFile: "remove-file",
  makeChar: "make-char",
  makeDir: "make-dir",
  makeReg: "make-reg",
  makeSock: "make-sock",
  makeFifo: "make-fifo",
  makeBlock: "make-block",
  makeSym: "make-sym",
  refer: "refer",
  truncate: "truncate",
  ioctlDev: "ioctl-dev",
} as const;
export type BaoSandboxLandlockFs =
  (typeof BAO_SANDBOX_LANDLOCK_FS)[keyof typeof BAO_SANDBOX_LANDLOCK_FS];

export const BAO_SANDBOX_LANDLOCK_NET = {
  bindTcp: "bind-tcp",
  connectTcp: "connect-tcp",
} as const;
export type BaoSandboxLandlockNet =
  (typeof BAO_SANDBOX_LANDLOCK_NET)[keyof typeof BAO_SANDBOX_LANDLOCK_NET];

export interface BaoSandboxRootfs {
  readonly base: string;
  readonly digest?: string | null;
}

export interface BaoSandboxMount {
  readonly src: string;
  readonly dst: string;
  readonly mode: "ro" | "rw";
  readonly maxMiB?: number | null;
}

export interface BaoSandboxNetEgress {
  readonly host: string;
  readonly port: number;
  readonly protocol: "tcp" | "udp";
}

export type BaoSandboxNet =
  | { readonly mode: "none" }
  | { readonly mode: "loopback" }
  | { readonly mode: "full" }
  | { readonly mode: "egress-allowlist"; readonly egress: readonly BaoSandboxNetEgress[] };

export interface BaoSandboxSyscalls {
  readonly default: BaoSandboxDefaultAction;
  readonly errno?: number | null;
  readonly allow?: readonly string[];
  readonly deny?: readonly string[];
}

export interface BaoSandboxResources {
  readonly cpuMilli: number;
  readonly memMiB: number;
  readonly pidLimit: number;
  readonly wallMs?: number | null;
  readonly ioMaxRbps?: number | null;
  readonly ioMaxWbps?: number | null;
  readonly ioMaxRiops?: number | null;
  readonly ioMaxWiops?: number | null;
  readonly cpuWeight?: number | null;
  readonly ioWeight?: number | null;
  readonly cpusetCpus?: string | null;
}

export interface BaoSandboxLandlockFsRule {
  readonly path: string;
  readonly access: readonly BaoSandboxLandlockFs[];
}

export interface BaoSandboxLandlockNetRule {
  readonly port: number;
  readonly access: readonly BaoSandboxLandlockNet[];
}

export interface BaoSandboxLandlock {
  readonly abi: number;
  readonly fs: readonly BaoSandboxLandlockFsRule[];
  readonly net?: readonly BaoSandboxLandlockNetRule[] | null;
}

export interface BaoSandboxEnv {
  readonly name: string;
  readonly value?: string | null;
  readonly fromHost?: boolean | null;
}

export interface BaoSandboxManifest {
  readonly tier: BaoSandboxTier;
  readonly intent: BaoSandboxIntent;
  readonly rootfs: BaoSandboxRootfs;
  readonly mounts: readonly BaoSandboxMount[];
  readonly net: BaoSandboxNet;
  readonly syscalls: BaoSandboxSyscalls;
  readonly resources: BaoSandboxResources;
  readonly landlock?: BaoSandboxLandlock | null;
  readonly hostname?: string | null;
  readonly env?: readonly BaoSandboxEnv[];
  /**
   * Module/binary path relative to the extracted rootfs that the tier spawner
   * launches. For Bw (wasm) this is the `.wasm`/`.cwasm` module file. For
   * B2/B3 this is the entrypoint executable; absent → spawner falls back to
   * the caller-supplied argv[0]. Pre-launch policy: explicit > argv-implicit.
   */
  readonly entrypoint?: string | null;
}
