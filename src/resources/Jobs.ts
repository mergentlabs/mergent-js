import Client from "../Client";
import Job, { CreateJobParams } from "../types/Job";

export default class Jobs {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  create(params: CreateJobParams): Promise<Job> {
    const defaultParams = { queue: "default" };
    return this.client.post("jobs", { ...defaultParams, ...params });
  }
}
