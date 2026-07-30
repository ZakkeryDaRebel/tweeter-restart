import { AuthToken } from "tweeter-shared";
import { DAOFactory } from "../../dao/factory/DAOFactory";
import { Service } from "./Service";

export class AuthService implements Service {
  getAuth(token: string): [AuthToken, string] {
    const [authToken, userAlias] = DAOFactory.authDAO.getAuth(token);
    if (!authToken || !userAlias) {
      throw new Error("Error: Unauthorized");
    }
    return [authToken, userAlias];
  }

  updateAuth(token: string): void {
    const updatedAuth = new AuthToken(token, Date.now());
    DAOFactory.authDAO.updateAuth(updatedAuth);
  }

  async authenticatedAction<T>(
    token: string,
    operation: () => Promise<T>,
  ): Promise<T> {
    this.getAuth(token);
    const result: T = await operation();
    this.updateAuth(token);
    return result;
  }
}
