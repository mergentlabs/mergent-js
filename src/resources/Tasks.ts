import Client from "../Client";
import Task, { CreateTaskParams } from "../types/Task";

export default class Tasks {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  create(params: CreateTaskParams): Promise<Task> {
    const defaultParams = { queue: "default" };
    return this.client.post("tasks", { ...defaultParams, ...params });
  }
}
