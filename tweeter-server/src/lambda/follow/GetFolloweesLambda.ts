import {
  PagedUserItemRequest,
  PagedUserItemResponse,
  UserDto,
} from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { handler as parentHandler } from "./GetUserItemLambda";

export const handler = async (
  request: PagedUserItemRequest,
): Promise<PagedUserItemResponse> => {
  return await parentHandler(
    request,
    async (
      followService: FollowService,
      token: string,
      userAlias: string,
      pageSize: number,
      lastItem: UserDto | null,
    ): Promise<[UserDto[], boolean]> => {
      return await followService.loadMoreFollowees(
        token,
        userAlias,
        pageSize,
        lastItem,
      );
    },
  );
};
