import fetch from "node-fetch";
import { AbortSignal } from "node-fetch/externals";
import type { Response } from "node-fetch";
import {
  MergentAPIError,
  MergentAPIInvalidJSONError,
  MergentAPIUnexpectedStatusCodeError,
} from "./errors";

export interface ClientConfig {
  apiKey: string;
}

export default class Client {
  private config: ClientConfig;

  constructor(config: ClientConfig) {
    this.config = config;
  }

  async get<T>(resource: string): Promise<T> {
    return this.retryable<T>(async () => {
      const response = await this.makeRequest("GET", `/${resource}`);
      return this.handleResponse<T>(response);
    });
  }

  async post<T>(resource: string, params?: object): Promise<T> {
    return this.retryable<T>(async () => {
      const response = await this.makeRequest("POST", `/${resource}`, params);
      return this.handleResponse<T>(response);
    });
  }

  async patch<T>(resource: string, params: object): Promise<T> {
    return this.retryable<T>(async () => {
      const response = await this.makeRequest("PATCH", `/${resource}`, params);
      return this.handleResponse<T>(response);
    });
  }

  async delete<T>(resource: string): Promise<T> {
    return this.retryable(async () => {
      const response = await this.makeRequest("DELETE", `/${resource}`);
      return this.handleResponse<T>(response);
    });
  }

  async retryable<T>(perform: () => Promise<T>, attempts = 5): Promise<T> {
    const attemptsLeft = attempts - 1;
    try {
      return await perform();
    } catch (e) {
      if (attemptsLeft > 0) {
        return this.retryable(perform, attemptsLeft);
      }

      throw e;
    }
  }

  async makeRequest(
    method: "GET" | "PATCH" | "POST" | "DELETE",
    path: string,
    bodyObject?: object
  ): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 30000); // 30 seconds

    const headers = {
      Authorization: `Bearer ${this.config.apiKey}`,
      ...(bodyObject ? { "Content-Type": "application/json" } : {}),
    };
    const body = bodyObject ? JSON.stringify(bodyObject) : undefined;

    try {
      return await fetch(`https://api.mergent.co/v2${path}`, {
        method,
        headers,
        body,
        signal: controller.signal as AbortSignal, // https://github.com/node-fetch/node-fetch/issues/1652
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async handleResponse<T>(response: Response): Promise<T> {
    const { status } = response;
    const statusRange = Math.floor(status / 100);

    if (statusRange === 2) {
      if (status === 204) {
        return undefined as T;
      }

      const body = (await response.json()) as T;
      return body;
    }

    if (statusRange === 4) {
      const body = (await response.json()) as Error;
      if (body.message) {
        throw new MergentAPIError(body);
      }

      throw new MergentAPIInvalidJSONError(status);
    }

    return Promise.reject(new MergentAPIUnexpectedStatusCodeError(status));
  }
}
