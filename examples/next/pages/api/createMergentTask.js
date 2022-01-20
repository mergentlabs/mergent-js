const Mergent = require("mergent");

const mergent = new Mergent("...");

export default function handler(req, res) {
  mergent.tasks
    .create({
      request: {
        headers: { "Content-Type": "application/json" },
        url: "...",
        body: JSON.stringify({ hello: "world" }),
      },
    })
    .then((task) => console.log(task))
    .catch((error) => console.error(error));

  res.status(200).send("");
}
