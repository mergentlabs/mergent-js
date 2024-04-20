import type Client from "../Client";
import type Schedule from "../types/Schedule";
import type {
  CreateScheduleParams,
  UpdateScheduleParams,
} from "../types/Schedule";

export default class Schedules {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  create(params: CreateScheduleParams): Promise<Schedule> {
    const defaultParams = { queue: "default" };
    return this.client.post("schedules", { ...defaultParams, ...params });
  }

  retrieve(id: string): Promise<Schedule> {
    return this.client.get(`schedules/${id}`);
  }

  update(id: string, params: UpdateScheduleParams): Promise<Schedule> {
    return this.client.patch(`schedules/${id}`, params);
  }

  list(): Promise<[Schedule]> {
    return this.client.get("schedules");
  }

  delete(id: string): Promise<void> {
    return this.client.delete(`schedules/${id}`);
  }
}
