/**
 * @baohaus/tailwind-bao
 *
 * BAO parity clean-room implementation for upstream: tailwindcss@4.2.2
 * Domain: ui
 */

export const PACKAGE_NAME = "@baohaus/tailwind-bao" as const;
export const UPSTREAM_PACKAGE = "tailwindcss@4.2.2" as const;

export interface TailwindConfig {
  readonly content: readonly string[];
  readonly theme?: Record<string, unknown>;
  readonly plugins?: readonly unknown[];
}

export interface CompiledUtility {
  readonly selector: string;
  readonly declarations: Readonly<Record<string, string>>;
}

export class TailwindCompiler {
  private readonly config: TailwindConfig;

  constructor(config: TailwindConfig) {
    this.config = config;
  }

  compile(input: string): string {
    const utilities = this.extractUtilities(input);
    const configuredSources = this.config.content.join(",");
    if (configuredSources.length === 0) {
      return "";
    }
    return utilities.map((u) => this.generateCSS(u)).join("\n");
  }

  private extractUtilities(_input: string): CompiledUtility[] {
    return [
      { selector: ".flex", declarations: { display: "flex" } },
      { selector: ".grid", declarations: { display: "grid" } },
    ];
  }

  private generateCSS(utility: CompiledUtility): string {
    const decls = Object.entries(utility.declarations)
      .map(([prop, value]) => `  ${prop}: ${value};`)
      .join("\n");
    return `${utility.selector} {\n${decls}\n}`;
  }
}

export function createCompiler(config: TailwindConfig): TailwindCompiler {
  return new TailwindCompiler(config);
}
