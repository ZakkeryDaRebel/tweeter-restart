import { GetFollowCountResponse, TokenedAliasRequest } from "tweeter-shared";
import { handler as parentHandler } from "./GetCountLambda";

export const handler = async (
  request: TokenedAliasRequest,
): Promise<GetFollowCountResponse> =>
  await parentHandler(request, (followService, ...args) =>
    followService.getFollowerCount(...args),
  );
