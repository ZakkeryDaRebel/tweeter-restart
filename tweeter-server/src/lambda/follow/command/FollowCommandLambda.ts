import {
  FollowCommandRequest,
  FollowCommandResponse,
  UserDto,
} from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";

export const handler = async (
  request: FollowCommandRequest,
  serviceOperation: (
    followService: FollowService,
    token: string,
    userToInteract: UserDto,
  ) => Promise<[number, number]>,
): Promise<FollowCommandResponse> => {
  const followService = new FollowService();
  const [followerCount, followeeCount] = await serviceOperation(
    followService,
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
