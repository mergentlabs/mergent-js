import RequestValidator from "../src/RequestValidator";

const validator = new RequestValidator("12345");

describe("#buildSignatureFor", () => {
  test("builds a HMAC-SHA1 signature for the provided body", () => {
    const body = "foo";

    const signature = validator.buildSignatureFor(body);

    expect(signature).toBe("QjZpKdTK/iwkUWiz3seoPbJHA0I=");
  });

  test("is valid with empty params", () => {
    const signature = validator.buildSignatureFor("");

    expect(signature).toBe("KT7FsM8VSFUliCTsf6xdxj0XaRU=");
  });
});

describe("#validateSignature", () => {
  test("returns true when the signature is valid", () => {
    const signature = validator.buildSignatureFor("");

    expect(validator.validateSignature("", signature)).toBe(true);
  });

  test("returns false when the signature is invalid", () => {
    expect(validator.validateSignature("", "invalidsignature")).toBe(false);
  });
});
