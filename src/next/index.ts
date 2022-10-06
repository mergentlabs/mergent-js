import type { NextApiResponse, NextApiRequest } from "next";
import { serialize as iso8601Duration } from "tinyduration";
import Mergent from "..";

type TaskHandler = (data: object | string) => unknown | Promise<unknown>;
type TaskOptions = { apiKey?: string; baseURL?: string };

interface EnqueueTaskOptions {
  scheduledFor?: Date;

  delay?: {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  };
}

/**
 * Define a Task to be enqueued and performed asyncronously. This must be
 * called from the server-side in an API route, `getServerSideProps`, or
 * similar.
 */
export const Task = (
  path: string,
  handler: TaskHandler,
  options?: TaskOptions
) => {
  const apiKey = process.env.MERGENT_API_KEY || options?.apiKey;
  if (apiKey === undefined) {
    const msg =
      "A Mergent API Key is required by either setting the MERGENT_API_KEY environment variable or passing it to the Task function.";
    throw new Error(msg);
  }

  // Infer the baseURL, if possible.
  // - Render: https://render.com/docs/environment-variables
  // - Netlify: https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
  //
  // Unfortunately, Vercel does not set a production base URL environment
  // variable, so it must be done manually.
  // - Vercel: https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
  const baseURL =
    process.env.BASE_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    process.env.URL ||
    options?.baseURL;
  if (baseURL === undefined) {
    const msg =
      "A base URL is required by either setting the BASE_URL environment variable or passing it to the Task function.";
    throw new Error(msg);
  }

  const mergent = new Mergent(apiKey);
  const url = new URL(path, baseURL).toString();

  /**
   * Handle the incoming request from Mergent. Catches errors throwin in the
   * TaskHandler and returns them to Mergent.
   */
  const nextAPIHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // TODO: Validate the request. This is more difficult than expected
    // because Next.js does not allow us to access the raw request body.
    // Instead, the body is parsed, including parsing non-JSON strings as
    // JSON.
    //
    // A workaround is available where we would require all users to disable
    // body-parser per-Task, which that is not ideal.
    //
    // See: https://github.com/vercel/next.js/discussions/13405
    try {
      const data = req.body as object | string;
      const result = await handler({ data });
      res.status(200).send(result);
    } catch (err) {
      const errorJSON = JSON.stringify(err, Object.getOwnPropertyNames(err));
      res.status(500).send(errorJSON);
    }
  };

  /** Enqueue the Task with the specified data and options */
  nextAPIHandler.enqueue = async (
    data: object | string,
    enqueueTaskOptions?: EnqueueTaskOptions
  ) => {
    const scheduledFor = enqueueTaskOptions?.scheduledFor?.toISOString();
    const delay = enqueueTaskOptions?.delay
      ? iso8601Duration(enqueueTaskOptions.delay)
      : undefined;
    const body = JSON.stringify(data);

    return mergent.tasks.create({
      scheduled_for: scheduledFor,
      delay,
      request: { url, body },
    });
  };

  return nextAPIHandler;
};

export default {};
