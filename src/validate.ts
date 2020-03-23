const crypto = require("crypto");

function validate(secret: string, body: string, sig: string) {
  // Step 1: Extract signatures from the header.
  const signatures = sig
    // Split the header by `,` to get a list of elements.
    .split(",")
    // Split each element by `=` to get a prefix and value pair.
    .map(element => element.split("="))
    // Grab all the elements with the prefix of `sha256`.
    .filter(([prefix]) => prefix === "sha256")
    // Grab the value from the prefix and value pair.
    .map(([, value]) => value);

  // Step 2: Prepare the `signed_payload`.
  const signed_payload = body;

  // Step 3: Calculate the expected signature.
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signed_payload)
    .digest()
    .toString("hex");

  // Step 4: Compare signatures.
  if (
    // For each of the signatures on the request...
    !signatures.some(signature =>
      // Compare the expected signature to the signature on in the header. If at
      // least one of the match, we should continue to process the event.
      crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    )
  ) {
    throw new Error("Invalid signature");
  }

  // Parse the JSON for the event.
  return JSON.parse(body.toString());
}

export default validate;
