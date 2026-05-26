import { describe, expect, it } from "bun:test";
import { createApp } from "../src/app.ts";
import { PACKAGE_NAME, UPSTREAM_PACKAGE } from "../src/index.ts";

function nextMessage(socket: WebSocket): Promise<string> {
  return new Promise((resolve) => {
    const handler = (event: MessageEvent) => {
      resolve(String(event.data));
    };
    socket.addEventListener("message", handler, { once: true });
  });
}

async function withSocketServer<T>(
  app: ReturnType<typeof createApp>,
  run: (port: number) => Promise<T>,
): Promise<T> {
  const { port, stop } = await app.listen({ port: 0 });
  return run(port).then(
    async (value) => {
      await Promise.resolve(stop());
      return value;
    },
    async (reason) => {
      await Promise.resolve(stop());
      throw reason;
    },
  );
}

describe("./websocket", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/http-bao");
    expect(UPSTREAM_PACKAGE).toBe("elysia@1.4.28");
  });

  it("routes websocket events and exposes helper methods", async () => {
    const app = createApp();
    const events: string[] = [];
    let helpersAvailable = false;
    let resolveServerClose: () => void = () => undefined;
    const serverClose = new Promise<void>((resolve) => {
      resolveServerClose = resolve;
    });

    app.ws("/ws/:room", {
      open: (socket) => {
        const params = socket.data.params as Record<string, unknown>;
        const room = typeof params.room === "string" ? params.room : "unknown";
        events.push(`open:${room}`);
        helpersAvailable =
          typeof socket.send === "function" &&
          typeof socket.ping === "function" &&
          typeof socket.pong === "function" &&
          typeof socket.publish === "function";

        socket.ping("probe");
        socket.pong("probe");
        socket.publish("broadcast", "payload");
        socket.send(`hello-${room}`);
      },
      message: (socket, message) => {
        events.push(`message:${String(message)}`);
        socket.send(`echo:${String(message)}`);
      },
      close: () => {
        events.push("close");
        resolveServerClose();
      },
      drain: () => {
        events.push("drain");
      },
    });

    await withSocketServer(app, async (port) => {
      const socket = new WebSocket(`ws://127.0.0.1:${port}/ws/alpha`);
      await new Promise((resolve, reject) => {
        socket.addEventListener("open", () => resolve(undefined), { once: true });
        socket.addEventListener("error", () => reject(new Error("websocket failed to open")), {
          once: true,
        });
      });

      const openMessage = await nextMessage(socket);
      expect(openMessage).toBe("hello-alpha");

      socket.send("ping");
      const messageReply = await nextMessage(socket);
      expect(messageReply).toBe("echo:ping");

      socket.close();
      await new Promise((resolve) =>
        socket.addEventListener("close", () => resolve(undefined), { once: true }),
      );
      await serverClose;

      expect(helpersAvailable).toBe(true);
      expect(events).toEqual(["open:alpha", "message:ping", "close"]);
    });
  });
});
