import Client from "./Client";
import RequestValidator from "./RequestValidator";
import Schedules from "./resources/Schedules";
import Tasks from "./resources/Tasks";

export default class Mergent {
  tasks: Tasks;

  schedules: Schedules;

  requestValidator: RequestValidator;

  private client: Client;

  constructor(apiKey: string) {
    this.client = new Client({ apiKey });

    this.tasks = new Tasks(this.client);
    this.schedules = new Schedules(this.client);

    this.requestValidator = new RequestValidator(apiKey);
  }
}
