import {
  GetFollowCountRequest,
  GetFollowCountResponse,
  UserDto,
} from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";

export const handler = async (
  request: GetFollowCountRequest,
  serviceOperation: (
    followService: FollowService,
    token: string,
    user: UserDto,
  ) => Promise<number>,
): Promise<GetFollowCountResponse> => {
  const followService = new FollowService();
  const count = await serviceOperation(
    followService,
    request.token,
    request.user,
  );
  return {
    success: true,
    message: null,
    count: count,
  };
};
