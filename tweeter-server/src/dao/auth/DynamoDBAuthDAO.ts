import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
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
  createAuth(authToken: AuthToken, userAlias: string): void {
    throw new Error("Method not implemented.");
  }
  getAuth(token: string): [authToken: AuthToken, userAlias: string] {
    throw new Error("Method not implemented.");
  }
  updateAuth(authToken: AuthToken): void {
    throw new Error("Method not implemented.");
  }
  deleteAuth(token: string): void {
    throw new Error("Method not implemented.");
  }
}
