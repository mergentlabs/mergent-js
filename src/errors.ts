/* eslint-disable max-classes-per-file */

export interface MergentAPIErrorParams {
  message: string;
  param?: string;
  errors?: MergentAPIErrorParams[];
}

class MergentError extends Error {}

export class MergentAPIError extends MergentError {
  param?: string | undefined;

  errors?: MergentAPIError[] | undefined;

  constructor(params: MergentAPIErrorParams) {
    super(params.message);

    this.param = params.param;
    this.errors = params.errors?.map(
      (errorParams) => new MergentAPIError(errorParams),
    );
  }
}

export class MergentAPIInvalidJSONError extends MergentError {
  constructor(status: number) {
    super(`[${status}] Invalid JSON received from the Mergent API`);
  }
}

export class MergentAPIUnexpectedStatusCodeError extends MergentError {
  constructor(status: number) {
    super(`[${status}] Unexpected status code received from the Mergent API`);
  }
}
