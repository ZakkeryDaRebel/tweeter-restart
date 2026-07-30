import { User } from "tweeter-shared";
import { UserDAO } from "./UserDAO";

export class DynamoDBUserDAO implements UserDAO {
  createUser(user: User): void {
    //code
  }

  getUser(alias: string): User {
    //code
    return new User("", "", "", "");
  }
}
