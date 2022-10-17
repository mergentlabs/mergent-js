import { useState } from "react";

const Home = () => {
  /**
   * 3. `onSubmit`, call the API route or server-side function to enqueue the
   *    Task. Using an API route or server-side function ensures that the
   *    Mergent API key will not be exposed to anyone on the client-side.
   */
  const createTask = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/tasks/log.enqueue");

    const message = await res.text();
    setMessage(message);
  };

  const [message, setMessage] = useState("Nothing has been enqueued yet...");

  return (
    <>
      <div>
        <p>
          When the below button is pressed, a request is made to the
          `/api/tasks/log.enqueue` route which enqueues a Log Task defined at
          `/api/tasks/log`.
        </p>
        <form onSubmit={createTask}>
          <button>Enqueue Mergent Task</button>
        </form>
        <p>{message}</p>
      </div>
    </>
  );
};

export default Home;
