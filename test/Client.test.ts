import fetch from "node-fetch";
import { MergentAPIError, MergentAPIInvalidJSONError } from "../src/errors";
import Client, { parseJSON } from "../src/Client";

jest.mock("node-fetch");

const fetchMock = fetch as unknown as jest.Mock;
const { Response } = jest.requireActual("node-fetch");

const apiKey = "apikey";
const client = new Client({ apiKey });
const params = { request: { url: "https://example.com" } };

function mockFetchResponse(status: number, body?: object) {
  fetchMock.mockReturnValue(
    Promise.resolve(
      new Response(body === undefined ? undefined : JSON.stringify(body), {
        status,
      })
    )
  );
}

describe("parseJSON()", () => {
  describe("with a successful response", () => {
    describe("with valid JSON", () => {
      test("returns the parsed JSON", async () => {
        const body = { id: "id" };
        mockFetchResponse(200, body);
        const response = await fetch("/resource");

        expect(await parseJSON(response)).toStrictEqual(body);
      });
    });

    describe("with invalid JSON", () => {
      test("throws a MergentAPIInvalidJSONError", async () => {
        mockFetchResponse(200);
        const response = await fetch("/resource");

        await expect(parseJSON(response)).rejects.toThrowError(
          MergentAPIInvalidJSONError
        );
      });
    });
  });

  describe("with an unsuccessful response", () => {
    describe("with valid Error JSON", () => {
      test("throws a MergentAPIError", async () => {
        mockFetchResponse(422, { message: "An error has occured." });
        const response = await fetch("/resource");

        await expect(parseJSON(response)).rejects.toThrowError(MergentAPIError);
      });
    });

    describe("with invalid JSON", () => {
      test("throws a MergentAPIInvalidJSONError", async () => {
        mockFetchResponse(422);
        const response = await fetch("/resource");

        await expect(parseJSON(response)).rejects.toThrowError(
          MergentAPIInvalidJSONError
        );
      });
    });
  });
});

describe("Client", () => {
  describe("#get", () => {
    test("makes a GET request with the specified resource", async () => {
      const responseBody = [{ id: "id" }];
      mockFetchResponse(200, responseBody);

      await client.get("resource");
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.mergent.co/v2/resource",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
    });
  });

  describe("#post", () => {
    test("makes a POST request with the specified resource and params", async () => {
      const responseBody = { id: "id" };
      mockFetchResponse(200, responseBody);

      await client.post("resource", params);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.mergent.co/v2/resource",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
    });
  });

  describe("#patch", () => {
    test("makes a PATCH request with the specified resource and params", async () => {
      const responseBody = { id: "id" };
      mockFetchResponse(200, responseBody);

      await client.patch("resource", params);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.mergent.co/v2/resource",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
    });
  });

  describe("#delete", () => {
    test("makes a DELETE request with the specified resource", async () => {
      mockFetchResponse(204);

      await client.delete("resource");
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.mergent.co/v2/resource",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
    });
  });

  describe("#makeRequest", () => {
    it("makes the specified request", async () => {
      const responseBody = { id: "id" };
      mockFetchResponse(200, responseBody);

      await client.makeRequest("POST", "/tasks", params);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.mergent.co/v2/tasks",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
    });
  });
});
