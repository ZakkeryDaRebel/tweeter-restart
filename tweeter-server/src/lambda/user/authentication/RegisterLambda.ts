import { RegisterRequest, SignInResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";

export const handler = async (
  request: RegisterRequest,
): Promise<SignInResponse> => {
  const service = new UserService();
  const [user, authToken] = await service.register(
    request.firstName,
    request.lastName,
    request.alias,
    request.password,
    request.imageStringBase64,
    request.imageFileExtension,
  );
  return {
    success: true,
    message: null,
    user: user,
    authToken: authToken,
  };
};
