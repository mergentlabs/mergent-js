import type Duration from "../src/types/Duration";
import { durationToString } from "../src/duration";

describe("duration()", () => {
  test("returns the string representation of the Duration", () => {
    const cases: [string | undefined, Duration][] = [
      ["1s", { seconds: 1 }],
      ["100s", { seconds: 100 }],
      ["5m", { minutes: 5 }],
      ["1.5h", { hours: 1.5 }],
      ["1.5h2m60s", { hours: 1.5, minutes: 2, seconds: 60 }],
      ["2h45m", { hours: 2, minutes: 45 }],
      ["2h", { hours: 2 }],
      ["0s", { seconds: 0 }],
      ["0s", { seconds: 0 }],
      ["0s", { seconds: 0 }],
      [undefined, {}],
    ];

    cases.forEach(([expected, input]) => {
      const actual = durationToString(input);
      expect(actual).toStrictEqual(expected);
    });
  });
});
