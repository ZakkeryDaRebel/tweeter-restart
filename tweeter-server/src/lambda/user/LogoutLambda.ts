import { AuthenticatedRequest, TweeterResponse } from "tweeter-shared";
import { ServiceFactory } from "../factory/ServiceFactory";

export const handler = async (
  request: AuthenticatedRequest,
): Promise<TweeterResponse> => {
  await ServiceFactory.userService.logout(request.token);
  return {
    success: true,
    message: null,
  };
};
