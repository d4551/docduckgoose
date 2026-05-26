import type { PackageReadmeContext, ReadmeOverrideEntry } from "./readme-contract.ts";
import { countSentences, MIN_ELI5_CHARACTERS, MIN_ELI5_SENTENCES } from "./readme-contract.ts";

const MAX_ELI5_CHARACTERS = 480;

const GENERIC_ONLY_PATTERNS = [
  /^this workbench is a shared parts crate/i,
  /^this workbench is a labeled tool crate/i,
  /^host apps consume it through/i,
] as const;

function takeSentences(text: string, maxSentences: number): string {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return "";
  }
  const parts = trimmed.split(/(?<=[.!?])\s+/).filter((part) => part.trim().length > 0);
  if (parts.length === 0) {
    return trimmed;
  }
  return parts.slice(0, maxSentences).join(" ").trim();
}

function trimEli5(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= MAX_ELI5_CHARACTERS) {
    return trimmed;
  }
  return `${trimmed.slice(0, MAX_ELI5_CHARACTERS - 1).trimEnd()}…`;
}

function humanPackageName(context: PackageReadmeContext): string {
  return context.id.replace(/-/g, " ");
}

function domainHook(context: PackageReadmeContext): string | null {
  const id = context.id;
  if (id === "bao-runtime") {
    return "Think of bao-runtime as the goose-run loading dock that opens first: it checks .bao crates, shared login, menus, and add-on slots.";
  }
  if (id === "bao-registry") {
    return "Think of the registry as the shelf map: it tells the goose which .bao crate exists, which version it is, and how OCI delivers it.";
  }
  if (id === "bao-sdk") {
    return "Think of bao-sdk as the crate instruction card: detect, load, activate, suspend, resume, and unload without leaving loose parts.";
  }
  if (id.startsWith("auth-") || id === "auth-bao") {
    return `Think of ${humanPackageName(context)} as the badge crate: it lets the right people into the goose mailroom without putting secrets in the browser.`;
  }
  if (id.startsWith("crypto-")) {
    return `Think of ${humanPackageName(context)} as the sealed-envelope crate: messages go in locked, and only the right recipient opens them.`;
  }
  if (id.includes("contribution") || id.includes("federation")) {
    return `Think of ${humanPackageName(context)} as the guest crate where apps register menus and trade signed snapshot cards with friend sites.`;
  }
  if (id.startsWith("pathology-")) {
    return `Think of ${humanPackageName(context)} as the slide-label crate: it keeps pathology images and reviews sorted for clinical apps.`;
  }
  if (id.startsWith("htmx-")) {
    return `Think of ${humanPackageName(context)} as the fresh-panel crate: buttons ask the server for new HTML without a heavy client app.`;
  }
  if (id.includes("mcp")) {
    return `Think of ${humanPackageName(context)} as the robot-arm crate: hosts pick which MCP tool connects to which job.`;
  }
  if (id.includes("bunbuddy")) {
    return `Think of ${humanPackageName(context)} as a pocket-helper crate for one device skill the runtime loads when needed.`;
  }
  if (context.packageKind === "runtime-package") {
    return `Think of ${humanPackageName(context)} as the host crate that opens before any .bao add-on can run.`;
  }
  if (context.packageKind === "extension") {
    return `Think of ${humanPackageName(context)} as an add-on crate that snaps into the host sidebar, settings, or command list.`;
  }
  return null;
}

function concreteUsageSentence(context: PackageReadmeContext): string {
  const symbols = context.sourceInsights.topSymbols;
  if (symbols.length > 0) {
    const shown = symbols
      .slice(0, 3)
      .map((symbol) => `\`${symbol}\``)
      .join(", ");
    return `Apps use exports such as ${shown} from \`${context.packageName}\`.`;
  }
  const subpaths = context.exportSubpaths.filter((entry) => entry !== ".");
  if (subpaths.length > 0) {
    const shown = subpaths
      .slice(0, 4)
      .map((entry) => `\`${entry}\``)
      .join(", ");
    return `Import subpaths like ${shown} when this crate joins the goose mailroom.`;
  }
  if (context.catalogEntry !== null && context.catalogEntry.composeDependencies.length > 0) {
    const consumers = context.catalogEntry.composeDependencies.slice(0, 3).join(", ");
    return `Downstream packages such as ${consumers} depend on this crate.`;
  }
  return `Publish name: \`${context.packageName}\` on the Baohaus registry.`;
}

function buildFromDescription(context: PackageReadmeContext): string {
  const description = context.description.trim();
  const hook = domainHook(context);
  const usage = concreteUsageSentence(context);

  if (description.length >= 80) {
    const core = takeSentences(description, 2);
    const hookPrefix =
      hook !== null && !core.toLowerCase().includes(context.id.replace(/-/g, " "))
        ? `${hook} `
        : "";
    return trimEli5(`${hookPrefix}${core} ${usage}`);
  }

  if (description.length > 0) {
    const normalized = description.endsWith(".") ? description : `${description}.`;
    if (hook !== null) {
      return trimEli5(`${hook} ${usage}`);
    }
    return trimEli5(`${normalized} ${usage}`);
  }

  if (hook !== null) {
    return trimEli5(`${hook} ${usage}`);
  }

  return trimEli5(
    `This crate is \`${context.packageName}\` at \`${context.sourcePath}\`. ${usage}`,
  );
}

function ensureMinimumEli5(text: string): string {
  let result = text.trim();
  if (countSentences(result) < MIN_ELI5_SENTENCES) {
    const lead = result.endsWith(".") || result.length === 0 ? result : `${result}.`;
    result = `${lead} It is part of the Baohaus goose mailroom for .bao crates.`;
  }
  if (result.length < MIN_ELI5_CHARACTERS) {
    result = `${result} See the Scope table and package card for proof commands.`;
  }
  return trimEli5(result);
}

export function renderTaxonomyEli5(context: PackageReadmeContext): string {
  return ensureMinimumEli5(buildFromDescription(context));
}

function anchorEli5ToPackage(text: string, context: PackageReadmeContext): string {
  if (eli5ReferencesPackage(text, context)) {
    return text;
  }
  const label = context.id.includes("/") ? context.packageName : context.id;
  return `${label}: ${text}`;
}

export function resolveEli5(
  context: PackageReadmeContext,
  override: ReadmeOverrideEntry | undefined,
): string {
  const curated = override?.eli5 ?? override?.overview;
  if (curated !== undefined && curated.trim().length > 0) {
    return ensureMinimumEli5(anchorEli5ToPackage(curated.trim(), context));
  }
  return renderTaxonomyEli5(context);
}

export function eli5ReferencesPackage(body: string, context: PackageReadmeContext): boolean {
  const lower = body.toLowerCase();
  if (lower.includes(context.id.replace(/-/g, " ")) || lower.includes(context.id)) {
    return true;
  }
  for (const part of context.id.split("-")) {
    if (part.length >= 4 && lower.includes(part)) {
      return true;
    }
  }
  const scoped = context.packageName.split("/").pop() ?? context.packageName;
  if (scoped.length >= 4 && lower.includes(scoped.toLowerCase())) {
    return true;
  }
  if (lower.includes(context.packageName.toLowerCase())) {
    return true;
  }
  for (const symbol of context.sourceInsights.topSymbols.slice(0, 8)) {
    if (lower.includes(symbol.toLowerCase())) {
      return true;
    }
  }
  for (const subpath of context.exportSubpaths.slice(0, 8)) {
    const slug = subpath.replace(/^\.\//, "");
    if (slug.length > 2 && lower.includes(slug.replace(/-/g, " "))) {
      return true;
    }
  }
  const descWords = context.description
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 5);
  let hits = 0;
  for (const word of descWords.slice(0, 15)) {
    if (lower.includes(word)) {
      hits += 1;
    }
  }
  return hits >= 2;
}

export function eli5LooksGenericOnly(body: string): boolean {
  const trimmed = body.trim();
  return GENERIC_ONLY_PATTERNS.some((pattern) => pattern.test(trimmed));
}
