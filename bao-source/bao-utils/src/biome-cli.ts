/**
 * Options for resolving the canonical Biome CLI command.
 *
 * `repoRoot` remains accepted so existing call sites do not need wrapper code.
 */
export type BiomeCommandResolverOptions = {
  repoRoot?: string;
};

/**
 * Resolve the canonical Biome execution command.
 *
 * Uses Bun's package executor (`bunx --bun @biomejs/biome`) so repo scripts
 * resolve the locally installed Biome from `node_modules/@biomejs/biome`
 * without depending on a repo-owned launcher script.
 */
export function resolveBiomeCommand(_options?: BiomeCommandResolverOptions): string[] {
  return ["bunx", "--bun", "@biomejs/biome"];
}
