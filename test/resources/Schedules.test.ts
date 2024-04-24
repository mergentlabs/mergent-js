// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it, jest } from "@jest/globals";

import Client from "../../src/Client";
import Schedules from "../../src/resources/Schedules";

jest.mock("../../src/Client");

const client = new Client({ apiKey: "" });
const schedules = new Schedules(client);

describe("#create", () => {
  describe("with a queue param", () => {
    it("makes a request to create a Schedule on the specified queue", async () => {
      schedules.create({ queue: "foo", request: { url: "" } });
      expect(client.post).toHaveBeenCalledWith("schedules", {
        queue: "foo",
        request: { url: "" },
      });
    });
  });

  describe("without a queue param", () => {
    it("makes a request to create a Schedule on the default queue", async () => {
      schedules.create({ request: { url: "" } });
      expect(client.post).toHaveBeenCalledWith("schedules", {
        queue: "default",
        request: { url: "" },
      });
    });
  });

  describe("with a cron param", () => {
    it("makes a request to create a Schedule, setting the cron string", () => {
      schedules.create({ request: { url: "" }, cron: "0 0 7 * *" });
      expect(client.post).toHaveBeenCalledWith("schedules", {
        queue: "default",
        request: { url: "" },

        cron: "0 0 7 * *",
      });
    });
  });

  describe("with an rrule param", () => {
    it("makes a request to create a Schedule, setting the rrule string", () => {
      schedules.create({ request: { url: "" }, rrule: "FREQ=HOURLY" });
      expect(client.post).toHaveBeenCalledWith("schedules", {
        queue: "default",
        request: { url: "" },
        rrule: "FREQ=HOURLY",
      });
    });
  });

  describe("with an rrule + dtstart param", () => {
    it("makes a request to create a Schedule, setting the rrule string", () => {
      schedules.create({
        request: { url: "" },
        rrule: "FREQ=HOURLY",
        dtstart: "2024-5-01T15:53:05Z",
      });
      expect(client.post).toHaveBeenCalledWith("schedules", {
        queue: "default",
        request: { url: "" },
        rrule: "FREQ=HOURLY",
        dtstart: "2024-5-01T15:53:05Z",
      });
    });
  });
});

describe("#retrieve", () => {
  it("makes a request to retrieve the specified Schedule", () => {
    const id = "28081772-5698-4b70-b8ae-2b3594d33394";
    schedules.retrieve(id);
    expect(client.get).toHaveBeenCalledWith(`schedules/${id}`);
  });
});

describe("#update", () => {
  const id = "28081772-5698-4b70-b8ae-2b3594d33394";
  it("makes a request to update the specified Schedule", () => {
    schedules.update(id, {
      paused: true,
    });
    expect(client.patch).toHaveBeenCalledWith(`schedules/${id}`, {
      paused: true,
    });
  });
});

describe("#update:cron", () => {
  const id = "28081772-5698-4b70-b8ae-2b3594d33369";
  describe("with a cron param", () => {
    it("makes a request to update a Schedule, setting the cron string", () => {
      schedules.update(id, {
        cron: "0 0 7 * *",
      });
      expect(client.patch).toHaveBeenCalledWith(`schedules/${id}`, {
        cron: "0 0 7 * *",
      });
    });
  });
});

describe("#update:rrule", () => {
  const id = "28081772-5698-4b70-b8ae-2b3594d33420";

  describe("with an rrule param", () => {
    it("makes a request to update a Schedule, setting the rrule string", () => {
      schedules.update(id, { rrule: "FREQ=HOURLY" });
      expect(client.patch).toHaveBeenCalledWith(`schedules/${id}`, {
        rrule: "FREQ=HOURLY",
      });
    });
  });

  describe("with a dtstart param", () => {
    it("makes a request to update a Schedule, setting the rrule string", () => {
      schedules.update(id, {
        dtstart: "2024-5-01T15:53:05Z",
      });
      expect(client.patch).toHaveBeenCalledWith(`schedules/${id}`, {
        dtstart: "2024-5-01T15:53:05Z",
      });
    });
  });
});

describe("#delete", () => {
  it("makes a request to delete the specified Schedule", () => {
    const id = "28081772-5698-4b70-b8ae-2b3594d33394";
    schedules.delete(id);
    expect(client.delete).toHaveBeenCalledWith(`schedules/${id}`);
  });
});
