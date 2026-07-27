import { Buffer } from "buffer";
import {
  AuthToken,
  User,
  FakeData,
  TokenedAliasRequest,
  AuthenticatedRequest,
  LoginRequest,
  RegisterRequest,
} from "tweeter-shared";
import { Service } from "./Service";

export class UserService extends Service {
  public async getUser(
    authToken: AuthToken,
    alias: string,
  ): Promise<User | null> {
    const request: TokenedAliasRequest = {
      token: authToken.token,
      userAlias: alias,
    };
    return await this.serverFacade.getUser(request);
  }

  public async logout(authToken: AuthToken): Promise<void> {
    const request: AuthenticatedRequest = {
      token: authToken.token,
    };
    await this.serverFacade.logout(request);
  }

  public async login(
    alias: string,
    password: string,
  ): Promise<[User, AuthToken]> {
    const request: LoginRequest = {
      userAlias: alias,
      password: password,
    };
    return await this.serverFacade.login(request);
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string,
  ): Promise<[User, AuthToken]> {
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    const request: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      userAlias: alias,
      password: password,
      imageStringBase64: imageStringBase64,
      imageFileExtension: imageFileExtension,
    };

    return await this.serverFacade.register(request);
  }
}
