import { LoginRequest, SignInResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";

export const handler = async (
  request: LoginRequest,
): Promise<SignInResponse> => {
  const service = new UserService();
  const [user, authToken] = await service.login(
    request.alias,
    request.password,
  );
  return {
    success: true,
    message: null,
    user: user,
    authToken: authToken,
  };
};
