import { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { ServiceFactory } from "../factory/ServiceFactory";

export const handler = async (
  request: PostStatusRequest,
): Promise<TweeterResponse> => {
  await ServiceFactory.statusService.postStatus(
    request.token,
    request.userAlias,
    request.post,
  );
  return {
    success: true,
    message: null,
  };
};
