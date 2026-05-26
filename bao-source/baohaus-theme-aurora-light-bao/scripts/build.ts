import { $ } from "bun";

await $`bun build ./src/index.ts --outdir ./dist --target bun --format esm --splitting --minify`;
