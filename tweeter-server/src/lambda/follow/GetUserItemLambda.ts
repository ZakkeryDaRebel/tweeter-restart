import {
  PagedUserItemRequest,
  PagedUserItemResponse,
  UserDto,
} from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (
  request: PagedUserItemRequest,
  serviceOperation: (
    followService: FollowService,
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null,
  ) => Promise<[UserDto[], boolean]>,
): Promise<PagedUserItemResponse> => {
  const followService = new FollowService();
  const [items, hasMore] = await serviceOperation(
    followService,
    request.token,
    request.userAlias,
    request.pageSize,
    request.lastItem,
  );
  return {
    success: true,
    message: null,
    items: items,
    hasMore: hasMore,
  };
};
