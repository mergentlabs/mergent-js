import {
  MergentError,
  MergentAPIError,
  MergentAPIInvalidJSONError,
} from "../src/errors";

describe("MergentError", () => {
  it("has the correct prototype", () => {
    const error = new MergentError("");
    expect(error instanceof MergentError).toBe(true);
  });
});

describe("MergentAPIError", () => {
  it("can be initailized from a Mergent API JSON response", () => {
    const message = "something went wrong";
    const error = new MergentAPIError({ message });
    expect(error.message).toBe(message);
  });

  it("has the correct prototype", () => {
    const error = new MergentAPIError({ message: "" });
    expect(error instanceof MergentAPIError).toBe(true);
  });
});

describe("MergentAPIInvalidJSONError", () => {
  it("has the correct prototype", () => {
    const error = new MergentAPIInvalidJSONError();
    expect(error instanceof MergentAPIInvalidJSONError).toBe(true);
  });
});
