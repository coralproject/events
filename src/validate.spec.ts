import validate from "./validate";

const secret =
  "whsec_0af4e6949ab9d1991cf0a9cb7716e28cfcadc70421b72bd29151fdbc17ffe4fe08264db2";
const body = `{
  "id": "f00b3ebd-72b0-43f2-96c9-4133bd94c39e",
  "createdAt": "2020-03-23T21:48:46.797Z",
  "data": {
    "storyID": "09f72dc9-be0f-4e80-afa8-3608b0975a1b",
    "storyURL": "http://localhost:8080/"
  },
  "type": "STORY_CREATED"
}`;
const parsedBody = {
  id: "f00b3ebd-72b0-43f2-96c9-4133bd94c39e",
  createdAt: "2020-03-23T21:48:46.797Z",
  data: {
    storyID: "09f72dc9-be0f-4e80-afa8-3608b0975a1b",
    storyURL: "http://localhost:8080/",
  },
  type: "STORY_CREATED",
};
const sig =
  "sha256=35f864c773be328ad4a57cd8e1d5ca17a4fc9e5cfce462c8e5f470224264836e";

it("validates a valid response", () => {
  expect(validate(secret, body, sig)).toEqual(parsedBody);
});

it("validates a valid response even with bad other signature", () => {
  expect(validate(secret, body, sig + ",sha256=<not valid>")).toEqual(
    parsedBody
  );
});

it("rejects an invalid signature", () => {
  expect(() => validate(secret, body, sig + "<not valid>")).toThrow();
});
