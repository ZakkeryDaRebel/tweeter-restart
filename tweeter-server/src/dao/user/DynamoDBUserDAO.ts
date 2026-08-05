import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
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
  private readonly tableName = "user";
  private readonly aliasAttr = "alias";
  private readonly firstNameAttr = "firstName";
  private readonly lastNameAttr = "lastName";
  private readonly passwordAttr = "password";
  private readonly imageUrlAttr = "imageUrl";
  private readonly followeeCountAttr = "followeeCount";
  private readonly followerCountAttr = "followerCount";

  private readonly client: DynamoDBDocumentClient;

  public constructor(client: DynamoDBDocumentClient) {
    this.client = client;
  }

  async createUser(user: User, hashedPassword: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.aliasAttr]: user.alias,
        [this.firstNameAttr]: user.firstName,
        [this.lastNameAttr]: user.lastName,
        [this.passwordAttr]: hashedPassword,
        [this.imageUrlAttr]: user.imageUrl,
        [this.followeeCountAttr]: 0,
        [this.followerCountAttr]: 0,
      },
    };
    await this.client.send(new PutCommand(params));
  }

  async getUser(
    alias: string,
  ): Promise<
    [
      user: User,
      hashedPassword: string,
      followeeCount: number,
      followerCount: number,
    ]
  > {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.aliasAttr]: alias,
      },
    };
    const output = await this.client.send(new GetCommand(params));
    if (output.Item === undefined) {
      // no such user. Throw error or return null?
      throw new Error("No such user");
    }
    const user = new User(
      output.Item[this.aliasAttr],
      output.Item[this.lastNameAttr],
      output.Item[this.aliasAttr],
      output.Item[this.imageUrlAttr],
    );
    return [
      user,
      output.Item[this.passwordAttr],
      output.Item[this.followeeCountAttr],
      output.Item[this.followerCountAttr],
    ];
  }
}
