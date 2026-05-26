export interface ValidationIssue {
  readonly pass: number;
  readonly code: string;
  readonly message: string;
  readonly path?: string;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly issues: ValidationIssue[];
  readonly pass: number;
}
