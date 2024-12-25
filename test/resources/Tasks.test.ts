import { describe, expect, it, jest } from "@jest/globals";

import Client from "../../src/Client";
import type Duration from "../../src/types/Duration";
import Tasks from "../../src/resources/Tasks";

jest.mock("../../src/Client");

const client = new Client({ apiKey: "" });
const tasks = new Tasks(client);

describe("#create", () => {
  describe("with a queue param", () => {
    it("makes a request to create a Task on the specified queue", async () => {
      await tasks.create({ queue: "foo", request: { url: "" } });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "foo",
        request: { url: "" },
      });
    });
  });

  describe("without a queue param", () => {
    it("makes a request to create a Task on the default queue", async () => {
      await tasks.create({ request: { url: "" } });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "default",
        request: { url: "" },
      });
    });
  });

  describe("with a scheduledFor param", () => {
    it("makes a request to create a Task scheduled for the specified date", async () => {
      const scheduledFor = new Date();
      await tasks.create({ request: { url: "" }, scheduledFor });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "default",
        request: { url: "" },
        scheduled_for: scheduledFor.toISOString(),
      });
    });
  });

  describe("with a scheduledFor param and a scheduled_for param", () => {
    it("makes a request, preferring scheduledFor param to deprecated scheduled_for param", async () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const scheduled_for = "2022-10-17T22:28:17.615Z";
      const scheduledFor = new Date();
      await tasks.create({ request: { url: "" }, scheduledFor, scheduled_for });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "default",
        request: { url: "" },
        scheduled_for: scheduledFor.toISOString(),
      });
    });
  });

  describe("with a delay param", () => {
    it("makes a request to create a Task, setting the delay to the specified Duration serialized to a duration string", async () => {
      const delay: Duration = { minutes: 7, seconds: 3 };
      await tasks.create({ request: { url: "" }, delay });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "default",
        request: { url: "" },
        delay: "7m3s",
      });
    });

    it("makes a request to create a Task, setting the delay to the specified string", async () => {
      await tasks.create({ request: { url: "" }, delay: "5m" });
      expect(client.post).toHaveBeenCalledWith("tasks", {
        queue: "default",
        request: { url: "" },
        delay: "5m",
      });
    });
  });
});

describe("#retrieve", () => {
  it("makes a request to retrieve the specified Task", async () => {
    const id = "08072539-82a6-43d3-aaf9-28156533c84f";
    await tasks.retrieve(id);
    expect(client.get).toHaveBeenCalledWith(`tasks/${id}`);
  });
});

describe("#update", () => {
  const id = "08072539-82a6-43d3-aaf9-28156533c84f";

  it("makes a request to update the specified Task", async () => {
    await tasks.update(id, {
      delay: { minutes: 5 },
    });
    expect(client.patch).toHaveBeenCalledWith(`tasks/${id}`, {
      delay: "5m",
    });
  });

  describe("with a scheduledFor param", () => {
    it("makes a request to update a Task scheduled for the specified date", async () => {
      const scheduledFor = new Date();
      await tasks.update(id, { scheduledFor });
      expect(client.patch).toHaveBeenCalledWith(`tasks/${id}`, {
        scheduled_for: scheduledFor.toISOString(),
      });
    });
  });

  describe("with a scheduledFor param and a scheduled_for param", () => {
    it("makes a request, preferring scheduledFor param to deprecated scheduled_for param", async () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const scheduled_for = "2022-10-17T22:28:17.615Z";
      const scheduledFor = new Date();
      await tasks.update(id, { scheduledFor, scheduled_for });
      expect(client.patch).toHaveBeenCalledWith(`tasks/${id}`, {
        scheduled_for: scheduledFor.toISOString(),
      });
    });
  });

  describe("with a delay param", () => {
    it("makes a request to update a Task, setting the delay to the specified Duration serialized to a duration string", async () => {
      const delay: Duration = { minutes: 7, seconds: 3 };
      await tasks.update(id, { delay });
      expect(client.patch).toHaveBeenCalledWith(`tasks/${id}`, {
        delay: "7m3s",
      });
    });

    it("makes a request to create a Task, setting the delay to the specified string", async () => {
      await tasks.update(id, { delay: "5m" });
      expect(client.patch).toHaveBeenCalledWith(`tasks/${id}`, {
        delay: "5m",
      });
    });
  });
});

describe("#run", () => {
  it("makes a request to run the specified Task", async () => {
    const id = "08072539-82a6-43d3-aaf9-28156533c84f";
    await tasks.run(id);
    expect(client.post).toHaveBeenCalledWith(`tasks/${id}/run`);
  });
});

describe("#list", () => {
  it("makes a request to retrieve Tasks", async () => {
    await tasks.list();
    expect(client.get).toHaveBeenCalledWith("tasks");
  });
});

describe("#delete", () => {
  it("makes a request to delete the specified Task", async () => {
    const id = "08072539-82a6-43d3-aaf9-28156533c84f";
    await tasks.delete(id);
    expect(client.delete).toHaveBeenCalledWith(`tasks/${id}`);
  });
});
