import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { AuthToken } from "tweeter-shared";
import { AuthDAO } from "./AuthDAO";

export class DynamoDBAuthDAO implements AuthDAO {
  private readonly tableName = "auth";
  private readonly tokenAttr = "token";
  private readonly timestampAttr = "timestamp";
  private readonly aliasAttr = "alias";

  private readonly client: DynamoDBDocumentClient;

  public constructor(client: DynamoDBDocumentClient) {
    this.client = client;
  }
  async createAuth(authToken: AuthToken, userAlias: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.tokenAttr]: authToken.token,
        [this.timestampAttr]: authToken.timestamp,
        [this.aliasAttr]: userAlias,
      },
    };
    await this.client.send(new PutCommand(params));
  }

  async getAuth(
    token: string,
  ): Promise<[authToken: AuthToken, userAlias: string]> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.tokenAttr]: token,
      },
    };
    const output = await this.client.send(new GetCommand(params));
    if (output.Item === undefined) {
      throw new Error("Unauthorized");
    }
    const authToken = new AuthToken(
      output.Item[this.tokenAttr],
      output.Item[this.timestampAttr],
    );
    return [authToken, output.Item[this.aliasAttr]];
  }

  async updateAuth(authToken: AuthToken): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.tokenAttr]: authToken.token,
      },
      ExpressionAttributeValues: { ":newTime": authToken.timestamp },
      UpdateExpression: "SET " + this.timestampAttr + " = :newTime",
    };
    await this.client.send(new UpdateCommand(params));
  }

  async deleteAuth(token: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.tokenAttr]: token,
      },
    };
    await this.client.send(new DeleteCommand(params));
  }
}
