import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { Status } from "tweeter-shared";
import { StoryDAO } from "./StoryDAO";

export class DynamoStoryDAO implements StoryDAO {
  private readonly tableName = "story";
  private readonly aliasAttr = "alias"; //hash
  private readonly timestampAttr = "timestamp"; //sort
  private readonly postAttr = "post";

  private readonly client: DynamoDBDocumentClient;

  public constructor(client: DynamoDBDocumentClient) {
    this.client = client;
  }

  async createStory(post: Status): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.aliasAttr]: post.user.alias,
        [this.timestampAttr]: post.timestamp,
        [this.postAttr]: post.post,
      },
    };
    await this.client.send(new PutCommand(params));
  }

  async getStory(
    postAlias: string,
    timestamp: number,
  ): Promise<[string, string, number]> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.aliasAttr]: postAlias,
        [this.timestampAttr]: timestamp,
      },
    };
    const output = await this.client.send(new GetCommand(params));
    if (output.Item === undefined) {
      throw new Error("No such story item exists");
    }
    return [
      output.Item[this.aliasAttr],
      output.Item[this.postAttr],
      output.Item[this.timestampAttr],
    ];
  }
}
