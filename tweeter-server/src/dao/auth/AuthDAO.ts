import { AuthToken } from "tweeter-shared";

export interface AuthDAO {
  createAuth(authToken: AuthToken, userAlias: string): void;
  getAuth(token: string): [authToken: AuthToken, userAlias: string];
  updateAuth(authToken: AuthToken): void;
  deleteAuth(token: string): void;
}
