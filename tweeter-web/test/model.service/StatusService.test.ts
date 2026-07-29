import { AuthToken } from "tweeter-shared";
import { StatusService } from "../../src/model.service/StatusService";

describe("StatusService tests", () => {
  it("returns a user's story pages", async () => {
    const statusService: StatusService = new StatusService();
    const authToken: AuthToken = new AuthToken("1234", Date.now());
    const userAlias: string = "@Alias";
    const pageSize: number = 10;

    const [storyItems, hasMore] = await statusService.loadMoreStoryItems(
      authToken,
      userAlias,
      10,
      null,
    );
  });
});
