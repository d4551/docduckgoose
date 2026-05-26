/**
 * @baohaus/yaml-bao/./stringify
 *
 * Bao-native YAML stringifier entry point.
 * Domain: content
 */

import { stringifyYAML } from "./index.ts";

const PACKAGE_NAME = "@baohaus/yaml-bao" as const;

const stringify = stringifyYAML;

export { PACKAGE_NAME, stringify, stringifyYAML };
