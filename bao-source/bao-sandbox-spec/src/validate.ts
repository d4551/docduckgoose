/**
 * Validate a parsed JSON object against the .bao sandbox manifest schema and
 * return a strongly-typed {@link BaoSandboxManifest}. Pure-TS structural
 * validator — no schema engine dependency, no `as` casts.
 *
 * @module @baohaus/bao-sandbox-spec/validate
 */

import {
  BAO_SANDBOX_DEFAULT_ACTION,
  BAO_SANDBOX_INTENT,
  BAO_SANDBOX_LANDLOCK_FS,
  BAO_SANDBOX_LANDLOCK_NET,
  BAO_SANDBOX_NET_MODE,
  BAO_SANDBOX_TIER,
  type BaoSandboxDefaultAction,
  type BaoSandboxEnv,
  type BaoSandboxIntent,
  type BaoSandboxLandlock,
  type BaoSandboxLandlockFs,
  type BaoSandboxLandlockFsRule,
  type BaoSandboxLandlockNet,
  type BaoSandboxLandlockNetRule,
  type BaoSandboxManifest,
  type BaoSandboxMount,
  type BaoSandboxNet,
  type BaoSandboxNetEgress,
  type BaoSandboxResources,
  type BaoSandboxRootfs,
  type BaoSandboxSyscalls,
  type BaoSandboxTier,
} from "./schema.ts";

export type ValidateOutcome =
  | { readonly ok: true; readonly manifest: BaoSandboxManifest }
  | { readonly ok: false; readonly reason: string; readonly path: string };

type FieldOk<T> = { readonly ok: true; readonly value: T };
type FieldFail = { readonly ok: false; readonly reason: string; readonly path: string };
type FieldOutcome<T> = FieldOk<T> | FieldFail;

export function validateManifest(input: unknown): ValidateOutcome {
  if (typeof input !== "object" || input === null) {
    return { ok: false, reason: "manifest must be an object", path: "$" };
  }
  const tier = parseTier(field(input, "tier"));
  if (!tier.ok) return tier;
  const intent = parseIntent(field(input, "intent"));
  if (!intent.ok) return intent;
  const rootfs = parseRootfs(field(input, "rootfs"));
  if (!rootfs.ok) return rootfs;
  const mounts = parseMounts(field(input, "mounts"));
  if (!mounts.ok) return mounts;
  const net = parseNet(field(input, "net"));
  if (!net.ok) return net;
  const syscalls = parseSyscalls(field(input, "syscalls"));
  if (!syscalls.ok) return syscalls;
  const resources = parseResources(field(input, "resources"));
  if (!resources.ok) return resources;
  const landlock = parseOptionalLandlock(field(input, "landlock"));
  if (!landlock.ok) return landlock;
  const hostname = parseOptionalString(field(input, "hostname"), "hostname");
  if (!hostname.ok) return hostname;
  const env = parseEnv(field(input, "env"));
  if (!env.ok) return env;
  const entrypoint = parseOptionalString(field(input, "entrypoint"), "entrypoint");
  if (!entrypoint.ok) return entrypoint;

  const manifest: BaoSandboxManifest = {
    tier: tier.value,
    intent: intent.value,
    rootfs: rootfs.value,
    mounts: mounts.value,
    net: net.value,
    syscalls: syscalls.value,
    resources: resources.value,
    landlock: landlock.value,
    hostname: hostname.value,
    env: env.value,
    entrypoint: entrypoint.value,
  };
  return { ok: true, manifest };
}

function field(input: object, key: string): unknown {
  return key in input ? Reflect.get(input, key) : undefined;
}

function fail(reason: string, path: string): FieldFail {
  return { ok: false, reason, path };
}

function parseTier(value: unknown): FieldOutcome<BaoSandboxTier> {
  for (const t of Object.values(BAO_SANDBOX_TIER)) {
    if (value === t) {
      return { ok: true, value: t };
    }
  }
  return fail(`tier must be one of ${Object.values(BAO_SANDBOX_TIER).join("|")}`, "$.tier");
}

function parseIntent(value: unknown): FieldOutcome<BaoSandboxIntent> {
  for (const i of Object.values(BAO_SANDBOX_INTENT)) {
    if (value === i) {
      return { ok: true, value: i };
    }
  }
  return fail("intent must be build|test|run|shell", "$.intent");
}

function parseRootfs(value: unknown): FieldOutcome<BaoSandboxRootfs> {
  if (typeof value !== "object" || value === null) {
    return fail("rootfs missing", "$.rootfs");
  }
  const base = field(value, "base");
  if (typeof base !== "string" || base.length === 0) {
    return fail("rootfs.base missing", "$.rootfs.base");
  }
  const digestVal = field(value, "digest");
  const digest = typeof digestVal === "string" ? digestVal : undefined;
  return { ok: true, value: { base, digest } };
}

function parseMounts(value: unknown): FieldOutcome<readonly BaoSandboxMount[]> {
  if (!Array.isArray(value)) {
    return fail("mounts must be array", "$.mounts");
  }
  const out: BaoSandboxMount[] = [];
  for (let i = 0; i < value.length; i++) {
    const item = value[i];
    if (typeof item !== "object" || item === null) {
      return fail("mount entry must be object", `$.mounts[${i}]`);
    }
    const src = field(item, "src");
    const dst = field(item, "dst");
    const mode = field(item, "mode");
    const maxMiBVal = field(item, "maxMiB");
    if (typeof src !== "string" || src.length === 0) {
      return fail("mount.src missing", `$.mounts[${i}].src`);
    }
    if (typeof dst !== "string" || !dst.startsWith("/")) {
      return fail("mount.dst must be absolute", `$.mounts[${i}].dst`);
    }
    if (mode !== "ro" && mode !== "rw") {
      return fail("mount.mode must be ro|rw", `$.mounts[${i}].mode`);
    }
    const maxMiB = typeof maxMiBVal === "number" ? maxMiBVal : undefined;
    out.push({ src, dst, mode, maxMiB });
  }
  return { ok: true, value: out };
}

function parseNet(value: unknown): FieldOutcome<BaoSandboxNet> {
  if (typeof value !== "object" || value === null) {
    return fail("net missing", "$.net");
  }
  const mode = field(value, "mode");
  if (mode === BAO_SANDBOX_NET_MODE.none) {
    return { ok: true, value: { mode: "none" } };
  }
  if (mode === BAO_SANDBOX_NET_MODE.loopback) {
    return { ok: true, value: { mode: "loopback" } };
  }
  if (mode === BAO_SANDBOX_NET_MODE.full) {
    return { ok: true, value: { mode: "full" } };
  }
  if (mode === BAO_SANDBOX_NET_MODE.egressAllowlist) {
    const egressVal = field(value, "egress");
    if (!Array.isArray(egressVal) || egressVal.length === 0) {
      return fail("egress-allowlist requires non-empty egress", "$.net.egress");
    }
    const out: BaoSandboxNetEgress[] = [];
    for (let i = 0; i < egressVal.length; i++) {
      const item = egressVal[i];
      if (typeof item !== "object" || item === null) {
        return fail("egress entry must be object", `$.net.egress[${i}]`);
      }
      const host = field(item, "host");
      const port = field(item, "port");
      const protocol = field(item, "protocol");
      if (typeof host !== "string" || host.length === 0) {
        return fail("egress.host missing", `$.net.egress[${i}].host`);
      }
      if (typeof port !== "number" || port < 1 || port > 65535) {
        return fail("egress.port must be 1..65535", `$.net.egress[${i}].port`);
      }
      if (protocol !== "tcp" && protocol !== "udp") {
        return fail("egress.protocol must be tcp|udp", `$.net.egress[${i}].protocol`);
      }
      out.push({ host, port, protocol });
    }
    return { ok: true, value: { mode: "egress-allowlist", egress: out } };
  }
  return fail(`unknown net.mode: ${String(mode)}`, "$.net.mode");
}

function parseSyscalls(value: unknown): FieldOutcome<BaoSandboxSyscalls> {
  if (typeof value !== "object" || value === null) {
    return fail("syscalls missing", "$.syscalls");
  }
  const def = field(value, "default");
  let parsedDef: BaoSandboxDefaultAction | undefined;
  for (const v of Object.values(BAO_SANDBOX_DEFAULT_ACTION)) {
    if (def === v) {
      parsedDef = v;
      break;
    }
  }
  if (parsedDef === undefined) {
    return fail("syscalls.default invalid", "$.syscalls.default");
  }
  const errnoVal = field(value, "errno");
  const errno = typeof errnoVal === "number" ? errnoVal : undefined;
  if (parsedDef === "errno" && errno === undefined) {
    return fail("default=errno requires syscalls.errno", "$.syscalls.errno");
  }
  const allowVal = field(value, "allow");
  const denyVal = field(value, "deny");
  const allow = parseStringArrayOrUndefined(allowVal, "$.syscalls.allow");
  if (!allow.ok) return allow;
  const deny = parseStringArrayOrUndefined(denyVal, "$.syscalls.deny");
  if (!deny.ok) return deny;
  return { ok: true, value: { default: parsedDef, errno, allow: allow.value, deny: deny.value } };
}

function parseStringArrayOrUndefined(
  value: unknown,
  path: string,
): FieldOutcome<readonly string[] | undefined> {
  if (value === undefined || value === null) {
    return { ok: true, value: undefined };
  }
  if (!Array.isArray(value)) {
    return fail("must be array of strings", path);
  }
  const out: string[] = [];
  for (let i = 0; i < value.length; i++) {
    const item = value[i];
    if (typeof item !== "string" || item.length === 0) {
      return fail("entry must be non-empty string", `${path}[${i}]`);
    }
    out.push(item);
  }
  return { ok: true, value: out };
}

function parseResources(value: unknown): FieldOutcome<BaoSandboxResources> {
  if (typeof value !== "object" || value === null) {
    return fail("resources missing", "$.resources");
  }
  const cpu = field(value, "cpuMilli");
  const mem = field(value, "memMiB");
  const pid = field(value, "pidLimit");
  if (typeof cpu !== "number" || cpu < 1) {
    return fail("cpuMilli must be ≥1", "$.resources.cpuMilli");
  }
  if (typeof mem !== "number" || mem < 1) {
    return fail("memMiB must be ≥1", "$.resources.memMiB");
  }
  if (typeof pid !== "number" || pid < 1) {
    return fail("pidLimit must be ≥1", "$.resources.pidLimit");
  }
  return {
    ok: true,
    value: {
      cpuMilli: cpu,
      memMiB: mem,
      pidLimit: pid,
      wallMs: numericOpt(value, "wallMs"),
      ioMaxRbps: numericOpt(value, "ioMaxRbps"),
      ioMaxWbps: numericOpt(value, "ioMaxWbps"),
      ioMaxRiops: numericOpt(value, "ioMaxRiops"),
      ioMaxWiops: numericOpt(value, "ioMaxWiops"),
      cpuWeight: numericOpt(value, "cpuWeight"),
      ioWeight: numericOpt(value, "ioWeight"),
      cpusetCpus: stringOpt(value, "cpusetCpus"),
    },
  };
}

function numericOpt(input: object, key: string): number | undefined {
  const v = field(input, key);
  return typeof v === "number" ? v : undefined;
}

function stringOpt(input: object, key: string): string | undefined {
  const v = field(input, key);
  return typeof v === "string" ? v : undefined;
}

function parseOptionalLandlock(value: unknown): FieldOutcome<BaoSandboxLandlock | undefined> {
  if (value === undefined || value === null) {
    return { ok: true, value: undefined };
  }
  if (typeof value !== "object") {
    return fail("landlock must be object", "$.landlock");
  }
  const abi = field(value, "abi");
  if (typeof abi !== "number" || abi < 1) {
    return fail("landlock.abi must be ≥1", "$.landlock.abi");
  }
  const fsVal = field(value, "fs");
  if (!Array.isArray(fsVal)) {
    return fail("landlock.fs must be array", "$.landlock.fs");
  }
  const fsRules: BaoSandboxLandlockFsRule[] = [];
  for (let i = 0; i < fsVal.length; i++) {
    const r = fsVal[i];
    if (typeof r !== "object" || r === null) {
      return fail("fs rule must be object", `$.landlock.fs[${i}]`);
    }
    const path = field(r, "path");
    const access = field(r, "access");
    if (typeof path !== "string" || !path.startsWith("/")) {
      return fail("fs rule.path absolute", `$.landlock.fs[${i}].path`);
    }
    if (!Array.isArray(access)) {
      return fail("fs rule.access must be array", `$.landlock.fs[${i}].access`);
    }
    const accessOut: BaoSandboxLandlockFs[] = [];
    for (let j = 0; j < access.length; j++) {
      const a = access[j];
      let matched: BaoSandboxLandlockFs | undefined;
      for (const v of Object.values(BAO_SANDBOX_LANDLOCK_FS)) {
        if (a === v) {
          matched = v;
          break;
        }
      }
      if (matched === undefined) {
        return fail(`unknown fs access ${String(a)}`, `$.landlock.fs[${i}].access[${j}]`);
      }
      accessOut.push(matched);
    }
    fsRules.push({ path, access: accessOut });
  }
  const netVal = field(value, "net");
  let netRules: readonly BaoSandboxLandlockNetRule[] | undefined;
  if (netVal !== undefined && netVal !== null) {
    if (!Array.isArray(netVal)) {
      return fail("landlock.net must be array", "$.landlock.net");
    }
    const out: BaoSandboxLandlockNetRule[] = [];
    for (let i = 0; i < netVal.length; i++) {
      const r = netVal[i];
      if (typeof r !== "object" || r === null) {
        return fail("net rule must be object", `$.landlock.net[${i}]`);
      }
      const port = field(r, "port");
      const access = field(r, "access");
      if (typeof port !== "number" || port < 1 || port > 65535) {
        return fail("net rule.port must be 1..65535", `$.landlock.net[${i}].port`);
      }
      if (!Array.isArray(access)) {
        return fail("net rule.access must be array", `$.landlock.net[${i}].access`);
      }
      const accessOut: BaoSandboxLandlockNet[] = [];
      for (let j = 0; j < access.length; j++) {
        const a = access[j];
        let matched: BaoSandboxLandlockNet | undefined;
        for (const v of Object.values(BAO_SANDBOX_LANDLOCK_NET)) {
          if (a === v) {
            matched = v;
            break;
          }
        }
        if (matched === undefined) {
          return fail(`unknown net access ${String(a)}`, `$.landlock.net[${i}].access[${j}]`);
        }
        accessOut.push(matched);
      }
      out.push({ port, access: accessOut });
    }
    netRules = out;
  }
  return { ok: true, value: { abi, fs: fsRules, net: netRules } };
}

function parseOptionalString(value: unknown, name: string): FieldOutcome<string | undefined> {
  if (value === undefined || value === null) {
    return { ok: true, value: undefined };
  }
  if (typeof value !== "string") {
    return fail(`${name} must be string`, `$.${name}`);
  }
  return { ok: true, value };
}

function parseEnv(value: unknown): FieldOutcome<readonly BaoSandboxEnv[] | undefined> {
  if (value === undefined || value === null) {
    return { ok: true, value: undefined };
  }
  if (!Array.isArray(value)) {
    return fail("env must be array", "$.env");
  }
  const out: BaoSandboxEnv[] = [];
  for (let i = 0; i < value.length; i++) {
    const item = value[i];
    if (typeof item !== "object" || item === null) {
      return fail("env entry must be object", `$.env[${i}]`);
    }
    const name = field(item, "name");
    if (typeof name !== "string" || !/^[A-Z_][A-Z0-9_]*$/.test(name)) {
      return fail("env.name invalid", `$.env[${i}].name`);
    }
    const valueVal = field(item, "value");
    const fromHost = field(item, "fromHost");
    out.push({
      name,
      value: typeof valueVal === "string" ? valueVal : undefined,
      fromHost: typeof fromHost === "boolean" ? fromHost : undefined,
    });
  }
  return { ok: true, value: out };
}
