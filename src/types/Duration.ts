/// Inspired by the proposed ECMAScript Temporal API.
/// Learn more: https://tc39.es/proposal-temporal/docs/duration.html
export default interface Duration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
