export type IgnorePattern = string | RegExp;

export interface FileStats {
  readonly size: number;
  readonly mtimeMs: number;
  isFile(): boolean;
  isDirectory(): boolean;
}

export type ParsedRange =
  | { readonly kind: "none" }
  | { readonly kind: "invalid" }
  | { readonly kind: "unsatisfiable"; readonly size: number }
  | { readonly kind: "satisfiable"; readonly start: number; readonly end: number };

export interface SelectedFile {
  readonly finalPath: string;
  readonly finalStat: FileStats;
  readonly contentEncoding: string | undefined;
}

export interface StaticOptions {
  readonly assets?: string;
  readonly prefix?: string;
  readonly indexHTML?: boolean;
  readonly ignorePatterns?: readonly IgnorePattern[];
  readonly headers?: Readonly<Record<string, string>>;
  readonly etag?: boolean;
  readonly maxAge?: number;
  readonly directive?: string;
}
