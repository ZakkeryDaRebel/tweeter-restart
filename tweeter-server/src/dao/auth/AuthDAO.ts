import { AuthToken } from "tweeter-shared";

export interface AuthDAO {
  createAuth(authToken: AuthToken, userAlias: string): Promise<void>;
  getAuth(token: string): Promise<[authToken: AuthToken, userAlias: string]>;
  updateAuth(authToken: AuthToken): Promise<void>;
  deleteAuth(token: string): Promise<void>;
}
