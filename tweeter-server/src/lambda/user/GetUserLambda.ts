import { GetUserResponse, TokenedAliasRequest } from "tweeter-shared";
import { ServiceFactory } from "../factory/ServiceFactory";

export const handler = async (
  request: TokenedAliasRequest,
): Promise<GetUserResponse> => {
  const user = await ServiceFactory.userService.getUser(
    request.token,
    request.userAlias,
  );
  return {
    success: true,
    message: null,
    user: user,
  };
};
