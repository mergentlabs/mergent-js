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
    const json = {
      message: "something went wrong",
      errors: [
        { message: "param0 error", param: "param0" },
        { message: "param1 error", param: "param1" },
        { message: "another error" },
      ],
    };
    const error = new MergentAPIError(json);
    expect(error.message).toBe(json.message);
    expect(error.errors).toHaveLength(3);

    const e0 = error.errors && error.errors[0];
    expect(e0?.message).toBe("param0 error");
    expect(e0?.param).toBe("param0");

    const e1 = error.errors && error.errors[1];
    expect(e1?.message).toBe("param1 error");
    expect(e1?.param).toBe("param1");

    const e2 = error.errors && error.errors[2];
    expect(e2?.message).toBe("another error");
    expect(e2?.param).toBeUndefined();
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
