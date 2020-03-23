import Events from "./events";

it("throws an error when created without a secret", () => {
  expect(() => new Events("")).toThrow();
});

it("does not throw when provided with a secret", () => {
  new Events("a secret");
});
