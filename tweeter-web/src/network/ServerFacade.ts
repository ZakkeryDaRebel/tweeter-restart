import {
  PagedItemRequest,
  PagedItemResponse,
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  PagedUserItemRequest,
  PagedUserItemResponse,
  Status,
  StatusDto,
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

  public async getMoreUserItems(
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

  public async getMoreStatusItems(
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

  //
  // Helper Methods
  //

  public async getMoreItems<
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

  public async send<T extends TweeterRequest, R extends TweeterResponse, S>(
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
