import Client from "../Client";
import Task from "../types/Task";

export default class Tasks {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  create(params: {}): Promise<Task> {
    return this.client.post("tasks", params);
  }
}
