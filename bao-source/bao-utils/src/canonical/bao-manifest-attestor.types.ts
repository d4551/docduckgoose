export interface VexStatement {
  readonly vulnerability: { readonly name: string; readonly description?: string };
  readonly products: ReadonlyArray<{ readonly id: string }>;
  readonly status: "not_affected" | "affected" | "fixed" | "under_investigation";
  readonly justification?:
    | "component_not_present"
    | "vulnerable_code_not_present"
    | "vulnerable_code_not_in_execute_path"
    | "vulnerable_code_cannot_be_controlled_by_adversary"
    | "inline_mitigations_already_exist";
  readonly impactStatement?: string;
  readonly actionStatement?: string;
}

export interface OpenVexDocument {
  readonly "@context": "https://openvex.dev/ns/v0.2.0";
  readonly "@id": string;
  readonly author: string;
  readonly role: "document author";
  readonly timestamp: string;
  readonly version: 1;
  readonly statements: readonly VexStatement[];
}
