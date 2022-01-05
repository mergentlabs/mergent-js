import fetch from "node-fetch";
import Client from "../src/Client";
import Task from "../src/types/Task";

jest.mock("node-fetch");

const fetchMock = fetch as unknown as jest.Mock;
const { Response } = jest.requireActual("node-fetch");

const apiKey = "apikey";
const client = new Client({ apiKey });
const params = { request: { url: "https://example.com" } };

function mockFetchRespose(status: number, body: object | null) {
  fetchMock.mockReturnValue(
    Promise.resolve(new Response(JSON.stringify(body), { status }))
  );
}

describe("#post", () => {
  test("makes a POST request with the specified resource and params", async () => {
    const responseBody = { id: "id" };
    mockFetchRespose(200, responseBody);

    await client.post("resource", params);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.mergent.co/v1/resource",
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

  describe("when the response status is a 2xx", () => {
    test("parses the JSON as T", async () => {
      const responseBody = { name: "dosomething" };
      mockFetchRespose(200, responseBody);

      const response = await client.post<Task>("task", params);
      expect(response.name).toBe("dosomething");
    });
  });

  describe("when the response status is a 4xx", () => {
    test("throws a MergentError with the parsed error JSON", async () => {
      const responseBody = { message: "an api error" };
      mockFetchRespose(400, responseBody);

      await expect(client.post<Task>("task", params)).rejects.toThrowError(
        responseBody.message
      );
    });
  });

  describe("when the response status is a 5xx", () => {
    test("throws a MergentError with an invalid JSON message", async () => {
      mockFetchRespose(500, null);

      await expect(client.post<Task>("task", params)).rejects.toThrowError(
        "Invalid JSON received from the Mergent API"
      );
    });
  });
});
