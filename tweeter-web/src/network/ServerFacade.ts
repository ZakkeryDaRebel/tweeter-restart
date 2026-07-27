import {
  AuthenticatedRequest,
  AuthToken,
  FollowCommandResponse,
  GetFollowCountResponse,
  GetUserResponse,
  IsFollowerRequest,
  IsFollowerResponse,
  LoginRequest,
  PagedItemRequest,
  PagedItemResponse,
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  PagedUserItemRequest,
  PagedUserItemResponse,
  PostStatusRequest,
  RegisterRequest,
  SignInResponse,
  Status,
  StatusDto,
  TokenedAliasRequest,
  TweeterRequest,
  TweeterResponse,
  User,
  UserDto,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL =
    "https://pesd1jjid6.execute-api.us-east-1.amazonaws.com/prod";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  //
  // FollowService Methods
  //

  public async getMoreFollowees(
    request: PagedUserItemRequest,
  ): Promise<[User[], boolean]> {
    return await this.getMoreUserItems(
      request,
      "/follow/item/followees",
      "followees",
    );
  }

  public async getMoreFollowers(
    request: PagedUserItemRequest,
  ): Promise<[User[], boolean]> {
    return await this.getMoreUserItems(
      request,
      "/follow/item/followers",
      "followers",
    );
  }

  private async getMoreUserItems(
    request: PagedUserItemRequest,
    endpoint: string,
    itemDescription: string,
  ): Promise<[User[], boolean]> {
    return await this.getMoreItems<
      PagedUserItemRequest,
      User,
      UserDto,
      PagedUserItemResponse
    >(
      request,
      endpoint,
      (items: UserDto[]) => {
        return items.map((dto) => User.fromDto(dto) as User);
      },
      itemDescription,
    );
  }

  public async getIsFollowerStatus(
    request: IsFollowerRequest,
  ): Promise<boolean> {
    return await this.send(
      request,
      "/follower/isFollower",
      (response: IsFollowerResponse): boolean => {
        return response.isFollower;
      },
    );
  }

  public async getFolloweeCount(request: TokenedAliasRequest): Promise<number> {
    return await this.getCount(request, "/follow/count/followee");
  }

  public async getFollowerCount(request: TokenedAliasRequest): Promise<number> {
    return await this.getCount(request, "/follow/count/follower");
  }

  private async getCount(
    request: TokenedAliasRequest,
    endpoint: string,
  ): Promise<number> {
    return await this.send(
      request,
      endpoint,
      (response: GetFollowCountResponse) => {
        return response.count;
      },
    );
  }

  public async follow(request: TokenedAliasRequest): Promise<[number, number]> {
    return await this.followCommand(request, "/follow/command/follow");
  }

  public async unfollow(
    request: TokenedAliasRequest,
  ): Promise<[number, number]> {
    return await this.followCommand(request, "/follow/command/unfollow");
  }

  private async followCommand(
    request: TokenedAliasRequest,
    endpoint: string,
  ): Promise<[number, number]> {
    return await this.send(
      request,
      endpoint,
      (response: FollowCommandResponse): [number, number] => {
        return [response.followerCount, response.followeeCount];
      },
    );
  }

  //
  // StatusService Methods
  //

  public async getMoreFeed(
    request: PagedStatusItemRequest,
  ): Promise<[Status[], boolean]> {
    return await this.getMoreStatusItems(
      request,
      "/status/item/feed",
      "feed items",
    );
  }

  public async getMoreStory(
    request: PagedStatusItemRequest,
  ): Promise<[Status[], boolean]> {
    return await this.getMoreStatusItems(
      request,
      "/status/item/story",
      "story items",
    );
  }

  private async getMoreStatusItems(
    request: PagedStatusItemRequest,
    endpoint: string,
    itemDescription: string,
  ): Promise<[Status[], boolean]> {
    return await this.getMoreItems<
      PagedStatusItemRequest,
      Status,
      StatusDto,
      PagedStatusItemResponse
    >(
      request,
      endpoint,
      (items: StatusDto[]) => {
        return items.map((dto) => Status.fromDto(dto) as Status);
      },
      itemDescription,
    );
  }

  public async postStatus(request: PostStatusRequest): Promise<void> {
    await this.send(request, "/status/post", (response: TweeterResponse) => {
      // Do nothing on a success
    });
  }

  //
  // UserService Methods
  //

  public async getUser(request: TokenedAliasRequest): Promise<User | null> {
    return await this.send(
      request,
      "/user/get",
      (response: GetUserResponse) => {
        return !!response.user ? User.fromDto(response.user) : null;
      },
    );
  }

  public async logout(request: AuthenticatedRequest): Promise<void> {
    await this.send(request, "/user/logout", (response: TweeterResponse) => {
      // Do nothing on a success
    });
  }

  public async login(request: LoginRequest): Promise<[User, AuthToken]> {
    return await this.signIn(request, "/user/authentication/login");
  }

  public async register(request: RegisterRequest): Promise<[User, AuthToken]> {
    return await this.signIn(request, "/user/authentication/register");
  }

  private async signIn(
    request: LoginRequest | RegisterRequest,
    endpoint: string,
  ): Promise<[User, AuthToken]> {
    return await this.send(
      request,
      endpoint,
      (response: SignInResponse): [User, AuthToken] => {
        const user = User.fromDto(response.user);
        if (response.user === null || user === null) {
          throw new Error("Invalid alias or password");
        }
        return [user, response.authToken];
      },
    );
  }

  //
  // Helper Methods
  //

  private async getMoreItems<
    T extends PagedItemRequest<D>,
    R,
    D,
    V extends PagedItemResponse<D>,
  >(
    request: T,
    endpoint: string,
    convertOperation: (items: D[]) => R[] | null,
    itemDescription: string,
  ): Promise<[R[], boolean]> {
    return await this.send(request, endpoint, (response: V) => {
      const items: R[] | null = response.items
        ? convertOperation(response.items)
        : null;

      if (items == null) {
        throw new Error(`No ${itemDescription} found`);
      } else {
        return [items, response.hasMore];
      }
    });
  }

  private async send<T extends TweeterRequest, R extends TweeterResponse, S>(
    request: T,
    endpoint: string,
    onSuccess: (response: R) => S,
  ): Promise<S> {
    const response = await this.clientCommunicator.doPost<T, R>(
      request,
      endpoint,
    );

    if (response.success) {
      return onSuccess(response);
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }
}
