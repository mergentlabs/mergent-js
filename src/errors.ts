/* eslint-disable max-classes-per-file */

export interface MergentErrorParams {
  message: string;
}

class MergentError extends Error {
  constructor(params: MergentErrorParams) {
    super(params.message);
  }
}

export class MergentAPIError extends MergentError {}
