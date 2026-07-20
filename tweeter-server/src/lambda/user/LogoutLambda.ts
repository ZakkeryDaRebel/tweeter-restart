import { AuthenticatedRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export const handler = async (
  request: AuthenticatedRequest,
): Promise<TweeterResponse> => {
  const service = new UserService();
  await service.logout(request.token);
  return {
    success: true,
    message: null,
  };
};
