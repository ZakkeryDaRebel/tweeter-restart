import {
  FollowCommandResponse,
  TokenedAliasRequest,
  UserDto,
} from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";

export const handler = async (
  request: TokenedAliasRequest,
  serviceOperation: (
    followService: FollowService,
    token: string,
    userAliasToInteract: string,
  ) => Promise<[number, number]>,
): Promise<FollowCommandResponse> => {
  const followService = new FollowService();
  const [followerCount, followeeCount] = await serviceOperation(
    followService,
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
