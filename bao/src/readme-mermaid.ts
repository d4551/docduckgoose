import type { MermaidDiagramKind, PackageReadmeContext } from "./readme-contract.ts";
import { pickMermaidDiagramKind } from "./readme-contract.ts";

function labelFromId(id: string): string {
  return id.replace(/-/g, "_");
}

function flowchartDiagram(context: PackageReadmeContext): string {
  const pkg = labelFromId(context.id);
  return [
    "flowchart LR",
    `  producer["${context.packageName}"] --> crate[".${pkg} crate"]`,
    '  crate --> consumers["Host apps and benches"]',
  ].join("\n");
}

function sequenceDiagram(context: PackageReadmeContext): string {
  const pkg = context.packageName;
  return [
    "sequenceDiagram",
    "  participant Client",
    `  participant ${labelFromId(context.id)} as ${pkg}`,
    "  participant Store",
    `  Client->>${labelFromId(context.id)}: HTTP request`,
    `  ${labelFromId(context.id)}->>Store: read/write`,
    `  Store-->>${labelFromId(context.id)}: result`,
    `  ${labelFromId(context.id)}-->>Client: response`,
  ].join("\n");
}

function stateDiagramSdk(): string {
  return [
    "stateDiagram-v2",
    "  [*] --> Detected",
    "  Detected --> Loaded: load()",
    "  Loaded --> Active: activate()",
    "  Active --> Suspended: suspend()",
    "  Suspended --> Active: resume()",
    "  Active --> Unloaded: unload()",
    "  Unloaded --> [*]",
  ].join("\n");
}

function runtimePackageDiagram(context: PackageReadmeContext): string {
  return [
    "flowchart TB",
    '  registry[".bao registry shelf"]',
    `  runtime["${context.packageName}"]`,
    '  host["Host shell"]',
    '  tiles["Extension tiles"]',
    "  registry --> runtime",
    "  runtime --> host",
    "  host --> tiles",
  ].join("\n");
}

function extensionDiagram(context: PackageReadmeContext): string {
  return [
    "flowchart LR",
    '  host["Host runtime"]',
    `  ext["${context.packageName}"]`,
    '  ui["Sidebar / settings / commands"]',
    "  host --> ext",
    "  ext --> ui",
  ].join("\n");
}

function federationDiagram(context: PackageReadmeContext): string {
  return [
    "sequenceDiagram",
    "  participant Local as Local site",
    `  participant Pkg as ${context.packageName}`,
    "  participant Peer as Peer site",
    "  Local->>Pkg: publish contribution",
    "  Pkg->>Peer: signed pull",
    "  Peer-->>Pkg: bundle",
    "  Pkg-->>Local: merged catalog",
  ].join("\n");
}

function renderDiagramBody(kind: MermaidDiagramKind, context: PackageReadmeContext): string {
  if (context.id === "bao-sdk" || context.packageName.endsWith("/bao-sdk")) {
    return stateDiagramSdk();
  }
  if (
    context.id.includes("federation") ||
    context.id.includes("contribution") ||
    context.packageName.includes("contribution-host")
  ) {
    return federationDiagram(context);
  }
  if (context.packageKind === "runtime-package") {
    return runtimePackageDiagram(context);
  }
  if (context.packageKind === "extension") {
    return extensionDiagram(context);
  }
  if (kind === "sequenceDiagram") {
    return sequenceDiagram(context);
  }
  return flowchartDiagram(context);
}

export function renderMermaidBlock(
  context: PackageReadmeContext,
  overrideBody: string | undefined,
): string {
  const body =
    overrideBody !== undefined && overrideBody.trim().length > 0
      ? overrideBody.trim()
      : renderDiagramBody(pickMermaidDiagramKind(context), context);
  return ["```mermaid", body, "```"].join("\n");
}
