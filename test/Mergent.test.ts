import Mergent from "../src/Mergent";
import Tasks from "../src/resources/Tasks";

describe("#tasks", () => {
  test("is an instance of the Tasks resource", () => {
    const mergent = new Mergent("");
    expect(mergent.tasks).toBeInstanceOf(Tasks);
  });
});
