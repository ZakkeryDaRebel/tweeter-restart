import { FollowCommandResponse, TokenedAliasRequest } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { ServiceFactory } from "../../factory/ServiceFactory";

export const handler = async (
  request: TokenedAliasRequest,
  serviceOperation: (
    followService: FollowService,
    token: string,
    userAliasToInteract: string,
  ) => Promise<[number, number]>,
): Promise<FollowCommandResponse> => {
  const [followerCount, followeeCount] = await serviceOperation(
    ServiceFactory.followService,
    request.token,
    request.userAlias,
  );
  return {
    success: true,
    message: null,
    followerCount: followerCount,
    followeeCount: followeeCount,
  };
};
