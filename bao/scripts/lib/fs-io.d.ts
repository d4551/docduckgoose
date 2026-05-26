type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonObject {
  readonly [key: string]: JsonField;
}
export declare const sha256Hex: (value: string | Uint8Array | ArrayBuffer) => string;
export declare const sha256Base64: (value: string | Uint8Array | ArrayBuffer) => string;
export declare const canonicalJson: (value: object | JsonValue) => string;
export declare const spawnChecked: (args: readonly string[], failure: string) => void;
export declare const listTarMembers: (archive: string) => string[];
export declare const readTarMember: (archive: string, member: string) => Uint8Array;
//# sourceMappingURL=fs-io.d.ts.map
