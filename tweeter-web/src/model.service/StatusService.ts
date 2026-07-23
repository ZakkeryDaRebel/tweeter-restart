import {
  AuthToken,
  Status,
  FakeData,
  PagedStatusItemRequest,
} from "tweeter-shared";
import { Service } from "./Service";

export class StatusService extends Service {
  public async loadMoreFeedItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null,
  ): Promise<[Status[], boolean]> {
    return await this.getMoreStatusItems(
      authToken.token,
      userAlias,
      pageSize,
      lastItem,
      async (request: PagedStatusItemRequest): Promise<[Status[], boolean]> => {
        return await this.serverFacade.getMoreFeed(request);
      },
    );
  }

  public async loadMoreStoryItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null,
  ): Promise<[Status[], boolean]> {
    return await this.getMoreStatusItems(
      authToken.token,
      userAlias,
      pageSize,
      lastItem,
      async (request: PagedStatusItemRequest): Promise<[Status[], boolean]> => {
        return await this.serverFacade.getMoreStory(request);
      },
    );
  }

  private async getMoreStatusItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null,
    serviceOperation: (
      request: PagedStatusItemRequest,
    ) => Promise<[Status[], boolean]>,
  ) {
    const request: PagedStatusItemRequest = {
      token: token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    };
    return await serviceOperation(request);
  }

  public async postStatus(
    authToken: AuthToken,
    newStatus: Status,
  ): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server to post the status
  }
}
