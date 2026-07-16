import { FollowCommandRequest, FollowCommandResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";

export const handler = async (
  request: FollowCommandRequest,
): Promise<FollowCommandResponse> => {
  const followService = new FollowService();
  const [followerCount, followeeCount] = await followService.follow(
    request.token,
    request.userToInteract,
  );
  return {
    success: true,
    message: null,
    followerCount: followerCount,
    followeeCount: followeeCount,
  };
};
