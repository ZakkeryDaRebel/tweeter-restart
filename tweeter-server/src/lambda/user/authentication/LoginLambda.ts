import { LoginRequest, SignInResponse } from "tweeter-shared";
import { handler as parentHandler } from "./AuthenticationLambda";

export const handler = async (
  request: LoginRequest,
): Promise<SignInResponse> => {
  return await parentHandler(
    async (service) => await service.login(request.alias, request.password),
  );
};
