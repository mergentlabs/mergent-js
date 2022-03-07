import Client from "../Client";
import Schedule, { CreateScheduleParams } from "../types/Schedule";

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
