const Mergent = require("mergent");

const mergent = new Mergent("...");

export default function handler(req, res) {
  mergent.schedules
    .create({
      cron: "* * * * *",
      request: {
        headers: { "Content-Type": "application/json" },
        url: "...",
        body: JSON.stringify({ hello: "world" }),
      },
    })
    .then((schedule) => console.log(schedule))
    .catch((error) => console.error(error));

  res.status(200).send("");
}
