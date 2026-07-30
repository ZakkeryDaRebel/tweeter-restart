import { User } from "tweeter-shared";

export interface UserDAO {
  createUser(user: User): void;
  getUser(alias: String): User;
}
