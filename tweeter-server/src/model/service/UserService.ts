import { User, FakeData, UserDto } from "tweeter-shared";
import { DAOFactory } from "../../dao/factory/DAOFactory";
import { Service } from "./Service";

export class UserService implements Service {
  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    const [authToken, userAlias] = DAOFactory.authDAO.getAuth(token);
    if (!authToken || !userAlias) {
      throw new Error("Error: Unauthorized");
    }
    const user: User | null = DAOFactory.userDAO.getUser(alias);
    return !!user ? user.getDto() : null;
  }

  public async logout(token: string): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  }

  public async login(
    alias: string,
    password: string,
  ): Promise<[UserDto, string]> {
    return await this.fakeDataSignIn();
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageStringBase64: string,
    imageFileExtension: string,
  ): Promise<[UserDto, string]> {
    return await this.fakeDataSignIn();
  }

  private async fakeDataSignIn(): Promise<[UserDto, string]> {
    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user.getDto(), FakeData.instance.authToken.token];
  }
}
