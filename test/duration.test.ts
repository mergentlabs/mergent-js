import Duration from "../src/types/Duration";
import { iso8601Duration } from "../src/duration";

describe("iso8601Duration()", () => {
  test("returns the ISO 8601 representation of the Duration", () => {
    const cases: [string, Duration][] = [
      ["PT5M", { minutes: 5 }],
      ["P1M", { months: 1 }],
      ["PT1M", { minutes: 1 }],
      ["P12W", { weeks: 12 }],
      ["P12Y10M", { years: 12, months: 10 }],
      ["P12Y10M13D", { years: 12, months: 10, days: 13 }],
      ["P2DT1M", { days: 2, minutes: 1 }],
      ["PT0.5M", { minutes: 0.5 }],
      ["P0.5YT0.5M", { years: 0.5, minutes: 0.5 }],
      ["PT0S", { months: 0 }],
      ["PT0S", { weeks: 0 }],
      ["PT0S", { days: 0 }],
    ];
    cases.forEach(([expectedISOString, duration]) => {
      const actualISOString = iso8601Duration(duration);
      expect(actualISOString).toStrictEqual(expectedISOString);
    });
  });
});
