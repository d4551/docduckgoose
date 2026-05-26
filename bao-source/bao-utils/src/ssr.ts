/**
 * SSR-Safe Utilities
 *
 * Provides utilities for handling Server-Side Rendering (SSR) scenarios
 * where browser APIs (window, document, localStorage) are not available. These helpers
 * enable safe feature detection and graceful fallbacks during server-side execution.
 *
 * Key Features:
 * - Environment detection (browser vs server)
 * - SSR-safe localStorage wrapper (zero external dependencies)
 * - Zero runtime errors when accessing browser APIs on server
 * - Type-safe with full TypeScript support
 *
 * Common Use Cases:
 * - Conditional rendering based on environment
 * - Safe access to browser-only APIs
 * - Persistent state management with SSR support
 * - Progressive enhancement patterns
 *
 * Architecture:
 * - Uses typeof checks for reliable environment detection
 * - Native localStorage with JSON serialization (no external reactivity dependency)
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
 * SSR-safe accessor for localStorage values with JSON serialization.
 *
 * Returned object provides `get()` / `set()` / `remove()` methods.
 * On the server (no `window`), `get()` returns `initialValue` and
 * writes are no-ops, guaranteeing zero runtime errors during SSR.
 *
 * @typeParam T - Type of the stored value
 * @param key - localStorage key
 * @param initialValue - Fallback when key is absent or on server
 * @returns Object with typed `get`, `set`, and `remove` methods
 *
 * @example
 * ```ts
 * const theme = useLocalStorage('theme', 'light');
 * theme.set('dark');
 * const current = theme.get(); // 'dark'
 *
 * interface UserPrefs { fontSize: number; notifications: boolean }
 * const prefs = useLocalStorage<UserPrefs>('user-prefs', {
 *   fontSize: 14,
 *   notifications: true,
 * });
 * prefs.set({ ...prefs.get(), fontSize: 16 });
 * ```
 */
export const useLocalStorage: <T>(
  key: string,
  initialValue: T,
) => { get: () => T; set: (value: T) => void; remove: () => void } = <T>(
  key: string,
  initialValue: T,
): { get: () => T; set: (value: T) => void; remove: () => void } => ({
  get(): T {
    if (!isBrowser) {
      return initialValue;
    }
    const raw = globalThis.localStorage.getItem(key);
    if (raw === null) {
      return initialValue;
    }
    return JSON.parse(raw) as T;
  },
  set(value: T): void {
    if (!isBrowser) {
      return;
    }
    globalThis.localStorage.setItem(key, JSON.stringify(value));
  },
  remove(): void {
    if (!isBrowser) {
      return;
    }
    globalThis.localStorage.removeItem(key);
  },
});
