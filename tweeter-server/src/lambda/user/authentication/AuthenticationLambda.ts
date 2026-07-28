import { AuthToken, SignInResponse, UserDto } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { ServiceFactory } from "../../factory/ServiceFactory";

export const handler = async (
  serviceOperation: (service: UserService) => Promise<[UserDto, string]>,
): Promise<SignInResponse> => {
  const [user, token] = await serviceOperation(ServiceFactory.userService);
  return {
    success: true,
    message: null,
    user: user,
    token: token,
  };
};
