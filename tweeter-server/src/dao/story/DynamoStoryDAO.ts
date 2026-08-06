import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
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

  createStory(post: Status): void {
    throw new Error("Method not implemented.");
  }
  getStory(postAlias: string, timestamp: number): Status {
    throw new Error("Method not implemented.");
  }
}
