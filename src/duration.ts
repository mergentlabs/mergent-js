import type Duration from "./types/Duration";

export function durationToString(duration: Duration): string | undefined {
  let str = "";

  if (duration.hours) {
    str += `${duration.hours}h`;
  }

  if (duration.minutes) {
    str += `${duration.minutes}m`;
  }

  if (duration.seconds) {
    str += `${duration.seconds}s`;
  }

  if (str === "") {
    return undefined;
  }

  return str;
}

export default {};
