import {
  ARCHIVE_ENTRIES,
  BAO_MANIFEST_FILE_IDENTIFIER,
  isValidArchiveEntry,
} from "@baohaus/bao-contracts/bao/bao-archive.contract";
import { type BaoManifest, isBaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import { readBaoArchiveEntries } from "./bao-archive.ts";
import {
  encodeBaoManifestSignaturePayload,
  isCanonicalBaoManifestBin,
  readBaoManifestBinIdentifier,
} from "./bao-manifest-bin.ts";
import { base64ToBytes, verifyManifestBinEd25519 } from "./bao-manifest-signer.ts";
import type {
  ValidationContext,
  ValidationGateResult,
  ValidationReport,
} from "./bao-manifest-validator.types.ts";
import {
  BAO_VALIDATION_GATE_IDS,
  checkBeforeAfterReferences,
  checkBinJsonParity,
  checkCompatibilityMatrix,
  checkComplianceTagsPresent,
  checkDependencyGraph,
  checkJsonSchema,
  checkLifecycleHookPaths,
  checkMerkleRoot,
  checkPerFileSha256,
  checkSbomIntegrity,
  checkTargetIdUniqueness,
  checkTargetKindPayloads,
  checkTrustPolicy,
  resolveInstallOrder as resolveInstallOrderFromGates,
} from "./bao-manifest-validator-gates.ts";

const BASE64_ENCODED_QUANTUM_SIZE = 4;
const JSON_ESCAPE_CHARACTER_CODE = "\\".charCodeAt(0);
const JSON_STRING_DELIMITER_CHARACTER_CODE = '"'.charCodeAt(0);
const JSON_OBJECT_OPEN_CHARACTER_CODE = "{".charCodeAt(0);
const JSON_ARRAY_OPEN_CHARACTER_CODE = "[".charCodeAt(0);
const JSON_OBJECT_CLOSE_CHARACTER_CODE = "}".charCodeAt(0);
const JSON_ARRAY_CLOSE_CHARACTER_CODE = "]".charCodeAt(0);
const MANIFEST_BIN_HEADER_LENGTH_BYTES = 8;

function buildReport(
  gates: ValidationGateResult[],
  allIssues: string[],
  installOrder: readonly string[] | undefined,
): ValidationReport {
  const valid = gates.every((gate) => gate.valid);
  return {
    valid,
    gates,
    ...(allIssues.length > 0 ? { issues: allIssues } : {}),
    ...(installOrder === undefined ? {} : { resolvedInstallOrder: installOrder }),
  };
}

function gateResult(
  gate: number,
  name: string,
  issues: readonly string[] = [],
): ValidationGateResult {
  return { gate, name, valid: issues.length === 0, issues };
}

function isBase64Like(value: string): boolean {
  return (
    value.length > 0 &&
    value.length % BASE64_ENCODED_QUANTUM_SIZE === 0 &&
    /^[A-Za-z0-9+/]*={0,2}$/u.test(value)
  );
}

function equalBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) {
    return false;
  }

  for (let index = 0; index < left.byteLength; index += 1) {
    if (left[index] !== right[index]) {
      return false;
    }
  }

  return true;
}

function collectSignatureConsistencyIssues(params: {
  manifest: BaoManifest;
  signatureBytes: Uint8Array | undefined;
}): string[] {
  const { manifest, signatureBytes } = params;
  const issues: string[] = [];
  const declaredSignature = manifest.metadata.signature;
  const declaredSignatureValue = declaredSignature?.value ?? "";
  const hasDeclaredSignature = declaredSignatureValue.length > 0;

  if (hasDeclaredSignature && !signatureBytes) {
    issues.push("manifest.signature missing");
  }
  if (!hasDeclaredSignature && signatureBytes) {
    issues.push("metadata.signature.value missing");
  }
  if (hasDeclaredSignature && !isBase64Like(declaredSignatureValue)) {
    issues.push("metadata.signature.value is not valid base64");
  }
  if (
    hasDeclaredSignature &&
    signatureBytes &&
    isBase64Like(declaredSignatureValue) &&
    !equalBytes(signatureBytes, base64ToBytes(declaredSignatureValue))
  ) {
    issues.push("manifest.signature does not match metadata.signature.value");
  }

  return issues;
}

async function verifySignatureMaterial(params: {
  manifest: BaoManifest;
  signatureBytes: Uint8Array | undefined;
  context: ValidationContext;
}): Promise<string[]> {
  const { manifest, signatureBytes, context } = params;

  if (!signatureBytes) {
    return ["manifest.signature missing"];
  }
  const declaredSignature = manifest.metadata.signature;
  if (!declaredSignature) {
    return ["metadata.signature missing"];
  }
  if (declaredSignature.algorithm !== "ed25519") {
    return [
      `non-ed25519 signature verification requires external client: ${declaredSignature.algorithm}`,
    ];
  }
  if (!declaredSignature.keyId) {
    return ["metadata.signature.keyId missing"];
  }
  if (!context.publicKeyResolver) {
    return ["publicKeyResolver not provided"];
  }

  const publicKey = await context.publicKeyResolver(declaredSignature.keyId);
  if (!publicKey) {
    return [`publicKey not resolved for keyId ${declaredSignature.keyId}`];
  }

  const signaturePayload = encodeBaoManifestSignaturePayload(manifest);
  const result = await verifyManifestBinEd25519(
    signaturePayload,
    base64ToBytes(declaredSignature.value),
    publicKey,
  );

  return result.valid ? [] : [result.reason ?? "signature invalid"];
}

interface ManifestParseGate extends ValidationGateResult {
  readonly manifest?: BaoManifest;
}

interface BalanceState {
  depth: number;
  inString: boolean;
  escaped: boolean;
}

function advanceString(state: BalanceState, char: number): void {
  if (char === JSON_ESCAPE_CHARACTER_CODE) {
    state.escaped = true;
  } else if (char === JSON_STRING_DELIMITER_CHARACTER_CODE) {
    state.inString = false;
  }
}

function advanceStructural(state: BalanceState, char: number): boolean {
  if (char === JSON_STRING_DELIMITER_CHARACTER_CODE) {
    state.inString = true;
  } else if (char === JSON_OBJECT_OPEN_CHARACTER_CODE || char === JSON_ARRAY_OPEN_CHARACTER_CODE) {
    state.depth += 1;
  } else if (
    char === JSON_OBJECT_CLOSE_CHARACTER_CODE ||
    char === JSON_ARRAY_CLOSE_CHARACTER_CODE
  ) {
    state.depth -= 1;
    if (state.depth < 0) {
      return false;
    }
  }
  return true;
}

function isLikelyBalancedJson(text: string): boolean {
  const state: BalanceState = { depth: 0, inString: false, escaped: false };
  for (let index = 0; index < text.length; index += 1) {
    const char = text.charCodeAt(index);
    if (state.escaped) {
      state.escaped = false;
    } else if (state.inString) {
      advanceString(state, char);
    } else if (!advanceStructural(state, char)) {
      return false;
    }
  }
  return state.depth === 0 && !state.inString;
}

function parseManifestBytes(bytes: Uint8Array): BaoManifest | undefined {
  const text = new TextDecoder().decode(bytes);
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return;
  }
  if (!(trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    return;
  }
  if (!isLikelyBalancedJson(trimmed)) {
    return;
  }
  const decoded: unknown = JSON.parse(trimmed);
  return isBaoManifest(decoded) ? decoded : undefined;
}

function checkManifestJsonParse(entries: ReadonlyMap<string, Uint8Array>): ManifestParseGate {
  const json = entries.get(ARCHIVE_ENTRIES.MANIFEST_JSON);
  if (!json) {
    return {
      ...gateResult(BAO_VALIDATION_GATE_IDS.manifestJsonParse, "manifest-json-parse", [
        "manifest.json missing",
      ]),
    };
  }

  const manifest = parseManifestBytes(json);
  if (!manifest) {
    return {
      ...gateResult(BAO_VALIDATION_GATE_IDS.manifestJsonParse, "manifest-json-parse", [
        "manifest.json unparseable or malformed",
      ]),
    };
  }

  return {
    ...gateResult(BAO_VALIDATION_GATE_IDS.manifestJsonParse, "manifest-json-parse"),
    manifest,
  };
}

function checkArchiveLayout(archiveBytes: Uint8Array): ValidationGateResult {
  if (archiveBytes.length === 0) {
    return gateResult(BAO_VALIDATION_GATE_IDS.archiveLayout, "archive-layout", [
      "archive is empty",
    ]);
  }

  const issues = [...readBaoArchiveEntries(archiveBytes).keys()].flatMap((path) =>
    isValidArchiveEntry(path) ? [] : [`invalid archive entry: ${path}`],
  );

  return gateResult(BAO_VALIDATION_GATE_IDS.archiveLayout, "archive-layout", issues);
}

function checkFlatBuffersHeader(entries: ReadonlyMap<string, Uint8Array>): ValidationGateResult {
  const bin = entries.get(ARCHIVE_ENTRIES.MANIFEST_BIN);

  if (!bin) {
    return gateResult(BAO_VALIDATION_GATE_IDS.manifestBinHeader, "manifest-bin-header");
  }
  if (bin.length < MANIFEST_BIN_HEADER_LENGTH_BYTES) {
    return gateResult(BAO_VALIDATION_GATE_IDS.manifestBinHeader, "manifest-bin-header", [
      "manifest.bin too small for header",
    ]);
  }

  const identifier = readBaoManifestBinIdentifier(bin);
  return isCanonicalBaoManifestBin(bin)
    ? gateResult(BAO_VALIDATION_GATE_IDS.manifestBinHeader, "manifest-bin-header")
    : gateResult(BAO_VALIDATION_GATE_IDS.manifestBinHeader, "manifest-bin-header", [
        `file identifier mismatch: expected ${BAO_MANIFEST_FILE_IDENTIFIER}, got ${identifier ?? "missing"}`,
      ]);
}

async function checkSignature(
  entries: ReadonlyMap<string, Uint8Array>,
  context: ValidationContext,
): Promise<ValidationGateResult> {
  const signatureBytes = entries.get(ARCHIVE_ENTRIES.MANIFEST_SIGNATURE);
  const json = entries.get(ARCHIVE_ENTRIES.MANIFEST_JSON);
  if (!json) {
    return gateResult(BAO_VALIDATION_GATE_IDS.signatureVerify, "signature-verify", [
      "manifest.json missing",
    ]);
  }

  const manifest = parseManifestBytes(json);
  if (!manifest) {
    return gateResult(BAO_VALIDATION_GATE_IDS.signatureVerify, "signature-verify", [
      "manifest.json unparseable",
    ]);
  }
  const issues = collectSignatureConsistencyIssues({ manifest, signatureBytes });
  if (!context.verifySignature) {
    return gateResult(BAO_VALIDATION_GATE_IDS.signatureVerify, "signature-verify", issues);
  }
  const verificationIssues = await verifySignatureMaterial({
    manifest,
    signatureBytes,
    context,
  });

  return gateResult(
    BAO_VALIDATION_GATE_IDS.signatureVerify,
    "signature-verify",
    verificationIssues.length === 0 ? issues : [...issues, ...verificationIssues],
  );
}

export async function validateBaoArchive(
  archiveBytes: Uint8Array,
  context: ValidationContext = {},
): Promise<ValidationReport> {
  const gates: ValidationGateResult[] = [];
  const allIssues: string[] = [];

  const layout = checkArchiveLayout(archiveBytes);
  gates.push(layout);
  allIssues.push(...layout.issues);
  if (!layout.valid) {
    return buildReport(gates, allIssues, undefined);
  }

  const entries = readBaoArchiveEntries(archiveBytes);

  const jsonGate = checkManifestJsonParse(entries);
  gates.push(jsonGate);
  allIssues.push(...jsonGate.issues);
  if (!(jsonGate.valid && jsonGate.manifest)) {
    return buildReport(gates, allIssues, undefined);
  }

  const headerGate = checkFlatBuffersHeader(entries);
  gates.push(headerGate);
  allIssues.push(...headerGate.issues);

  const signatureGate = await checkSignature(entries, context);
  gates.push(signatureGate);
  allIssues.push(...signatureGate.issues);

  const { manifest } = jsonGate;
  const remainingGates: Array<ValidationGateResult | Promise<ValidationGateResult>> = [
    checkJsonSchema(manifest),
    checkBinJsonParity(entries, manifest),
    checkPerFileSha256(entries, manifest),
    checkMerkleRoot(entries),
    checkTargetKindPayloads(manifest),
    checkTargetIdUniqueness(manifest),
    checkDependencyGraph(manifest),
    checkBeforeAfterReferences(manifest),
    checkCompatibilityMatrix(manifest, context),
    checkLifecycleHookPaths(entries, manifest),
    checkTrustPolicy(manifest, context),
    checkComplianceTagsPresent(manifest),
    checkSbomIntegrity(entries, manifest),
  ];

  for (const gate of remainingGates) {
    const resolvedGate = await gate;
    gates.push(resolvedGate);
    allIssues.push(...resolvedGate.issues);
  }

  return buildReport(gates, allIssues, resolveInstallOrder(manifest));
}

export type {
  ValidationContext,
  ValidationGateResult,
  ValidationReport,
} from "./bao-manifest-validator.types.ts";

export function resolveInstallOrder(manifest: BaoManifest): string[] {
  return resolveInstallOrderFromGates(manifest);
}
