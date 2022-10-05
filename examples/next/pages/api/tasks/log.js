import { Task } from "mergent/next";

/**
 * 1. Create a route to define the Task. This is the code for the Task itself.
 */
export default Task("api/tasks/log", ({ data }) => {
  // In this example we just log the data (hence the name `log`), but this is
  // where you want to perform the work itself.
  console.log(`Received: ${data}`);
});
