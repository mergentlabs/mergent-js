/**
 * 1. Create an API route to define the Task.
 *
 *    This is the code for the Task itself, and is where you'd write the code
 *    to send an email, process data, or anything else you'd like to do.
 *
 *    In this example, we don't do anything besides log the body of the request.
 */
export default (req, res) => {
  console.log(`Received: ${req.body}`);

  // All Next.js API routes must send a response to the caller.
  // See: https://nextjs.org/docs/api-routes/introduction
  res.status(200).send("Done! 🎊");
};
