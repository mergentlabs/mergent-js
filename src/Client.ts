import fetch from "node-fetch";
import type { Response } from "node-fetch";
import {
  MergentAPIError,
  MergentAPIErrorParams,
  MergentAPIInvalidJSONError,
} from "./errors";

export async function parseJSON(response: Response) {
  try {
    const body = await response.json();
    if (response.ok) return body;

    throw new MergentAPIError(body as MergentAPIErrorParams);
  } catch (err) {
    if (err instanceof MergentAPIError) {
      throw err;
    }
    throw new MergentAPIInvalidJSONError();
  }
}

export default class Client {
  private config: ClientConfig;

  constructor(config: ClientConfig) {
    this.config = config;
  }

  async get<T>(resource: string): Promise<T> {
    const response = await this.makeRequest("GET", `/${resource}`);
    return parseJSON(response) as T;
  }

  async post<T>(resource: string, params?: object): Promise<T> {
    const response = await this.makeRequest("POST", `/${resource}`, params);
    return parseJSON(response) as T;
  }

  async patch<T>(resource: string, params: object): Promise<T> {
    const response = await this.makeRequest("PATCH", `/${resource}`, params);
    return parseJSON(response) as T;
  }

  async delete(resource: string): Promise<void> {
    await this.makeRequest("DELETE", `/${resource}`);
  }

  async makeRequest(
    method: "GET" | "PATCH" | "POST" | "DELETE",
    path: string,
    bodyObject?: object
  ): Promise<Response> {
    const headers = {
      Authorization: `Bearer ${this.config.apiKey}`,
      ...(bodyObject ? { "Content-Type": "application/json" } : {}),
    };
    const body = bodyObject ? JSON.stringify(bodyObject) : undefined;
    return fetch(`https://api.mergent.co/v2${path}`, {
      method,
      headers,
      body,
    });
  }
}

export interface ClientConfig {
  apiKey: string;
}
