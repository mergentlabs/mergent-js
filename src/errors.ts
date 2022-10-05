/* eslint-disable max-classes-per-file */

export interface MergentAPIErrorParams {
  message: string;
}

export class MergentAPIError extends Error {
  constructor(params: MergentAPIErrorParams) {
    super(params.message);
  }
}
