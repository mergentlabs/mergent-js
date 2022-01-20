import crypto from "crypto";

export default class RequestValidator {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  buildSignatureFor(body: string) {
    const data = body || "";

    return crypto
      .createHmac("sha1", this.apiKey)
      .update(Buffer.from(data, "utf-8"))
      .digest("base64");
  }

  validateSignature(body: string, signature: string) {
    return this.buildSignatureFor(body) === signature;
  }
}
