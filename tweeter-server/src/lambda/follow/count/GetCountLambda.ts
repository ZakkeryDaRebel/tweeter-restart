import { GetFollowCountResponse, TokenedAliasRequest } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";

export const handler = async (
  request: TokenedAliasRequest,
  serviceOperation: (
    followService: FollowService,
    token: string,
    userAlias: string,
  ) => Promise<number>,
): Promise<GetFollowCountResponse> => {
  const followService = new FollowService();
  const count = await serviceOperation(
    followService,
    request.token,
    request.userAlias,
  );
  return {
    success: true,
    message: null,
    count: count,
  };
};
