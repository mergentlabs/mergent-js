import fetch from "node-fetch";
import { MergentAPIError, MergentAPIErrorParams } from "./errors";

export default class Client {
  private config: ClientConfig;

  constructor(config: ClientConfig) {
    this.config = config;
  }

  async post<T>(resource: string, params: object): Promise<T> {
    const url = `https://api.mergent.co/v2/${resource}`;
    const headers = {
      Authorization: `Bearer ${this.config.apiKey}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(params);
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (response.ok) {
      return response.json() as Promise<T>;
    }

    try {
      const errorParams = (await response.json()) as MergentAPIErrorParams;
      throw new MergentAPIError(errorParams);
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

export interface ClientConfig {
  apiKey: string;
}
