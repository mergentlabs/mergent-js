import Request from "./Request";

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
   */
  scheduled_for?: string;

  /**
   * ISO 8601 duration
   */
  delay?: string;
}
