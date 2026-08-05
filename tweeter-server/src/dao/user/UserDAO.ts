import { User } from "tweeter-shared";

export interface UserDAO {
  createUser(user: User, hashedPassword: string): Promise<void>;
  getUser(
    alias: String,
  ): Promise<
    [
      user: User,
      hashedPassword: string,
      followeeCount: number,
      followerCount: number,
    ]
  >;
}
