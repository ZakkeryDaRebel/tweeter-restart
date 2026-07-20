import { AuthToken, SignInResponse, UserDto } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";

export const handler = async (
  serviceOperation: (service: UserService) => Promise<[UserDto, AuthToken]>,
): Promise<SignInResponse> => {
  const service = new UserService();
  const [user, authToken] = await serviceOperation(service);
  return {
    success: true,
    message: null,
    user: user,
    authToken: authToken,
  };
};
