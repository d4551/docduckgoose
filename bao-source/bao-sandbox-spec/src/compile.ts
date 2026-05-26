/**
 * Compile a {@link BaoSandboxManifest} + runtime context into the lower-level
 * artefacts consumed by `bao-jail`:
 *   - {@link SeccompPolicy} (allow/deny + default action)
 *   - {@link CgroupLimits}
 *   - {@link LandlockPolicy} (optional)
 *   - mount list + network mode + spec extras
 *
 * The manifest declares the **requirement**; the manager compares this against
 * the caller's grant via `capabilitySubsumes` before spawning. The compiler is
 * pure (no I/O) — it converts schema → kernel-ready policy structs.
 *
 * @module @baohaus/bao-sandbox-spec/compile
 */

import type { BpfArchName } from "@baohaus/bao-bpf/arch";
import type { SeccompPolicy, SeccompResult, SeccompSyscallRule } from "@baohaus/bao-bpf/policy";
import type { CgroupLimits } from "@baohaus/bao-cgroup/limits";
import {
  LANDLOCK_ABI_TARGET,
  LANDLOCK_ACCESS_FS,
  LANDLOCK_ACCESS_NET,
} from "@baohaus/bao-landlock/abi";
import type { LandlockPolicy, LandlockRule } from "@baohaus/bao-landlock/policy";
import type {
  BaoSandboxLandlock,
  BaoSandboxLandlockFs,
  BaoSandboxLandlockNet,
  BaoSandboxManifest,
  BaoSandboxNet,
  BaoSandboxSyscalls,
} from "./schema.ts";

export type CompileOutcome =
  | { readonly ok: true; readonly artefacts: SandboxArtefacts }
  | { readonly ok: false; readonly reason: string };

export interface SandboxArtefacts {
  readonly seccomp: SeccompPolicy;
  readonly limits: CgroupLimits;
  readonly landlock: LandlockPolicy | undefined;
  readonly net: BaoSandboxNet;
  readonly hostname: string | undefined;
}

export interface CompileContext {
  readonly arch: BpfArchName;
}

export function compileManifest(manifest: BaoSandboxManifest, ctx: CompileContext): CompileOutcome {
  const seccomp = compileSeccomp(manifest.syscalls, ctx.arch);
  if (!seccomp.ok) {
    return seccomp;
  }
  const limits: CgroupLimits = {
    cpuMilli: manifest.resources.cpuMilli,
    memMiB: manifest.resources.memMiB,
    pidLimit: manifest.resources.pidLimit,
    ioMaxRbps: manifest.resources.ioMaxRbps ?? undefined,
    ioMaxWbps: manifest.resources.ioMaxWbps ?? undefined,
    ioMaxRiops: manifest.resources.ioMaxRiops ?? undefined,
    ioMaxWiops: manifest.resources.ioMaxWiops ?? undefined,
    cpuWeight: manifest.resources.cpuWeight ?? undefined,
    ioWeight: manifest.resources.ioWeight ?? undefined,
    cpusetCpus: manifest.resources.cpusetCpus ?? undefined,
  };
  const landlock =
    manifest.landlock !== undefined && manifest.landlock !== null
      ? compileLandlock(manifest.landlock)
      : undefined;
  return {
    ok: true,
    artefacts: {
      seccomp: seccomp.policy,
      limits,
      landlock,
      net: manifest.net,
      hostname: manifest.hostname ?? undefined,
    },
  };
}

interface SeccompCompileOk {
  readonly ok: true;
  readonly policy: SeccompPolicy;
}

function compileSeccomp(
  syscalls: BaoSandboxSyscalls,
  arch: BpfArchName,
): SeccompCompileOk | { readonly ok: false; readonly reason: string } {
  const defaultResult: SeccompResult = toSeccompResult(syscalls.default, syscalls.errno);
  const rules: SeccompSyscallRule[] = [];
  if (syscalls.allow !== undefined) {
    for (const name of syscalls.allow) {
      rules.push({ syscall: name, result: { action: "allow" } });
    }
  }
  if (syscalls.deny !== undefined) {
    for (const name of syscalls.deny) {
      rules.push({ syscall: name, result: { action: "errno", errno: 1 } });
    }
  }
  return { ok: true, policy: { arch, defaultResult, rules } };
}

function toSeccompResult(
  action: BaoSandboxSyscalls["default"],
  errno: number | null | undefined,
): SeccompResult {
  switch (action) {
    case "allow":
      return { action: "allow" };
    case "errno":
      return { action: "errno", errno: errno ?? 1 };
    case "kill-process":
      return { action: "kill-process" };
    case "log":
      return { action: "log" };
    case "trap":
      return { action: "trap" };
  }
}

function compileLandlock(landlock: BaoSandboxLandlock): LandlockPolicy {
  if (landlock.abi > LANDLOCK_ABI_TARGET) {
    // Forward-compatible: clamp to target ABI; new flags are still emitted but
    // the kernel will reject unknown bits at create_ruleset, surfacing rejection.
  }
  const fsMaskNeeded = computeFsMask(landlock.fs);
  const netMaskNeeded = computeNetMask(landlock.net ?? []);
  const rules: LandlockRule[] = [];
  for (const r of landlock.fs) {
    rules.push({ kind: "path-beneath", path: r.path, allowed: accessFsBits(r.access) });
  }
  for (const r of landlock.net ?? []) {
    rules.push({ kind: "net-port", port: r.port, allowed: accessNetBits(r.access) });
  }
  return {
    handledAccessFs: fsMaskNeeded,
    handledAccessNet: netMaskNeeded,
    scoped: 0n,
    rules,
  };
}

function computeFsMask(
  rules: readonly { readonly access: readonly BaoSandboxLandlockFs[] }[],
): bigint {
  let mask = 0n;
  for (const r of rules) {
    mask |= accessFsBits(r.access);
  }
  return mask;
}

function computeNetMask(
  rules: readonly { readonly access: readonly BaoSandboxLandlockNet[] }[],
): bigint {
  let mask = 0n;
  for (const r of rules) {
    mask |= accessNetBits(r.access);
  }
  return mask;
}

function accessFsBits(access: readonly BaoSandboxLandlockFs[]): bigint {
  let mask = 0n;
  for (const a of access) {
    mask |= fsBit(a);
  }
  return mask;
}

function accessNetBits(access: readonly BaoSandboxLandlockNet[]): bigint {
  let mask = 0n;
  for (const a of access) {
    mask |= a === "bind-tcp" ? LANDLOCK_ACCESS_NET.bindTcp : LANDLOCK_ACCESS_NET.connectTcp;
  }
  return mask;
}

function fsBit(a: BaoSandboxLandlockFs): bigint {
  switch (a) {
    case "execute":
      return LANDLOCK_ACCESS_FS.execute;
    case "write-file":
      return LANDLOCK_ACCESS_FS.writeFile;
    case "read-file":
      return LANDLOCK_ACCESS_FS.readFile;
    case "read-dir":
      return LANDLOCK_ACCESS_FS.readDir;
    case "remove-dir":
      return LANDLOCK_ACCESS_FS.removeDir;
    case "remove-file":
      return LANDLOCK_ACCESS_FS.removeFile;
    case "make-char":
      return LANDLOCK_ACCESS_FS.makeChar;
    case "make-dir":
      return LANDLOCK_ACCESS_FS.makeDir;
    case "make-reg":
      return LANDLOCK_ACCESS_FS.makeReg;
    case "make-sock":
      return LANDLOCK_ACCESS_FS.makeSock;
    case "make-fifo":
      return LANDLOCK_ACCESS_FS.makeFifo;
    case "make-block":
      return LANDLOCK_ACCESS_FS.makeBlock;
    case "make-sym":
      return LANDLOCK_ACCESS_FS.makeSym;
    case "refer":
      return LANDLOCK_ACCESS_FS.refer;
    case "truncate":
      return LANDLOCK_ACCESS_FS.truncate;
    case "ioctl-dev":
      return LANDLOCK_ACCESS_FS.ioctlDev;
  }
}
