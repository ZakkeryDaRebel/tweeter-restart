import { User, AuthToken, FakeData, UserDto } from "tweeter-shared";
import { DAOFactory } from "../../dao/factory/DAOFactory";
import { AuthService } from "./AuthService";
import { Service } from "./Service";
import bcrypt from "bcryptjs";

export class UserService implements Service {
  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    return await new AuthService().authenticatedAction(token, async () => {
      const user: User | null = await DAOFactory.userDAO.getUser(alias);
      return !!user ? user.getDto() : null;
    });
  }

  public async logout(token: string): Promise<void> {
    await new AuthService().getAuth(token);
    DAOFactory.authDAO.deleteAuth(token);
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
    const user: User | null = DAOFactory.userDAO.getUser(alias);
    if (!!user) {
      throw new Error("Error: Alias is already taken");
    }
    const imageUrl: string = DAOFactory.imageDAO.createImage(
      imageStringBase64,
      imageFileExtension,
    );
    const newUser = new User(firstName, lastName, alias, imageUrl);
    const hashedPassword: string = await bcrypt.hash(
      password,
      await bcrypt.genSalt(),
    );
    DAOFactory.userDAO.createUser(newUser, hashedPassword);
    const authToken = AuthToken.Generate();
    await DAOFactory.authDAO.createAuth(authToken, alias);
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
