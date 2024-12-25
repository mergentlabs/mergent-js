import { http as mswHTTP, RequestHandler } from "msw";
import { setupServer } from "msw/node";

/**
 * Sets up, starts, and returns a mock server for the provided handlers.
 * Callers MUST call `server.close()` on the returned server.
 */
export default function startMockServer(
  setupHandler: (http: typeof mswHTTP) => RequestHandler[],
) {
  const handlers = setupHandler(mswHTTP);
  const server = setupServer(...handlers);
  server.listen();
  return server;
}
