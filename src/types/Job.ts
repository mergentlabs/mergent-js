interface Activity {
  name: string;
  args?: string[];
}

export default interface Job {
  id: string;
  name?: string;
  queue: string;
  activity: Activity;
}

export interface CreateJobParams {
  name?: string;
  queue?: string;
  activity: Activity;

  /**
   * ISO 8601 timestamp
   */
  scheduled_for?: string;

  /**
   * ISO 8601 duration
   */
  delay?: string;
}
