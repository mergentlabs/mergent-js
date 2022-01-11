import Request from "./Request";

export default interface Task {
  name: string;
  description: string;
  status: string;
}

export interface CreateTaskParams {
  name?: string;
  description?: string;
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
