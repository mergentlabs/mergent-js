// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, it } from "@jest/globals";
import { Response as NFResponse } from "node-fetch";
import Client from "../src/Client";
import {
  MergentAPIError,
  MergentAPIErrorParams,
  MergentAPIInvalidJSONError,
  MergentAPIUnexpectedStatusCodeError,
} from "../src/errors";
import startMockServer from "./mocks/server";

const apiKey = "apikey";
const authorization = `Bearer ${apiKey}`;
const url = "https://api.mergent.co/v2/teapot";

interface MockServerResponseBody {
  status: number;
  request: {
    method: string;
    headers: {
      Authorization: string | undefined;
      "Content-Type": string | undefined;
    };
    body: object | undefined;
  };
}

const mockServer = startMockServer((http) => [
  http.all(url, async ({ request }) => {
    let resStatus = 500;

    if (request.headers.get("Authorization") === authorization) {
      const hasJSONContentType =
        request.headers.get("Content-Type") === "application/json";

      switch (request.method) {
        case "GET":
          if (hasJSONContentType) break;
          resStatus = 200;
          break;
        case "POST":
          resStatus = hasJSONContentType ? 201 : 415;
          break;
        case "PATCH":
          resStatus = hasJSONContentType ? 200 : 415;
          break;
        case "DELETE":
          if (hasJSONContentType) break;
          // 200 instead of 204 since we do not parse JSON from 204 responses
          resStatus = 200;
          break;
        default:
          resStatus = 405;
      }
    } else {
      resStatus = 401;
    }

    const resBody: MockServerResponseBody = {
      status: resStatus,
      request: {
        method: request.method,
        headers: {
          Authorization: request.headers.get("Authorization") ?? undefined,
          "Content-Type": request.headers.get("Content-Type") ?? undefined,
        },
        body: (await request.json().catch(() => undefined)) as
          | object
          | undefined,
      },
    };

    return new Response(JSON.stringify(resBody), {
      status: resStatus,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
]);

afterAll(() => mockServer.close());

describe("Client", () => {
  const client = new Client({ apiKey });

  describe("#get", () => {
    it("makes a valid GET request to the specified resource", async () => {
      const body = await client.get<MockServerResponseBody>("teapot");
      expect(body).toStrictEqual({
        status: 200,
        request: {
          method: "GET",
          headers: {
            Authorization: authorization,
          },
        },
      });
    });
  });

  describe("#post", () => {
    it("makes a valid POST request to the specified resource", async () => {
      const params = {
        some: "post params",
      };
      const body = await client.post<MockServerResponseBody>("teapot", params);
      expect(body).toStrictEqual({
        status: 201,
        request: {
          method: "POST",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
          body: params,
        },
      });
    });
  });

  describe("#patch", () => {
    it("makes a valid PATCH request to the specified resource", async () => {
      const params = {
        some: "patch params",
      };
      const body = await client.patch<MockServerResponseBody>("teapot", params);
      expect(body).toStrictEqual({
        status: 200,
        request: {
          method: "PATCH",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
          body: params,
        },
      });
    });
  });

  describe("#delete", () => {
    it("makes a valid DELETE request to the specified resource", async () => {
      const body = await client.delete("teapot");
      expect(body).toStrictEqual({
        status: 200,
        request: {
          method: "DELETE",
          headers: {
            Authorization: authorization,
          },
        },
      });
    });
  });

  describe("retryable", () => {
    describe("when successful", () => {
      it("returns the result of perform()", async () => {
        let attempts = 0;
        const response = await client.retryable(() => {
          attempts += 1;
          return Promise.resolve("");
        });

        expect(response).toBe("");
        expect(attempts).toBe(1);
      });
    });

    describe("when an error is thrown", () => {
      it("retries up to five times, returning the result of the final perform()", async () => {
        let attempts = 0;
        const responsePromise = client.retryable(async () => {
          attempts += 1;
          throw new MergentAPIInvalidJSONError(400);
        });

        await expect(responsePromise).rejects.toThrow(
          new MergentAPIInvalidJSONError(400)
        );
        expect(attempts).toBe(5);
      });
    });

    describe("when an error is thrown, but a subsequent retry is successful", () => {
      it("returns the result of the successful retry", async () => {
        let attempts = 0;
        const response = await client.retryable(async () => {
          attempts += 1;

          // throws two errors before resolving
          if (attempts < 2) {
            throw new MergentAPIInvalidJSONError(400);
          }

          return Promise.resolve("");
        });

        expect(response).toBe("");
        expect(attempts).toBe(2);
      });
    });
  });

  describe("#makeRequest", () => {
    it("makes a valid request to the specified resource", async () => {
      const params = {
        some: "post params",
      };
      const response = await client.makeRequest("POST", "/teapot", params);
      expect(response.status).toBe(201);
      expect(await response.json()).toStrictEqual({
        status: 201,
        request: {
          method: "POST",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
          body: params,
        },
      });
    });
  });

  describe("#handleResponse", () => {
    describe("1xx", () => {
      it("throws a MergentAPIUnexpectedStatusCodeError", async () => {
        const response100 = new NFResponse(undefined, { status: 100 });
        await expect(client.handleResponse(response100)).rejects.toThrow(
          new MergentAPIUnexpectedStatusCodeError(100)
        );

        const response199 = new NFResponse(undefined, { status: 199 });
        await expect(client.handleResponse(response199)).rejects.toThrow(
          new MergentAPIUnexpectedStatusCodeError(199)
        );
      });
    });

    describe("2xx, expect for 204", () => {
      it("returns the json response body", async () => {
        const body = { success: true };

        const response200 = new NFResponse(JSON.stringify(body), {
          status: 200,
        });
        const response200Body = await client.handleResponse(response200);
        expect(response200Body).toStrictEqual(body);

        const response299 = new NFResponse(JSON.stringify(body), {
          status: 299,
        });
        const response299Body = await client.handleResponse(response299);
        expect(response299Body).toStrictEqual(body);
      });
    });

    describe("204", () => {
      it("returns an empty body", async () => {
        const response = new NFResponse(undefined, { status: 204 });
        const responseBody = await client.handleResponse(response);
        expect(responseBody).toBeUndefined();
      });
    });

    describe("3xx", () => {
      it("throws a MergentAPIUnexpectedStatusCodeError", async () => {
        const response300 = new NFResponse(undefined, { status: 300 });
        await expect(client.handleResponse(response300)).rejects.toThrow(
          new MergentAPIUnexpectedStatusCodeError(300)
        );

        const response399 = new NFResponse(undefined, { status: 399 });
        await expect(client.handleResponse(response399)).rejects.toThrow(
          new MergentAPIUnexpectedStatusCodeError(399)
        );
      });
    });

    describe("4xx", () => {
      it("throws a MergentAPIError when the body has an error message", async () => {
        const body = { message: "Something went wrong." };

        const response400 = new NFResponse(JSON.stringify(body), {
          status: 400,
        });
        await expect(client.handleResponse(response400)).rejects.toThrow(
          new MergentAPIError(body as unknown as MergentAPIErrorParams)
        );

        const response499 = new NFResponse(JSON.stringify(body), {
          status: 499,
        });
        await expect(client.handleResponse(response499)).rejects.toThrow(
          new MergentAPIError(body as unknown as MergentAPIErrorParams)
        );
      });

      it("throws a MergentAPIInvalidJSONError when the response body does not have an error message", async () => {
        const response = new NFResponse(JSON.stringify({}), { status: 400 });
        await expect(client.handleResponse(response)).rejects.toThrow(
          new MergentAPIInvalidJSONError(400)
        );
      });
    });

    describe("5xx", () => {
      it("throws a MergentAPIUnexpectedStatusCodeError", async () => {
        const response500 = new NFResponse(undefined, { status: 500 });
        await expect(client.handleResponse(response500)).rejects.toThrow(
          new MergentAPIUnexpectedStatusCodeError(500)
        );

        const response599 = new NFResponse(undefined, { status: 599 });
        await expect(client.handleResponse(response599)).rejects.toThrow(
          new MergentAPIUnexpectedStatusCodeError(599)
        );
      });
    });
  });
});
