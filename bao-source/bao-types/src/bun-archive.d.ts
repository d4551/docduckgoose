/**
 * Bun Archive runtime types.
 *
 * Bun exposes `Bun.Archive` at runtime, but the local type surface in this
 * workspace does not currently include it. This declaration keeps archive
 * helpers fully typed without introducing assertions or shims.
 */

declare module "bun" {
  export type ArchiveInput =
    | Record<string, string | Blob | ArrayBufferLike | ArrayBufferView>
    | Blob
    | ArrayBufferLike
    | ArrayBufferView;

  export interface ArchiveOptions {
    compress?: "gzip";
    level?: number;
  }

  export interface ArchiveExtractOptions {
    glob?: string | readonly string[];
  }

  export class Archive {
    constructor(data: ArchiveInput, options?: ArchiveOptions);
    extract(path: string, options?: ArchiveExtractOptions): Promise<number>;
    blob(): Promise<Blob>;
    bytes(): Promise<Uint8Array<ArrayBuffer>>;
    files(glob?: string | readonly string[]): Promise<Map<string, File>>;
  }
}

export {};
