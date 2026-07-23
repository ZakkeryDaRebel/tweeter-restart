import {
  AuthToken,
  User,
  FakeData,
  PagedUserItemRequest,
} from "tweeter-shared";
import { Service } from "./Service";

export class FollowService extends Service {
  public async loadMoreFollowees(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null,
  ): Promise<[User[], boolean]> {
    return await this.getMoreUserItems(
      authToken.token,
      userAlias,
      pageSize,
      lastItem,
      async (request: PagedUserItemRequest): Promise<[User[], boolean]> => {
        return await this.serverFacade.getMoreFollowees(request);
      },
    );
  }

  public async loadMoreFollowers(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null,
  ): Promise<[User[], boolean]> {
    return await this.getMoreUserItems(
      authToken.token,
      userAlias,
      pageSize,
      lastItem,
      async (request: PagedUserItemRequest): Promise<[User[], boolean]> => {
        return await this.serverFacade.getMoreFollowers(request);
      },
    );
  }

  private async getMoreUserItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: User | null,
    serviceOperation: (
      request: PagedUserItemRequest,
    ) => Promise<[User[], boolean]>,
  ) {
    const request: PagedUserItemRequest = {
      token: token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem,
    };
    return await serviceOperation(request);
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User,
  ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  }

  public async getFolloweeCount(
    authToken: AuthToken,
    user: User,
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(user.alias);
  }

  public async getFollowerCount(
    authToken: AuthToken,
    user: User,
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(authToken, userToFollow);
    const followeeCount = await this.getFolloweeCount(authToken, userToFollow);

    return [followerCount, followeeCount];
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(
      authToken,
      userToUnfollow,
    );
    const followeeCount = await this.getFolloweeCount(
      authToken,
      userToUnfollow,
    );

    return [followerCount, followeeCount];
  }
}
