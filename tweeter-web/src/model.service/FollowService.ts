import {
  AuthToken,
  User,
  PagedUserItemRequest,
  IsFollowerRequest,
  TokenedAliasRequest,
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
    const request: IsFollowerRequest = {
      token: authToken.token,
      userAlias: user.alias,
      selectedUserAlias: selectedUser.alias,
    };
    return await this.serverFacade.getIsFollowerStatus(request);
  }

  public async getFolloweeCount(
    authToken: AuthToken,
    user: User,
  ): Promise<number> {
    return await this.getCount(
      authToken.token,
      user.alias,
      async (request: TokenedAliasRequest): Promise<number> => {
        return await this.serverFacade.getFolloweeCount(request);
      },
    );
  }

  public async getFollowerCount(
    authToken: AuthToken,
    user: User,
  ): Promise<number> {
    return await this.getCount(
      authToken.token,
      user.alias,
      async (request: TokenedAliasRequest): Promise<number> => {
        return await this.serverFacade.getFollowerCount(request);
      },
    );
  }

  private async getCount(
    token: string,
    alias: string,
    serviceOperation: (request: TokenedAliasRequest) => Promise<number>,
  ): Promise<number> {
    const request: TokenedAliasRequest = {
      token: token,
      userAlias: alias,
    };
    return await serviceOperation(request);
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User,
  ): Promise<[followerCount: number, followeeCount: number]> {
    return await this.followCommand(
      authToken.token,
      userToFollow.alias,
      async (request: TokenedAliasRequest) => {
        return await this.serverFacade.follow(request);
      },
    );
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User,
  ): Promise<[followerCount: number, followeeCount: number]> {
    return await this.followCommand(
      authToken.token,
      userToUnfollow.alias,
      async (request: TokenedAliasRequest) => {
        return await this.serverFacade.unfollow(request);
      },
    );
  }

  private async followCommand(
    token: string,
    userAlias: string,
    serviceOperation: (
      request: TokenedAliasRequest,
    ) => Promise<[number, number]>,
  ): Promise<[number, number]> {
    const request: TokenedAliasRequest = {
      token: token,
      userAlias: userAlias,
    };
    return await serviceOperation(request);
  }
}
