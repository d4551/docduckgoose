/** Deep structural clone using Bun-native structuredClone */
export function Clone<T>(value: T): T {
  return structuredClone(value);
}
