import { fileURLToPath } from "node:url";
import { joinCliPath, resolveCliPath } from "./path.js";

function fixturePath(specifier: string): string {
  const pathname = fileURLToPath(new URL(specifier, import.meta.url));
  return pathname.replace(/[\\/]$/, "");
}

describe("baobox cli path helpers", () => {
  const cliRoot = fixturePath("./fixtures/baobox-cli/");
  const cliSrc = fixturePath("./fixtures/baobox-cli/src/");
  const cliShared = fixturePath("./fixtures/baobox-cli/shared/");
  const cliAbsolute = fixturePath("./fixtures/baobox-cli/absolute/");
  const nestedFile = fixturePath("./fixtures/baobox-cli/nested/file.ts");

  test("resolves relative paths against the provided base path", () => {
    expect(resolveCliPath("./src", cliRoot)).toBe(cliSrc);
  });

  test("normalizes parent segments when resolving", () => {
    expect(resolveCliPath("../shared", cliSrc)).toBe(cliShared);
  });

  test("preserves absolute paths", () => {
    expect(resolveCliPath(cliAbsolute)).toBe(cliAbsolute);
  });

  test("joins scan results back onto the base directory", () => {
    expect(joinCliPath(cliRoot, "nested/file.ts")).toBe(nestedFile);
  });
});
