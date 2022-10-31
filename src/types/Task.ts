import type Duration from "./Duration";
import type Request from "./Request";

export default interface Task {
  id: string;
  name?: string;
  queue: string;
  status: string;
}

export interface CreateTaskParams {
  name?: string;
  queue?: string;
  request: Request;

  /**
   * ISO 8601 timestamp
   * @deprecated Prefer `scheduledFor: Date` to `scheduled_for: String`.
   */
  scheduled_for?: string;
  scheduledFor?: Date;

  /**
   * ISO 8601 duration
   */
  delay?: Duration | string;
}

export type UpdateTaskParams = Partial<CreateTaskParams>;
