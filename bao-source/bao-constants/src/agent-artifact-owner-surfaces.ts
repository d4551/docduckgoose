export const AGENT_ARTIFACT_OWNER_SURFACES = [
  "bao-agent",
  "bao-desktop",
  "forge",
  "bao-registry",
  "bao-runtime",
] as const;

export type AgentArtifactOwnerSurface = (typeof AGENT_ARTIFACT_OWNER_SURFACES)[number];

const AGENT_ARTIFACT_OWNER_SURFACE_VALUES: readonly string[] = AGENT_ARTIFACT_OWNER_SURFACES;

export function isAgentArtifactOwnerSurface(
  value: string | null | undefined,
): value is AgentArtifactOwnerSurface {
  return typeof value === "string" && AGENT_ARTIFACT_OWNER_SURFACE_VALUES.includes(value);
}
