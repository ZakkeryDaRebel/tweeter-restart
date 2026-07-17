import { FollowCommandRequest, FollowCommandResponse } from "tweeter-shared";
import { handler as parentHandler } from "./FollowCommandLambda";

export const handler = async (
  request: FollowCommandRequest,
): Promise<FollowCommandResponse> =>
  await parentHandler(request, (service, ...args) => service.follow(...args));
