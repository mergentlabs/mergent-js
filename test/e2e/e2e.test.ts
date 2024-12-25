import { describe, expect, test } from "@jest/globals";
import Mergent from "../../src/Mergent";
import { MergentAPIError } from "../../src/errors";

/**
 * These tests hit the production API and will only run if an API key is
 * provided.
 */
describe("e2e", () => {
  const apiKey = process.env["E2E_TESTING_MERGENT_API_KEY"] ?? "";

  if (apiKey.length === 0) {
    test("disabled", () => {
      expect(true).toBe(true);
    });

    return;
  }

  const mergent = new Mergent(apiKey);

  test("tasks", async () => {
    // create
    const url = "https://jsonplaceholder.typicode.com/posts";
    const scheduledFor = new Date();
    scheduledFor.setFullYear(2030);

    const task = await mergent.tasks.create({
      request: {
        url,
      },
      scheduledFor,
    });
    expect(task.id.length).toBe(36);
    expect(task.request.url).toBe(url);
    // TODO: Parse and test scheduledFor.

    // retrieve
    const retrievedTask = await mergent.tasks.retrieve(task.id);
    expect(retrievedTask.id).toBe(task.id);
    expect(retrievedTask.request.url).toBe(task.request.url);
    // TODO: Parse and test scheduledFor.

    // update
    const updatedURL =
      "https://jsonplaceholder.typicode.com/posts?updated=true";
    const updatedScheduledFor = new Date();
    updatedScheduledFor.setFullYear(2040);

    const updatedTask = await mergent.tasks.update(task.id, {
      request: {
        url: updatedURL,
      },
      scheduledFor,
    });
    expect(updatedTask.id).toBe(task.id);
    expect(updatedTask.request.url).toBe(updatedURL);
    // TODO: Parse and test updatedScheduledFor.

    // run
    const runTask = await mergent.tasks.run(task.id);
    expect(runTask.id).toBe(task.id);

    // list
    const tasks = await mergent.tasks.list();
    const taskIDs = tasks.map((t) => t.id);
    expect(taskIDs).toContain(task.id);

    // delete
    await expect(mergent.tasks.delete(task.id)).resolves.not.toThrow(
      MergentAPIError,
    );
    await expect(mergent.tasks.retrieve(task.id)).rejects.toThrow(
      MergentAPIError,
    );
  });

  test("schedules", async () => {
    // create
    const url = "https://jsonplaceholder.typicode.com/posts";
    const scheduledFor = new Date();
    scheduledFor.setFullYear(2030);

    const schedule = await mergent.schedules.create({
      cron: "* * * * *",
      request: {
        url,
      },
    });
    expect(schedule.id.length).toBe(36);
    expect(schedule.request.url).toBe(url);

    // retrieve
    const retrievedSchedule = await mergent.schedules.retrieve(schedule.id);
    expect(retrievedSchedule.id).toBe(schedule.id);
    expect(retrievedSchedule.request.url).toBe(schedule.request.url);

    // update
    const updatedURL =
      "https://jsonplaceholder.typicode.com/posts?updated=true";

    const updatedSchedule = await mergent.schedules.update(schedule.id, {
      request: {
        url: updatedURL,
      },
    });
    expect(updatedSchedule.id).toBe(schedule.id);
    expect(updatedSchedule.request.url).toBe(updatedURL);

    // list
    const schedules = await mergent.schedules.list();
    const scheduleIDs = schedules.map((t) => t.id);
    expect(scheduleIDs).toContain(schedule.id);

    // delete
    await expect(mergent.schedules.delete(schedule.id)).resolves.not.toThrow(
      MergentAPIError,
    );
    await expect(mergent.schedules.retrieve(schedule.id)).rejects.toThrow(
      MergentAPIError,
    );
  });
});
