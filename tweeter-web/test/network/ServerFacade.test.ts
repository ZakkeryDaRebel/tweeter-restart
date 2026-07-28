import { AuthToken, RegisterRequest, User } from "tweeter-shared";
import { ServerFacade } from "../../src/network/ServerFacade";
import "isomorphic-fetch";

describe("ServerFacade Integration tests", () => {
  const serverFacade: ServerFacade = new ServerFacade();
  const timeNow = Date.now();

  it("sends a register request", async () => {
    const request: RegisterRequest = {
      userAlias: "@Alias",
      password: "1234",
      firstName: "first-name",
      lastName: "last-name",
      imageStringBase64: "fake-image",
      imageFileExtension: "png",
    };

    const [user, authToken]: [User, AuthToken] =
      await serverFacade.register(request);

    expect(user).not.toBeNull();
    expect(user.alias).toEqual("@allen");
    expect(user.firstName).toEqual("Allen");
    expect(user.lastName).toEqual("Anderson");
    expect(user.name).toEqual("Allen Anderson");

    expect(authToken).not.toBeNull();
    expect(authToken.timestamp).toBeGreaterThan(timeNow);
    expect(authToken.token).not.toBeNull();
  });
});
