/**
 * SSR-Safe Utilities
 *
 * Provides utilities for handling Server-Side Rendering (SSR) scenarios
 * where browser APIs (window, document, localStorage) are not available. These helpers
 * enable safe feature detection and deterministic server-side execution.
 *
 * Key Features:
 * - Environment detection (browser vs server)
 * - SSR-safe localStorage state holder (zero external dependencies)
 * - Deterministic server-side reads and writes without browser APIs
 * - Type-safe with full TypeScript support
 *
 * Common Use Cases:
 * - Conditional rendering based on environment
 * - Safe access to browser-only APIs
 * - Persistent state management with SSR-aware codecs
 * - Progressive enhancement patterns
 *
 * Architecture:
 * - Uses typeof checks for reliable environment detection
 * - Native localStorage with caller-owned JSON validation
 * - Works seamlessly with HTMX server-rendered and JS island modes
 *
 * @packageDocumentation
 */

/**
 * Indicates if code is running in browser environment.
 *
 * Use this flag for conditional logic that requires browser APIs.
 * Returns false during server-side rendering.
 *
 * @constant {boolean}
 *
 * @example
 * ```ts
 * if (isBrowser) {
 *   const width = window.innerWidth;
 * }
 *
 * const analytics = isBrowser ? new Analytics() : null;
 * ```
 */
export const isBrowser: boolean = typeof window !== "undefined";

/**
 * Indicates if document API is available.
 *
 * Use this flag for DOM manipulation and document-specific operations.
 * Returns false during server-side rendering.
 *
 * @constant {boolean}
 *
 * @example
 * ```ts
 * if (hasDocument) {
 *   const element = document.getElementById('root');
 *   document.title: string = 'My App';
 * }
 *
 * const updateTheme = (theme: string) => {
 *   if (hasDocument) {
 *     document.documentElement.setAttribute('data-theme', theme);
 *   }
 * };
 * ```
 */
export const hasDocument: boolean = typeof document !== "undefined";

/**
 * Codec for localStorage JSON payloads.
 *
 * The parse step owns runtime validation so callers do not need generic JSON
 * casts at the storage boundary.
 */
export interface LocalStorageCodec<T> {
  parse(value: unknown): T;
  serialize(value: T): unknown;
}

/**
 * SSR-safe accessor for localStorage values with caller-owned JSON validation.
 *
 * Returned object provides `get()` / `set()` / `remove()` methods.
 * On the server (no `window`), the accessor stores values in a request-local
 * closure so reads after writes are deterministic during SSR.
 *
 * @typeParam T - Type of the stored value
 * @param key - localStorage key
 * @param initialValue - Fallback when key is absent or on server
 * @returns Object with typed `get`, `set`, and `remove` methods
 *
 * @example
 * ```ts
 * const theme = useLocalStorage('theme', 'light', {
 *   parse: (value) => (typeof value === 'string' ? value : 'light'),
 *   serialize: (value) => value,
 * });
 * theme.set('dark');
 * const current = theme.get(); // 'dark'
 * ```
 */
export const useLocalStorage: <T>(
  key: string,
  initialValue: T,
  codec: LocalStorageCodec<T>,
) => { get: () => T; set: (value: T) => void; remove: () => void } = <T>(
  key: string,
  initialValue: T,
  codec: LocalStorageCodec<T>,
): { get: () => T; set: (value: T) => void; remove: () => void } => {
  let memoryValue = initialValue;
  let hasMemoryValue = false;

  return {
    get(): T {
      if (!isBrowser) {
        return hasMemoryValue ? memoryValue : initialValue;
      }
      const raw = globalThis.localStorage.getItem(key);
      if (raw === null) {
        return initialValue;
      }
      const parsed: unknown = JSON.parse(raw);
      return codec.parse(parsed);
    },
    set(value: T): void {
      if (!isBrowser) {
        memoryValue = value;
        hasMemoryValue = true;
        return;
      }
      globalThis.localStorage.setItem(key, JSON.stringify(codec.serialize(value)));
    },
    remove(): void {
      if (!isBrowser) {
        memoryValue = initialValue;
        hasMemoryValue = false;
        return;
      }
      globalThis.localStorage.removeItem(key);
    },
  };
};
