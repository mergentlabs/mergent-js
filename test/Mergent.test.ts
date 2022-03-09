import Mergent from "../src/Mergent";
import RequestValidator from "../src/RequestValidator";
import Schedules from "../src/resources/Schedules";
import Tasks from "../src/resources/Tasks";

const mergent = new Mergent("");

describe("#tasks", () => {
  test("is an instance of the Tasks resource", () => {
    expect(mergent.tasks).toBeInstanceOf(Tasks);
  });
});

describe("#schedules", () => {
  test("is an instance of the Schedules resource", () => {
    expect(mergent.schedules).toBeInstanceOf(Schedules);
  });
});

describe("requestValidator", () => {
  test("is an instance of the RequestValidator", () => {
    expect(mergent.requestValidator).toBeInstanceOf(RequestValidator);
  });
});
