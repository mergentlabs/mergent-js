// eslint-disable-next-line import/no-extraneous-dependencies
// import { afterAll, afterEach, beforeAll } from "@jest/globals";
import { rest as restHandlerCreator, RestHandler } from "msw";
import { setupServer } from "msw/node";

/**
 * Sets up, starts, and returns a mock server for the provided `RestHandler`.
 * Callers MUST call `server.close()` on the returned server.
 *
 * See https://mswjs.io/docs/api/rest for rest handler docs.
 */
export default function startMockServer(
  setupHandler: (rest: typeof restHandlerCreator) => RestHandler[]
) {
  const handler = setupHandler(restHandlerCreator);
  const server = setupServer(...handler);
  server.listen();
  return server;
}
