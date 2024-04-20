import type Request from "./Request";

export default interface Schedule {
  id: string;
  name?: string;
  description?: string;
  queue: string;
  status: string;
  cron?: string;
  rrule?: string;
  dtstart?: string;
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
}

export type UpdateScheduleParams = Partial<CreateScheduleParams>;
