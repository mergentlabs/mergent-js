import Client from "../../src/Client";
import Tasks from "../../src/resources/Tasks";

jest.mock("../../src/Client");

const client = new Client({ apiKey: "" });
const tasks = new Tasks(client);

describe("#create", () => {
  describe("with a queue param", () => {
    test("makes a request to create a Task on the specified queue", async () => {
      tasks.create({ queue: "foo", request: { url: "" } });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "foo",
        request: { url: "" },
      });
    });
  });

  describe("without a queue param", () => {
    test("makes a request to create a Task on the default queue", async () => {
      tasks.create({ request: { url: "" } });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "default",
        request: { url: "" },
      });
    });
  });
});
