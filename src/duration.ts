import type Duration from "./types/Duration";

export function durationToString(duration: Duration): string | undefined {
  let str = "";

  if (duration.hours !== undefined) {
    str += `${duration.hours}h`;
  }

  if (duration.minutes !== undefined) {
    str += `${duration.minutes}m`;
  }

  if (duration.seconds !== undefined) {
    str += `${duration.seconds}s`;
  }

  if (str === "") {
    return undefined;
  }

  return str;
}

export default {};
