import Client from "./Client";
import RequestValidator from "./RequestValidator";
import Jobs from "./resources/Jobs";
import Schedules from "./resources/Schedules";
import Tasks from "./resources/Tasks";

export default class Mergent {
  tasks: Tasks;

  jobs: Jobs;

  schedules: Schedules;

  requestValidator: RequestValidator;

  private client: Client;

  constructor(apiKey: string) {
    this.client = new Client({ apiKey });

    this.tasks = new Tasks(this.client);
    this.jobs = new Jobs(this.client);
    this.schedules = new Schedules(this.client);

    this.requestValidator = new RequestValidator(apiKey);
  }
}
