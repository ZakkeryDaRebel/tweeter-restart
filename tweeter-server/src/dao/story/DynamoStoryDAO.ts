import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
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

  getStory(postAlias: string, timestamp: number): Status {
    throw new Error("Method not implemented.");
  }
}
