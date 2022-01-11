import Client from "../../src/Client";
import Tasks from "../../src/resources/Tasks";

jest.mock("../../src/Client");

const client = new Client({ apiKey: "" });
const tasks = new Tasks(client);

test("#create", async () => {
  tasks.create({ request: { url: "" } });
  expect(client.post).toHaveBeenCalledTimes(1);
});
