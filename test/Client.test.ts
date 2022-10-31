import fetch from "node-fetch";
import Client from "../src/Client";
import type Task from "../src/types/Task";

jest.mock("node-fetch");

const fetchMock = fetch as unknown as jest.Mock;
const { Response } = jest.requireActual("node-fetch");

const apiKey = "apikey";
const client = new Client({ apiKey });
const params = { request: { url: "https://example.com" } };

function mockFetchRespose(status: number, body?: object) {
  fetchMock.mockReturnValue(
    Promise.resolve(new Response(JSON.stringify(body), { status }))
  );
}

describe("#get", () => {
  test("makes a GET request with the specified resource", async () => {
    const responseBody = [{ id: "id" }];
    mockFetchRespose(200, responseBody);

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
    mockFetchRespose(200, responseBody);

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
    mockFetchRespose(200, responseBody);

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
    mockFetchRespose(204);

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

describe("#makeRequestExpectingJSONResponse", () => {
  it("makes the specified request", async () => {
    const responseBody = { id: "id" };
    mockFetchRespose(200, responseBody);

    await client.makeRequestExpectingJSONResponseBody("POST", "/tasks", params);
    expect(fetchMock).toHaveBeenCalledWith("https://api.mergent.co/v2/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  });

  describe("when the response status is a 2xx", () => {
    test("parses the response body JSON as T", async () => {
      const responseBody = { name: "hello" };
      mockFetchRespose(200, responseBody);

      const task: Task = await client.makeRequestExpectingJSONResponseBody(
        "PATCH",
        "/tasks"
      );
      expect(task.name).toBe("hello");
    });
  });

  describe("when the response status is a 4xx", () => {
    test("throws a MergentAPIError with the parsed error JSON", async () => {
      const responseBody = { message: "an api error" };
      mockFetchRespose(400, responseBody);

      await expect(
        client.makeRequestExpectingJSONResponseBody("GET", "/tasks")
      ).rejects.toThrowError(responseBody.message);
    });
  });

  describe("when the response status is a 5xx", () => {
    test("throws a MergentError with an invalid JSON message", async () => {
      mockFetchRespose(500);

      await expect(
        client.makeRequestExpectingJSONResponseBody("POST", "/tasks")
      ).rejects.toThrowError("Invalid JSON received from the Mergent API");
    });
  });
});

describe("#makeRequestExpectingEmptyResponseBody", () => {
  it("makes the specified request", async () => {
    mockFetchRespose(204);

    await client.makeRequestExpectingEmptyResponseBody("DELETE", "/tasks");
    expect(fetchMock).toHaveBeenCalledWith("https://api.mergent.co/v2/tasks", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
  });

  describe("when the response status is a 2xx", () => {
    test("parses the response body JSON as T", async () => {
      mockFetchRespose(204);

      await expect(
        client.makeRequestExpectingEmptyResponseBody("DELETE", "/tasks")
      ).resolves.not.toThrowError();
    });
  });

  describe("when the response status is a 4xx", () => {
    test("throws a MergentAPIError with the parsed error JSON", async () => {
      const responseBody = { message: "an api error" };
      mockFetchRespose(400, responseBody);

      await expect(
        client.makeRequestExpectingEmptyResponseBody("DELETE", "/tasks")
      ).rejects.toThrowError(responseBody.message);
    });
  });

  describe("when the response status is a 5xx", () => {
    test("throws a MergentError with an invalid JSON message", async () => {
      mockFetchRespose(500);

      await expect(
        client.makeRequestExpectingEmptyResponseBody("DELETE", "/tasks")
      ).rejects.toThrowError("Invalid JSON received from the Mergent API");
    });
  });
});
