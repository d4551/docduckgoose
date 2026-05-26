/**
 * @baohaus/yaml-bao/./parse
 *
 * Bao-native YAML parser entry point.
 * Domain: content
 */

import { type ParseOptions, parseYAML } from "./index.ts";

const PACKAGE_NAME = "@baohaus/yaml-bao" as const;

const parse = parseYAML;

export type { ParseOptions };
export { PACKAGE_NAME, parse, parseYAML };
