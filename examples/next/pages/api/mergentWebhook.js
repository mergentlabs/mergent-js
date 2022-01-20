import Mergent from "mergent";

const mergent = new Mergent("...");

export default function handler(req, res) {
  console.log("Mergent Task received.");

  // Next.js does not allow us to access the raw request body. Instead, it
  // parses everything, including non-JSON strings, as JSON.
  // See: https://github.com/vercel/next.js/discussions/13405
  const isValid = mergent.requestValidator.validateSignature(
    JSON.stringify(req.body),
    req.headers["x-mergent-signature"]
  );

  console.log(isValid ? "Mergent Task is valid." : "Mergent Task is invalid.");

  res.status(200).send("");
}
