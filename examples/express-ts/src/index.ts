/* eslint-disable no-console */

import express from "express";
import Mergent from "mergent";

const app = express();
const mergent = new Mergent("...");

app.get("/", (req, res) => {
  // Create Task
  mergent.tasks
    .create({
      request: {
        url: "...",
      },
    })
    .then((task) => console.log(task))
    .catch((error) => console.error(error));

  // Create Job
  mergent.jobs
    .create({
      activity: {
        name: "...",
      },
    })
    .then((jobs) => console.log(jobs))
    .catch((error) => console.error(error));

  res.send("Check your console...");
});

app.listen(3000, () => {
  console.log("Listening...");
});
