import { RegisterRequest, SignInResponse } from "tweeter-shared";
import { handler as parentHandler } from "./AuthenticationLambda";

export const handler = async (
  request: RegisterRequest,
): Promise<SignInResponse> => {
  return await parentHandler(
    async (service) =>
      await service.register(
        request.firstName,
        request.lastName,
        request.userAlias,
        request.password,
        request.imageStringBase64,
        request.imageFileExtension,
      ),
  );
};
