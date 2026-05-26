/**
 * .bao Composer secure MCP provider add-on.
 *
 * Owns the provider module referenced by the .bao Composer MCP add-on recipe.
 *
 * @packageDocumentation
 */

const providers = [
  {
    id: "bao-composer-secure-provider",
    displayName: ".bao Composer Secure Provider",
  },
] as const;

export { providers };
