/* eslint-disable no-console */

import express from "express";
import Mergent from "mergent";

const app = express();
const mergent = new Mergent("...");

app.get("/", (req, res) => {
  mergent.tasks
    .create({
      request: {
        url: "...",
      },
    })
    .then((task) => console.log(task))
    .catch((error) => console.error(error));

  res.send("Check your console...");
});

app.listen(3000, () => {
  console.log("Listening...");
});
