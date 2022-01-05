/* eslint-disable no-console */

const express = require("express");
const Mergent = require("mergent");

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
