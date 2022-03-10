import Client from "../../src/Client";
import Jobs from "../../src/resources/Jobs";

jest.mock("../../src/Client");

const client = new Client({ apiKey: "" });
const jobs = new Jobs(client);

describe("#create", () => {
  describe("with a queue param", () => {
    test("makes a request to create a Job on the specified queue", async () => {
      jobs.create({ queue: "foo", activity: { name: "bar" } });
      expect(client.post).toHaveBeenCalledWith("jobs", {
        queue: "foo",
        activity: { name: "bar" },
      });
    });
  });

  describe("without a queue param", () => {
    test("makes a request to create a Job on the default queue", async () => {
      jobs.create({ activity: { name: "bar" } });
      expect(client.post).toHaveBeenCalledWith("jobs", {
        queue: "default",
        activity: { name: "bar" },
      });
    });
  });
});
