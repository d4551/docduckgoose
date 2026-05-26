import type { PackageReadmeContext, ReadmeOverrideEntry } from "./readme-contract.ts";
import { SCOPE_HEADING } from "./readme-contract.ts";

function firstSentence(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return "";
  }
  const match = trimmed.match(/^[^.!?]+[.!?]/);
  return match === null ? trimmed : match[0].trim();
}

function defaultInScope(context: PackageReadmeContext): string[] {
  const items: string[] = [];
  if (context.description.trim().length > 0) {
    items.push(firstSentence(context.description));
  }
  if (context.sourceInsights.topSymbols.length > 0) {
    items.push(
      `Exported API: ${context.sourceInsights.topSymbols.slice(0, 5).join(", ")}${context.sourceInsights.topSymbols.length > 5 ? ", …" : ""}`,
    );
  } else if (context.exportSubpaths.length > 0 && context.exportSubpaths.length <= 8) {
    items.push(`Subpaths: ${context.exportSubpaths.join(", ")}`);
  }
  if (items.length === 0) {
    items.push(`Public contract for \`${context.packageName}\``);
  }
  return items.slice(0, 3);
}

function defaultDependencies(context: PackageReadmeContext): string[] {
  const deps = context.dependencies
    .filter((dep) => dep.startsWith("@baohaus/") || dep.startsWith("@bao"))
    .slice(0, 6);
  if (deps.length > 0) {
    return deps;
  }
  if (context.catalogEntry !== null) {
    return ["bao-governance.json", "bao.lock", "catalog row"];
  }
  return ["Shared @baohaus contracts"];
}

function defaultOutOfScope(context: PackageReadmeContext): string[] {
  const id = context.id;
  if (context.packageKind === "runtime-package") {
    return ["Per-app business databases", "OCI publish pipeline"];
  }
  if (id.startsWith("auth-")) {
    return ["Unrelated UI pages", "Non-auth crypto primitives"];
  }
  if (id.startsWith("crypto-")) {
    return ["HTTP route trees", "End-user profile storage"];
  }
  if (context.packageKind === "extension") {
    return ["Host boot order", "Registry catalog authoring"];
  }
  return ["Other .bao crate domains", "bao-runtime host lifecycle"];
}

function tableRow(cells: readonly string[]): string {
  return `| ${cells.join(" | ")} |`;
}

export function renderScopeTable(
  context: PackageReadmeContext,
  override: ReadmeOverrideEntry | undefined,
): string {
  const inScope = override?.owns ?? override?.inScope ?? defaultInScope(context);
  const dependencies = override?.consumes ?? override?.dependencies ?? defaultDependencies(context);
  const outOfScope = override?.neverOwns ?? override?.outOfScope ?? defaultOutOfScope(context);

  const formatList = (values: readonly string[]): string =>
    values.map((value) => value.replace(/\|/g, "\\|")).join("; ");

  return [
    SCOPE_HEADING,
    "",
    tableRow(["In scope", "Dependencies", "Out of scope"]),
    tableRow(["---", "---", "---"]),
    tableRow([formatList(inScope), formatList(dependencies), formatList(outOfScope)]),
  ].join("\n");
}
