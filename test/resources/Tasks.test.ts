import Client from "../../src/Client";
import type Duration from "../../src/types/Duration";
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

  describe("with a scheduledFor param", () => {
    test("makes a request to create a Task scheduled for the specified date", async () => {
      const scheduledFor = new Date();
      tasks.create({ request: { url: "" }, scheduledFor });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "default",
        request: { url: "" },
        scheduled_for: scheduledFor.toISOString(),
      });
    });
  });

  describe("with a scheduledFor param and a scheduled_for param", () => {
    test("makes a request, preferring scheduledFor param to deprecated scheduled_for param", async () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const scheduled_for = "2022-10-17T22:28:17.615Z";
      const scheduledFor = new Date();
      tasks.create({ request: { url: "" }, scheduledFor, scheduled_for });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "default",
        request: { url: "" },
        scheduled_for: scheduledFor.toISOString(),
      });
    });
  });

  describe("with a delay param", () => {
    test("makes a request to create a Task, setting the delay to the specified Duration serialized to an ISO 8601 Duration string", () => {
      const delay: Duration = { minutes: 7, seconds: 3 };
      tasks.create({ request: { url: "" }, delay });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "default",
        request: { url: "" },
        delay: "PT7M3S",
      });
    });

    test("makes a request to create a Task, setting the delay to the specified ISO 8601 Duration string", () => {
      tasks.create({ request: { url: "" }, delay: "PT5M" });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "default",
        request: { url: "" },
        delay: "PT5M",
      });
    });
  });
});

describe("#retrieve", () => {
  test("makes a request to retrieve the specified Task", () => {
    const id = "08072539-82a6-43d3-aaf9-28156533c84f";
    tasks.retrieve(id);
    expect(client.get).toHaveBeenCalledWith(`tasks/${id}`);
  });
});

describe("#update", () => {
  const id = "08072539-82a6-43d3-aaf9-28156533c84f";

  test("makes a request to update the specified Task", () => {
    tasks.update(id, {
      delay: { minutes: 5 },
    });
    expect(client.patch).toHaveBeenCalledWith(`tasks/${id}`, {
      delay: "PT5M",
    });
  });

  describe("with a scheduledFor param", () => {
    test("makes a request to update a Task scheduled for the specified date", async () => {
      const scheduledFor = new Date();
      tasks.update(id, { scheduledFor });
      expect(client.patch).toHaveBeenCalledWith(`tasks/${id}`, {
        scheduled_for: scheduledFor.toISOString(),
      });
    });
  });

  describe("with a scheduledFor param and a scheduled_for param", () => {
    test("makes a request, preferring scheduledFor param to deprecated scheduled_for param", async () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const scheduled_for = "2022-10-17T22:28:17.615Z";
      const scheduledFor = new Date();
      tasks.update(id, { scheduledFor, scheduled_for });
      expect(client.patch).toHaveBeenCalledWith(`tasks/${id}`, {
        scheduled_for: scheduledFor.toISOString(),
      });
    });
  });

  describe("with a delay param", () => {
    test("makes a request to update a Task, setting the delay to the specified Duration serialized to an ISO 8601 Duration string", () => {
      const delay: Duration = { minutes: 7, seconds: 3 };
      tasks.update(id, { delay });
      expect(client.patch).toHaveBeenCalledWith(`tasks/${id}`, {
        delay: "PT7M3S",
      });
    });

    test("makes a request to create a Task, setting the delay to the specified ISO 8601 Duration string", () => {
      tasks.update(id, { delay: "PT5M" });
      expect(client.patch).toHaveBeenCalledWith(`tasks/${id}`, {
        delay: "PT5M",
      });
    });
  });
});

describe("#delete", () => {
  test("makes a request to delete the specified Task", () => {
    const id = "08072539-82a6-43d3-aaf9-28156533c84f";
    tasks.delete(id);
    expect(client.delete).toHaveBeenCalledWith(`tasks/${id}`);
  });
});

describe("#list", () => {
  test("makes a request to retrieve Tasks", () => {
    tasks.list();
    expect(client.get).toHaveBeenCalledWith("tasks");
  });
});

describe("#run", () => {
  test("makes a request to run the specified Task", () => {
    const id = "08072539-82a6-43d3-aaf9-28156533c84f";
    tasks.run(id);
    expect(client.post).toHaveBeenCalledWith(`tasks/${id}/run`);
  });
});
