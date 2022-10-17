import Client from "../Client";
import Task, { CreateTaskParams } from "../types/Task";

export default class Tasks {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  create(params: CreateTaskParams): Promise<Task> {
    const modifiedParams = {
      ...params,
      scheduled_for: params.scheduledFor?.toISOString() ?? params.scheduled_for,
      scheduledFor: undefined,
    };

    const defaultParams = { queue: "default" };
    return this.client.post("tasks", { ...defaultParams, ...modifiedParams });
  }
}
