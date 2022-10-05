import Request from "./Request";

export default interface Task {
  id: string;
  status: string;

  /** @deprecated */
  name?: string;
  /** @deprecated */
  queue?: string;
}

export interface CreateTaskParams {
  request: Request;

  /**
   * ISO 8601 timestamp
   */
  scheduled_for?: string;

  /**
   * ISO 8601 duration
   */
  delay?: string;

  /** @deprecated */
  name?: string;
  /** @deprecated */
  queue?: string;
}
