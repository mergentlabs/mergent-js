import { describe, expect, it, test } from "@jest/globals";
import {
  MergentAPIError,
  MergentAPIInvalidJSONError,
  MergentAPIUnexpectedStatusCodeError,
} from "../src/errors";

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

    const e0 = error.errors?.[0];
    expect(e0?.message).toBe("param0 error");
    expect(e0?.param).toBe("param0");

    const e1 = error.errors?.[1];
    expect(e1?.message).toBe("param1 error");
    expect(e1?.param).toBe("param1");

    const e2 = error.errors?.[2];
    expect(e2?.message).toBe("another error");
    expect(e2?.param).toBeUndefined();
  });
});

test("MergentAPIInvalidJSONError", () => {
  const error = new MergentAPIInvalidJSONError(500);
  expect(error.message).toBe(
    "[500] Invalid JSON received from the Mergent API"
  );
});

test("MergentAPIUnexpectedStatusCodeError", () => {
  const error = new MergentAPIUnexpectedStatusCodeError(500);
  expect(error.message).toBe(
    "[500] Unexpected status code received from the Mergent API"
  );
});
