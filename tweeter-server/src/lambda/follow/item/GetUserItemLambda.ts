import {
  PagedUserItemRequest,
  PagedUserItemResponse,
  UserDto,
} from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { handler as parentHandler } from "../../GetItemLambda";

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
  return await parentHandler(request, (...args) =>
    serviceOperation(followService, ...args),
  );
};
