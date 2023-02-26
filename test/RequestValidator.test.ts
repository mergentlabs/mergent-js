// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";

import RequestValidator from "../src/RequestValidator";

const validator = new RequestValidator("12345");

describe("#buildSignature", () => {
  it("builds a HMAC-SHA1 signature for the provided body", () => {
    const body = "foo";

    const signature = validator.buildSignature(body);

    expect(signature).toBe("QjZpKdTK/iwkUWiz3seoPbJHA0I=");
  });

  it("is valid with empty params", () => {
    const signature = validator.buildSignature("");

    expect(signature).toBe("KT7FsM8VSFUliCTsf6xdxj0XaRU=");
  });
});

describe("#validateSignature", () => {
  it("returns true when the signature is valid", () => {
    const signature = validator.buildSignature("");

    expect(validator.validateSignature("", signature)).toBe(true);
  });

  it("returns false when the signature is invalid", () => {
    expect(validator.validateSignature("", "invalidsignature")).toBe(false);
  });
});
