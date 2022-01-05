import Client from "./Client";
import Tasks from "./resources/Tasks";

export default class Mergent {
  tasks: Tasks;

  private client: Client;

  constructor(apiKey: string) {
    this.client = new Client({ apiKey });

    this.tasks = new Tasks(this.client);
  }
}
