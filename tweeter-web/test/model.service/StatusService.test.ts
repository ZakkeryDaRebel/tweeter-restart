import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../../src/model.service/StatusService";
import "isomorphic-fetch";

const MALE_IMAGE_URL = "fake-url";
const FEMALE_IMAGE_URL = "fake-url";
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

describe("StatusService tests", () => {
  const authToken: AuthToken = new AuthToken("1234", Date.now());
  const userAlias: string = "@Alias";
  const pageSize: number = 10;

  it("returns a user's story pages", async () => {
    const lastItem: Status = await getStatusItems(null, 0);
    await getStatusItems(lastItem, pageSize);
  });

  async function getStatusItems(lastItem: Status | null, offset: number) {
    const statusService: StatusService = new StatusService();

    const [storyItems, hasMore] = await statusService.loadMoreStoryItems(
      authToken,
      userAlias,
      pageSize,
      lastItem,
    );

    expect(storyItems).not.toBeNull();
    expect(storyItems.length).toEqual(pageSize);
    for (let i = 0; i < storyItems.length; i++) {
      expect(
        storyItems[i].post
          .endsWith(`likes this website: http://byu.edu. Do you? 
        Or do you prefer this one: http://cs.byu.edu?`),
      );
      expect(storyItems[i].timestamp).toEqual(30000000000 * (i + offset));
      expect(storyItems[i].user).not.toBeNull();
      expect(storyItems[i].user.alias).toEqual(fakeDataUsers[i + offset].alias);
      expect(storyItems[i].user.firstName).toEqual(
        fakeDataUsers[i + offset].firstName,
      );
      expect(storyItems[i].user.lastName).toEqual(
        fakeDataUsers[i + offset].lastName,
      );
    }

    expect(hasMore).toBe(true);

    return storyItems[storyItems.length - 1];
  }
});
