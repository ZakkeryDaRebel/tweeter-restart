import { AuthToken, User, FakeData, UserDto } from "tweeter-shared";
import { Service } from "./Service";

export class UserService implements Service {
  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    // TODO: Replace with the result of calling server
    const dbUser: User | null = FakeData.instance.findUserByAlias(alias);
    return dbUser == null ? null : dbUser.getDto();
  }

  public async logout(token: string): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  }

  public async login(
    alias: string,
    password: string,
  ): Promise<[UserDto, AuthToken]> {
    return await this.fakeDataSignIn();
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageStringBase64: string,
    imageFileExtension: string,
  ): Promise<[UserDto, AuthToken]> {
    return await this.fakeDataSignIn();
  }

  private async fakeDataSignIn(): Promise<[UserDto, AuthToken]> {
    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user.getDto(), FakeData.instance.authToken];
  }
}
