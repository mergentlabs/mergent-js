const Mergent = require("mergent");

const mergent = new Mergent("...");

export default function handler(req, res) {
  mergent.tasks
    .create({
      request: {
        url: "...",
      },
    })
    .then((task) => console.log(task))
    .catch((error) => console.error(error));

  res.status(200).send("");
}
