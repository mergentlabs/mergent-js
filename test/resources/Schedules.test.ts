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
});
