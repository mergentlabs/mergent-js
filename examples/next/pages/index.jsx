const Home = () => {
  async function createTask(event) {
    event.preventDefault();
    await fetch("/api/createMergentTask", { method: "POST" });
  }

  async function createSchedule(event) {
    event.preventDefault();
    await fetch("/api/createMergentSchedule", { method: "POST" });
  }

  return (
    <>
      <div>
        <ol>
          <li>Press Button, calls /api/createMergentTask</li>
          <li>
            Mergent Task is created (make sure to specify
            YOURAPI/api/mergentWebhook)
          </li>
          <li>Mergent Task is invoked, calls /api/mergentWebhook</li>
          <li>View Logs</li>
        </ol>
        <form onSubmit={createTask}>
          <button>Create Mergent Task</button>
        </form>
      </div>
      <div>
        <ol>
          <li>Press Button, calls /api/createMergentSchedule</li>
          <li>
            Mergent Schedule is created (make sure to specify
            YOURAPI/api/mergentWebhook)
          </li>
          <li>Mergent Schedule is invoked, calls /api/mergentWebhook</li>
          <li>View Logs</li>
        </ol>
        <form onSubmit={createSchedule}>
          <button>Create Mergent Schedule</button>
        </form>
      </div>
    </>
  );
};

export default Home;
