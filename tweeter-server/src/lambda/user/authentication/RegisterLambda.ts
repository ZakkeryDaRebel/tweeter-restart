import { RegisterRequest, SignInResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { handler as parentHandler } from "./AuthenticationLambda";

export const handler = async (
  request: RegisterRequest,
): Promise<SignInResponse> => {
  return await parentHandler(
    async (service) =>
      await service.register(
        request.firstName,
        request.lastName,
        request.alias,
        request.password,
        request.imageStringBase64,
        request.imageFileExtension,
      ),
  );
};
