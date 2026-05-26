/**
 * SSE stream factory for ecosystem contribution fragments.
 *
 * Composes the bus + per-subscriber filter + caller-supplied renderer +
 * wire-format encoder into a single `ReadableStream<Uint8Array>` ready
 * to be returned from any Bao app's SSE route. Handles heartbeat,
 * cleanup on abort, and renderer failures without try/catch (via
 * `toResultAsync` from `@baohaus/bao-utils/async-result`).
 *
 * The renderer callback is async-aware so consumers can re-resolve the
 * session (for capability-reevaluated events) before producing the
 * fragment. A renderer that rejects is logged-by-omission and the
 * stream stays alive — one bad render does not break the long-lived
 * SSE connection.
 *
 * @packageDocumentation
 */

import { toResultAsync } from "@baohaus/bao-utils/async-result";
import { encodeHeartbeatComment, encodeSseFragment } from "./encoder.ts";
import { shouldDeliverEvent } from "./filter.ts";
import { ecosystemEventBus } from "./service.ts";
import type {
  EcosystemContributionEvent,
  EcosystemContributionSurface,
  EcosystemFragmentRenderer,
  SubscriberScope,
} from "./types.ts";

/**
 * Caller-supplied dependencies for {@link createContributionSseStream}.
 */
export interface ContributionSseStreamDeps {
  /**
   * The incoming HTTP request. Used only for its `signal` — the stream
   * tears down (clears heartbeat, unsubscribes) when the client
   * disconnects.
   */
  readonly request: Request;
  /**
   * Subscriber scope captured at stream-open time.
   */
  readonly scope: SubscriberScope;
  /**
   * The contribution surface this sink renders for. The filter rejects
   * events for any other surface.
   */
  readonly surface: EcosystemContributionSurface;
  /**
   * SSE event name emitted on every accepted event (matches the
   * consumer's HTMX `sse-swap` attribute, e.g. `sidebar-refresh`).
   */
  readonly eventName: string;
  /**
   * Render callback invoked after the filter accepts an event. Returns
   * the HTML fragment to encode and stream. May be async — the package
   * awaits the result before encoding.
   */
  readonly render: EcosystemFragmentRenderer;
  /**
   * Interval between SSE heartbeat comments (milliseconds). Required;
   * the package does not pick a default so consumers stay aligned with
   * their app's `DEFAULT_TIMEOUTS.sseRetryMs`.
   */
  readonly heartbeatIntervalMs: number;
  /**
   * `retry:` field value in milliseconds emitted with every event
   * frame. Tells the SSE consumer how long to wait before reconnecting
   * after a transport failure.
   */
  readonly retryMs: number;
}

/**
 * Build the `ReadableStream<Uint8Array>` body that backs an ecosystem
 * contribution SSE route.
 */
export function createContributionSseStream(
  deps: ContributionSseStreamDeps,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let heartbeat: ReturnType<typeof setInterval> | null = null;
  let unsubscribe: (() => void) | null = null;

  const enqueueFragment = (
    controller: ReadableStreamDefaultController<Uint8Array>,
    html: string,
  ): void => {
    controller.enqueue(encodeSseFragment(deps.eventName, html, deps.retryMs, encoder));
  };

  const renderAndEnqueue = async (
    controller: ReadableStreamDefaultController<Uint8Array>,
    event: EcosystemContributionEvent,
  ): Promise<void> => {
    // Run the renderer inside an async IIFE so a synchronous throw
    // becomes a rejected promise that `toResultAsync` can catch. A raw
    // `Promise.resolve(deps.render(event))` would let a sync throw
    // bypass the promise machinery and propagate as an unhandled
    // exception in the bus dispatch loop.
    const result = await toResultAsync(
      (async () => {
        return deps.render(event);
      })(),
    );
    if (!result.ok) {
      return;
    }
    enqueueFragment(controller, result.value);
  };

  return new ReadableStream<Uint8Array>({
    start(controller) {
      const handleEvent = (event: EcosystemContributionEvent): void => {
        const deliver = shouldDeliverEvent(event, deps.scope, deps.surface);
        if (!deliver) {
          return;
        }
        void renderAndEnqueue(controller, event);
      };

      unsubscribe = ecosystemEventBus.subscribe(handleEvent);

      heartbeat = setInterval(() => {
        controller.enqueue(encodeHeartbeatComment(encoder));
      }, deps.heartbeatIntervalMs);

      deps.request.signal.addEventListener(
        "abort",
        () => {
          if (heartbeat) {
            clearInterval(heartbeat);
            heartbeat = null;
          }
          if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
          }
          controller.close();
        },
        { once: true },
      );
    },
    cancel() {
      if (heartbeat) {
        clearInterval(heartbeat);
        heartbeat = null;
      }
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    },
  });
}
