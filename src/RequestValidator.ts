import crypto from "crypto";

export default class RequestValidator {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  buildSignatureFor(url: string, body: string) {
    const data = (url || "") + (body || "");

    return crypto
      .createHmac("sha1", this.apiKey)
      .update(Buffer.from(data, "utf-8"))
      .digest("base64");
  }

  validateSignature(url: string, body: string, signature: string) {
    return this.buildSignatureFor(url, body) === signature;
  }
}
