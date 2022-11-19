/* eslint-disable max-classes-per-file */

export interface MergentAPIErrorParams {
  message: string;
  param?: string;
  errors?: MergentAPIErrorParams[];
}

export class MergentError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, MergentError.prototype);
  }
}

export class MergentAPIError extends MergentError {
  param?: string | undefined;

  errors?: MergentAPIError[] | undefined;

  constructor(params: MergentAPIErrorParams) {
    super(params.message);
    Object.setPrototypeOf(this, MergentAPIError.prototype);

    this.param = params.param;
    this.errors = params.errors?.map(
      (errorParams) => new MergentAPIError(errorParams)
    );
  }
}

export class MergentAPIInvalidJSONError extends MergentError {
  constructor() {
    super("Invalid JSON received from the Mergent API");
    Object.setPrototypeOf(this, MergentAPIInvalidJSONError.prototype);
  }
}
