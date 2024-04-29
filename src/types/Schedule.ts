import type Request from "./Request";

export default interface Schedule {
  id: string;
  name?: string;
  description?: string;
  queue: string;
  request: Request;
  cron?: string;
  rrule?: string;
  dtstart?: string;
  paused?: boolean;
}

export interface CreateScheduleParams {
  name?: string;
  description?: string;
  queue?: string;
  request: Request;
  /**
   * You must pass either `cron` or `rrule` when creating a new Schedule.
   */
  cron?: string;
  /**
   * You must pass either `cron` or `rrule` when creating a new Schedule.
   */
  rrule?: string;
  /**
   * Optionally specified with `rrule`. Ignored when using `cron`.
   */
  dtstart?: string;
  paused?: boolean;
}

export type UpdateScheduleParams = Partial<CreateScheduleParams>;
