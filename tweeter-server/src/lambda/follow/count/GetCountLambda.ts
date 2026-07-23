import { GetFollowCountResponse, TokenedAliasRequest } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { ServiceFactory } from "../../factory/ServiceFactory";

export const handler = async (
  request: TokenedAliasRequest,
  serviceOperation: (
    followService: FollowService,
    token: string,
    userAlias: string,
  ) => Promise<number>,
): Promise<GetFollowCountResponse> => {
  const count = await serviceOperation(
    ServiceFactory.followService,
    request.token,
    request.userAlias,
  );
  return {
    success: true,
    message: null,
    count: count,
  };
};
