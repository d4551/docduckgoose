/**
 * .bao Composer Prisma example extension.
 *
 * Exposes a deterministic Prisma extension factory shape for `.bao` validation.
 *
 * @packageDocumentation
 */

function createPrismaExtension(): { readonly name: string } {
  return { name: "bao-composer-prisma-example" };
}

export { createPrismaExtension };
export default createPrismaExtension;
