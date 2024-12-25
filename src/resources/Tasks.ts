import { durationToString } from "../duration";
import type Client from "../Client";
import type Task from "../types/Task";
import type { CreateTaskParams, UpdateTaskParams } from "../types/Task";

export default class Tasks {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  create(params: CreateTaskParams): Promise<Task> {
    const defaultParams = { queue: "default" };
    return this.client.post("tasks", {
      ...defaultParams,
      ...Tasks.requestParams(params),
    });
  }

  retrieve(id: string): Promise<Task> {
    return this.client.get(`tasks/${id}`);
  }

  update(id: string, params: UpdateTaskParams): Promise<Task> {
    return this.client.patch(`tasks/${id}`, Tasks.requestParams(params));
  }

  run(id: string): Promise<Task> {
    return this.client.post(`tasks/${id}/run`);
  }

  list(): Promise<[Task]> {
    return this.client.get("tasks");
  }

  delete(id: string): Promise<void> {
    return this.client.delete(`tasks/${id}`);
  }

  static requestParams<T extends CreateTaskParams | UpdateTaskParams>(
    params: T
  ): Partial<T> {
    return {
      ...params,
      // eslint-disable-next-line @typescript-eslint/no-deprecated, sonarjs/deprecation
      scheduled_for: params.scheduledFor?.toISOString() ?? params.scheduled_for,
      scheduledFor: undefined,
      delay:
        typeof params.delay === "object"
          ? durationToString(params.delay)
          : params.delay,
    };
  }
}
