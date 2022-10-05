import log from "./log";

/**
 * 2. Create a route to enqueue the Task. Alternatively, enqueue the Task
 *    from another server-side function like `getServerSideProps`.
 *
 *    All API routes must respond. In this case, we send a message string to the
 *    frontend for demo purposes, but you can also send an empty string, an
 *    object, or anything else.
 *    Details: https://nextjs.org/docs/api-routes/introduction
 */
export default async (req, res) => {
  const task = await log.enqueue("Hello, world!");

  res.status(200).send(`Task ${task.id} has been enqueued successfully. 🎊`);
};
