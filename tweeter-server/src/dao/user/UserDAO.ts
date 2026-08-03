import { User } from "tweeter-shared";

export interface UserDAO {
  createUser(user: User, hashedPassword: string): void;
  getUser(alias: String): User;
}
