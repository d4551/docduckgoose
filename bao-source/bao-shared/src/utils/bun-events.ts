/**
 * Centralized EventEmitter export for bun runtime services.
 *
 * Keeping event emitter usage in one module prevents drift and preserves a
 * single source of truth for runtime boundary behavior.
 *
 * @packageDocumentation
 */

type EventName = string | symbol;

type EventListener = (...args: unknown[]) => void;

type EventListenerRecord = {
  callback: EventListener;
  once: boolean;
  source: EventListener;
};

/**
 * Minimal Bun-native event emitter implementation used by runtime services.
 */
export class EventEmitter {
  private readonly listeners = new Map<EventName, Set<EventListenerRecord>>();
  private maxListeners = 10;

  /**
   * Register an event listener.
   *
   * @param event - Event name.
   * @param listener - Event callback.
   * @returns This emitter instance.
   */
  on(event: EventName, listener: EventListener): this {
    const bucket = this.listeners.get(event) ?? new Set<EventListenerRecord>();
    bucket.add({
      callback: listener,
      source: listener,
      once: false,
    });
    this.listeners.set(event, bucket);
    return this;
  }

  /**
   * Register a one-time event listener.
   *
   * @param event - Event name.
   * @param listener - Event callback.
   * @returns This emitter instance.
   */
  once(event: EventName, listener: EventListener): this {
    const wrapped = (...args: unknown[]): void => listener(...args);
    this.on(event, wrapped);
    const bucket = this.listeners.get(event);
    if (!bucket) {
      return this;
    }

    for (const record of bucket) {
      if (record.callback === wrapped) {
        this.listeners.set(
          event,
          new Set(
            Array.from(bucket).map((entry) =>
              entry.callback === wrapped
                ? { callback: entry.callback, source: listener, once: true }
                : entry,
            ),
          ),
        );
        break;
      }
    }

    return this;
  }

  /**
   * Alias for `on`.
   *
   * @param event - Event name.
   * @param listener - Event callback.
   * @returns This emitter instance.
   */
  addListener(event: EventName, listener: EventListener): this {
    return this.on(event, listener);
  }

  /**
   * Remove an event listener.
   *
   * @param event - Event name.
   * @param listener - Event callback.
   * @returns This emitter instance.
   */
  off(event: EventName, listener: EventListener): this {
    const bucket = this.listeners.get(event);
    if (!bucket) {
      return this;
    }

    const remaining = new Set(
      Array.from(bucket).filter(
        (record) => record.callback !== listener && record.source !== listener,
      ),
    );

    if (remaining.size === 0) {
      this.listeners.delete(event);
      return this;
    }

    this.listeners.set(event, remaining);
    return this;
  }

  /**
   * Alias for `off`.
   *
   * @param event - Event name.
   * @param listener - Event callback.
   * @returns This emitter instance.
   */
  removeListener(event: EventName, listener: EventListener): this {
    return this.off(event, listener);
  }

  /**
   * Emit an event to all listeners.
   *
   * @param event - Event name.
   * @param args - Arguments passed to listeners.
   * @returns `true` when at least one listener received the event.
   */
  emit(event: EventName, ...args: unknown[]): boolean {
    const bucket = this.listeners.get(event);
    if (!bucket || bucket.size === 0) {
      return false;
    }

    const snapshot = Array.from(bucket);
    for (const record of snapshot) {
      record.callback(...args);
      if (record.once) {
        this.off(event, record.callback);
      }
    }
    return true;
  }

  /**
   * Remove all listeners for one event or all events.
   *
   * @param event - Optional event name.
   * @returns This emitter instance.
   */
  removeAllListeners(event?: EventName): this {
    if (event) {
      this.listeners.delete(event);
      return this;
    }
    this.listeners.clear();
    return this;
  }

  /**
   * Set the maximum number of listeners for any event.
   *
   * @param value - New listener limit.
   * @returns This emitter instance.
   */
  setMaxListeners(value: number): this {
    this.maxListeners = Math.max(0, value);
    return this;
  }

  /**
   * Read-only count of configured listeners for event.
   *
   * @param event - Event name.
   * @returns Listener count.
   */
  listenerCount(event: EventName): number {
    return this.listeners.get(event)?.size ?? 0;
  }

  /**
   * Maximum allowed listeners per event.
   *
   * @returns Configured max listeners.
   */
  getMaxListeners(): number {
    return this.maxListeners;
  }
}
