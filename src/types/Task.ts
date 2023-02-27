import type Duration from "./Duration";
import type Request from "./Request";

export default interface Task {
  id: string;
  name: string | undefined;
  queue: string;
  status: string;
  request: Request;
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

  delay?: Duration | string;
}

export type UpdateTaskParams = Partial<CreateTaskParams>;
