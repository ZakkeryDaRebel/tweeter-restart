import {
  AuthToken,
  RegisterRequest,
  User,
  PagedUserItemRequest,
  TokenedAliasRequest,
} from "tweeter-shared";
import { ServerFacade } from "../../src/network/ServerFacade";
import "isomorphic-fetch";

const MALE_IMAGE_URL = "fake-image";
const FEMALE_IMAGE_URL = "fake-image";

const fakeDataUsers: User[] = [
  new User("Allen", "Anderson", "@allen", MALE_IMAGE_URL),
  new User("Amy", "Ames", "@amy", FEMALE_IMAGE_URL),
  new User("Bob", "Bobson", "@bob", MALE_IMAGE_URL),
  new User("Bonnie", "Beatty", "@bonnie", FEMALE_IMAGE_URL),
  new User("Chris", "Colston", "@chris", MALE_IMAGE_URL),
  new User("Cindy", "Coats", "@cindy", FEMALE_IMAGE_URL),
  new User("Dan", "Donaldson", "@dan", MALE_IMAGE_URL),
  new User("Dee", "Dempsey", "@dee", FEMALE_IMAGE_URL),
  new User("Elliott", "Enderson", "@elliott", MALE_IMAGE_URL),
  new User("Elizabeth", "Engle", "@elizabeth", FEMALE_IMAGE_URL),
  new User("Frank", "Frandson", "@frank", MALE_IMAGE_URL),
  new User("Fran", "Franklin", "@fran", FEMALE_IMAGE_URL),
  new User("Gary", "Gilbert", "@gary", MALE_IMAGE_URL),
  new User("Giovanna", "Giles", "@giovanna", FEMALE_IMAGE_URL),
  new User("Henry", "Henderson", "@henry", MALE_IMAGE_URL),
  new User("Helen", "Hopwell", "@helen", FEMALE_IMAGE_URL),
  new User("Igor", "Isaacson", "@igor", MALE_IMAGE_URL),
  new User("Isabel", "Isaacson", "@isabel", FEMALE_IMAGE_URL),
  new User("Justin", "Jones", "@justin", MALE_IMAGE_URL),
  new User("Jill", "Johnson", "@jill", FEMALE_IMAGE_URL),
  new User("Kent", "Knudson", "@kent", MALE_IMAGE_URL),
  new User("Kathy", "Kunzler", "@kathy", FEMALE_IMAGE_URL),
];

describe("ServerFacade Integration tests", () => {
  const serverFacade: ServerFacade = new ServerFacade();
  const timeNow = Date.now();
  const pageSize = 15;

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

  it("gets Followers", async () => {
    let request: PagedUserItemRequest = {
      token: "1234",
      userAlias: "@Alias",
      pageSize: pageSize,
      lastItem: null,
    };

    let lastUser: User = await getUserItems(request, 0, true);

    request = {
      token: "1234",
      userAlias: "@Alias",
      pageSize: pageSize,
      lastItem: lastUser.getDto(),
    };

    await getUserItems(request, pageSize, false);
  });

  it("gets followers count", async () => {
    const request: TokenedAliasRequest = {
      userAlias: "@Alias",
      token: "1234",
    };

    const count = await serverFacade.getFollowerCount(request);

    expect(count).toBeLessThanOrEqual(10);
    expect(count).toBeGreaterThanOrEqual(1);
  });

  async function getUserItems(
    request: PagedUserItemRequest,
    offset: number,
    expectedHasMore: boolean,
  ): Promise<User> {
    const [users, hasMore] = await serverFacade.getMoreFollowers(request);

    expect(users).not.toBeNull();
    if (expectedHasMore) {
      expect(users.length).toEqual(pageSize);
    } else {
      expect(users.length).toBeLessThan(pageSize);
    }

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      expect(user).not.toBeNull();
      expect(user.alias).toEqual(fakeDataUsers[i + offset].alias);
      expect(user.firstName).toEqual(fakeDataUsers[i + offset].firstName);
      expect(user.lastName).toEqual(fakeDataUsers[i + offset].lastName);
    }
    expect(hasMore).toBe(expectedHasMore);

    return users[users.length - 1];
  }
});
