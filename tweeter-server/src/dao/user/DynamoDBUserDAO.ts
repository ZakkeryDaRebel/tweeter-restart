import { User } from "tweeter-shared";
import { UserDAO } from "./UserDAO";

/*
 * User Table Description
 * Hash -> userAlias: string
 * firstName: string
 * lastName: string
 * password: string (hashed)
 * imageUrl: string (reference to S3 Bucket)
 */

export class DynamoDBUserDAO implements UserDAO {
  createUser(user: User): void {
    //code
  }

  getUser(alias: string): User {
    //code
    return new User("", "", "", "");
  }
}
