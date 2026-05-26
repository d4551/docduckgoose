import { $ } from "bun";

await $`bunx --bun tsc --project tsconfig.json`;

const cssSource = Bun.file("src/templates/styles/templates.css");
if (await cssSource.exists()) {
  await $`mkdir -p dist/templates/styles`;
  await Bun.write("dist/templates/styles/templates.css", cssSource);
}
