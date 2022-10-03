/* eslint-disable no-console */

import express from "express";
import Mergent from "mergent";

const app = express();
const mergent = new Mergent("...");

app.get("/", (req, res) => {
  mergent.tasks
    .create({
      request: {
        // 1. Change `BASE_URL` to the full base URL of your app (e.g., https://example.com)
        url: "BASE_URL/webhooks/mergent/send-email",
      },
    })
    .then((task) => {
      console.log(task);
      res.send("Task created.");
    })
    .catch((error) => {
      console.error(error);
      res.send("An error occured. Check your console for details.");
    });
});

app.get("/webhooks/mergent/send-email", (req, res) => {
  // 2. Perform the Task here, sending any errors in the response to Mergent so
  // that the request can be retried.
  res.send("");
});

app.listen(3000, () => {
  console.log("Listening...");
});
