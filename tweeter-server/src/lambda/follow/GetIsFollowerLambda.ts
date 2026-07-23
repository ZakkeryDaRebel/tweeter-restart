import { IsFollowerRequest, IsFollowerResponse } from "tweeter-shared";
import { ServiceFactory } from "../factory/ServiceFactory";

export const handler = async (
  request: IsFollowerRequest,
): Promise<IsFollowerResponse> => {
  const isFollower = await ServiceFactory.followService.getIsFollowerStatus(
    request.token,
    request.userAlias,
    request.selectedUserAlias,
  );
  return {
    success: true,
    message: null,
    isFollower: isFollower,
  };
};
