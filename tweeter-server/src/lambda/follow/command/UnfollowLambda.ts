import { FollowCommandResponse, TokenedAliasRequest } from "tweeter-shared";
import { handler as parentHandler } from "./FollowCommandLambda";

export const handler = async (
  request: TokenedAliasRequest,
): Promise<FollowCommandResponse> =>
  await parentHandler(request, (service, ...args) => service.unfollow(...args));
