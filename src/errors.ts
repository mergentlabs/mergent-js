/* eslint-disable max-classes-per-file */

export interface MergentAPIErrorParams {
  message: string;
}

export class MergentError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, MergentError.prototype);
  }
}

export class MergentAPIError extends MergentError {
  constructor(params: MergentAPIErrorParams) {
    super(params.message);
    Object.setPrototypeOf(this, MergentAPIError.prototype);
  }
}

export class MergentAPIInvalidJSONError extends MergentError {
  constructor() {
    super("Invalid JSON received from the Mergent API");
    Object.setPrototypeOf(this, MergentAPIInvalidJSONError.prototype);
  }
}
