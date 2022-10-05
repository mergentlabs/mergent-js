import fetch from "node-fetch";
import { createMocks as createHTTPMocks } from "node-mocks-http";
import { Task } from "../../src/next/index";

describe("Task()", () => {
  test("requires a Mergent API key", () => {
    const errorSubstring = "API Key";

    expect(() => {
      Task("api/tasks/mytask", () => {});
    }).toThrowError(errorSubstring);

    expect(() => {
      Task("api/tasks/mytask", () => {}, { apiKey: "" });
    }).not.toThrowError(errorSubstring);
  });

  test("requires a Base URL", () => {
    const errorSubstring = "base URL";

    expect(() => {
      Task("api/tasks/mytask", () => {}, { apiKey: "" });
    }).toThrow(errorSubstring);

    expect(() => {
      Task("api/tasks/mytask", () => {}, { apiKey: "", baseURL: "" });
    }).not.toThrowError(errorSubstring);
  });

  test("responds with 200", async () => {
    const { req, res } = createHTTPMocks();
    Task("api/tasks/mytask", () => {}, {
      apiKey: "12345",
      baseURL: "https://example.com",
    })(req, res);
    expect(res._getStatusCode()).toBe(200); // eslint-disable-line no-underscore-dangle
  });

  test("responds with 500 when the handler throws", async () => {
    const { req, res } = createHTTPMocks();
    Task(
      "api/tasks/mytask",
      () => {
        throw new Error();
      },
      {
        apiKey: "12345",
        baseURL: "https://example.com",
      }
    )(req, res);
    expect(res._getStatusCode()).toBe(500); // eslint-disable-line no-underscore-dangle
  });
});

jest.mock("node-fetch");

const fetchMock = fetch as unknown as jest.Mock;
const { Response } = jest.requireActual("node-fetch");

function mockFetchRespose(status: number, body: object | null) {
  fetchMock.mockReturnValue(
    Promise.resolve(new Response(JSON.stringify(body), { status }))
  );
}

describe("Task#enqueue", () => {
  test("makes a client request with the provided options parsed appropriately", async () => {
    mockFetchRespose(200, {});
    const apiKey = "12345";
    const baseURL = "https://example.com";
    const taskPath = "api/tasks/mytask";
    const url = `${baseURL}/${taskPath}`;
    const body = { hello: "world" };
    const scheduledFor = new Date();

    await Task(taskPath, () => {}, { apiKey, baseURL }).enqueue(body, {
      delay: { minutes: 5 },
      scheduledFor,
    });

    expect(fetchMock).toHaveBeenCalledWith("https://api.mergent.co/v2/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queue: "default",
        scheduled_for: scheduledFor.toISOString(),
        delay: "PT5M",
        request: { url, body: JSON.stringify(body) },
      }),
    });
  });
});
