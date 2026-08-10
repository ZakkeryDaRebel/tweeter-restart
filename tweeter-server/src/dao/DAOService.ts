import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

export class DAOService {
  private readonly _client: DynamoDBDocumentClient;

  public constructor(client: DynamoDBDocumentClient) {
    this._client = client;
  }

  protected get client() {
    return this._client;
  }

  protected async getDynamo<T>(
    tableName: string,
    key: any,
    outputMethod: (output: GetCommandOutput) => T,
  ): Promise<T> {
    const params = {
      TableName: tableName,
      Key: key,
    };
    const output = await this.client.send(new GetCommand(params));
    return outputMethod(output);
  }

  protected async putDynamo(tableName: string, key: any): Promise<void> {
    const params = {
      TableName: tableName,
      Item: key,
    };
    await this.client.send(new PutCommand(params));
  }

  protected async updateDynamo<T>(
    tableName: string,
    key: any,
    expressionValues: any,
    updateExpression: string,
  ): Promise<void> {
    const params = {
      TableName: tableName,
      Key: key,
      ExpressionAttributeValues: expressionValues,
      UpdateExpressions: updateExpression,
    };
    await this.client.send(new UpdateCommand(params));
  }
}
