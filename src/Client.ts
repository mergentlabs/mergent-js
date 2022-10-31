import fetch from "node-fetch";
import { MergentAPIError, MergentAPIErrorParams } from "./errors";

export default class Client {
  private config: ClientConfig;

  constructor(config: ClientConfig) {
    this.config = config;
  }

  async get<T>(resource: string): Promise<T> {
    return this.makeRequestExpectingJSONResponseBody("GET", `/${resource}`);
  }

  async post<T>(resource: string, params: object): Promise<T> {
    return this.makeRequestExpectingJSONResponseBody(
      "POST",
      `/${resource}`,
      params
    );
  }

  async patch<T>(resource: string, params: object): Promise<T> {
    return this.makeRequestExpectingJSONResponseBody(
      "PATCH",
      `/${resource}`,
      params
    );
  }

  async delete(resource: string): Promise<void> {
    return this.makeRequestExpectingEmptyResponseBody("DELETE", `/${resource}`);
  }

  async makeRequestExpectingJSONResponseBody<T>(
    method: "GET" | "PATCH" | "POST",
    path: string,
    bodyObject?: object
  ): Promise<T> {
    const headers = {
      Authorization: `Bearer ${this.config.apiKey}`,
      ...(bodyObject ? { "Content-Type": "application/json" } : {}),
    };
    const body = bodyObject ? JSON.stringify(bodyObject) : undefined;
    const response = await fetch(`https://api.mergent.co/v2${path}`, {
      method,
      headers,
      body,
    });

    try {
      const json = await response.json();
      if (response.ok) return json as T;

      throw new MergentAPIError(json as MergentAPIErrorParams);
    } catch (err) {
      if (err instanceof MergentAPIError) {
        throw err;
      }

      throw new MergentAPIError({
        message: "Invalid JSON received from the Mergent API",
      });
    }
  }

  async makeRequestExpectingEmptyResponseBody(
    method: "DELETE",
    path: string
  ): Promise<void> {
    const headers = {
      Authorization: `Bearer ${this.config.apiKey}`,
    };
    const response = await fetch(`https://api.mergent.co/v2${path}`, {
      method,
      headers,
    });

    if (!response.ok) {
      try {
        const json = await response.json();
        throw new MergentAPIError(json as MergentAPIErrorParams);
      } catch (err) {
        if (err instanceof MergentAPIError) {
          throw err;
        }

        throw new MergentAPIError({
          message: "Invalid JSON received from the Mergent API",
        });
      }
    }
  }
}

export interface ClientConfig {
  apiKey: string;
}
