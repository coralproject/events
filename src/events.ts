import validate from "./validate";

export default class Events {
  private readonly secret: string;

  constructor(secret: string) {
    if (!secret) {
      throw new Error("secret is required");
    }

    this.secret = secret;
  }

  public validate(body: string, sig: string) {
    return validate(this.secret, body, sig);
  }
}
