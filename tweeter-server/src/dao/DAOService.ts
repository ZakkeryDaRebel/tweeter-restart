import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
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

  protected async putDynamo<T>(): Promise<void> {
    const params = {};
    return;
  }
}
