import Mergent from "mergent";

/**
 * 2. Create a route to enqueue the Task.
 *
 *    Alternatively, you can enqueue the Task from another server-side function
 *    like `getServerSideProps`.
 */
export default async (req, res) => {
  const apiKey = process.env.MERGENT_API_KEY;
  const baseURL = process.env.BASE_URL;

  const mergent = new Mergent(apiKey);
  const task = await mergent.tasks.create({
    request: {
      url: baseURL + "/api/tasks/log",
      body: "Hello, world!",
    },
  });

  // All Next.js API routes must send a response to the caller.
  // See: https://nextjs.org/docs/api-routes/introduction
  res.status(200).send(`Task ${task.id} has been enqueued successfully. 🎊`);
};
