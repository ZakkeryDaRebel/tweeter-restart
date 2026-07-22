import { GetUserResponse, TokenedAliasRequest } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export const handler = async (
  request: TokenedAliasRequest,
): Promise<GetUserResponse> => {
  const service = new UserService();
  const user = await service.getUser(request.token, request.userAlias);
  return {
    success: true,
    message: null,
    user: user,
  };
};
