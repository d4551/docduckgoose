/**
 * Promise settlement without try/catch — rejections become typed `Settled` envelopes.
 */

export type Settled<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly cause: Error };

export function settle<T>(promise: Promise<T>): Promise<Settled<T>> {
  return new Promise<Settled<T>>((resolve) => {
    promise.then(
      (value: T) => {
        resolve({ ok: true, value });
      },
      (reason) => {
        const cause = reason instanceof Error ? reason : new Error(String(reason));
        resolve({ ok: false, cause });
      },
    );
  });
}
