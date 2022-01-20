import Mergent from "../src/Mergent";
import RequestValidator from "../src/RequestValidator";
import Tasks from "../src/resources/Tasks";

const mergent = new Mergent("");

describe("#tasks", () => {
  test("is an instance of the Tasks resource", () => {
    expect(mergent.tasks).toBeInstanceOf(Tasks);
  });
});

describe("requestValidator", () => {
  test("is an instance of the RequestValidator", () => {
    expect(mergent.requestValidator).toBeInstanceOf(RequestValidator);
  });
});
