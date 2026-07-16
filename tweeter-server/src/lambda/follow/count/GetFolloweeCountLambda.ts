import { GetFollowCountRequest, GetFollowCountResponse } from "tweeter-shared";
import { handler as parentHandler } from "./GetCountLambda";

export const handler = async (
  request: GetFollowCountRequest,
): Promise<GetFollowCountResponse> =>
  await parentHandler(request, (followService, ...args) =>
    followService.getFolloweeCount(...args),
  );
