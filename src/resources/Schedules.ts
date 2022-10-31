import type Client from "../Client";
import type Schedule from "../types/Schedule";
import type { CreateScheduleParams } from "../types/Schedule";

export default class Schedules {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  create(params: CreateScheduleParams): Promise<Schedule> {
    const defaultParams = { queue: "default" };
    return this.client.post("schedules", { ...defaultParams, ...params });
  }
}
