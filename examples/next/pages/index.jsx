const Home = () => {
  async function createTask(event) {
    event.preventDefault();
    await fetch("/api/createMergentTask", { method: "POST" });
  }

  return (
    <>
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
    </>
  );
};

export default Home;
