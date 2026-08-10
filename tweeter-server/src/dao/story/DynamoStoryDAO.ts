import {
  GetCommand,
  GetCommandOutput,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { Status } from "tweeter-shared";
import { DAOService } from "../DAOService";
import { StoryDAO } from "./StoryDAO";

export class DynamoStoryDAO extends DAOService implements StoryDAO {
  private readonly tableName = "story";
  private readonly aliasAttr = "alias"; //hash
  private readonly timestampAttr = "timestamp"; //sort
  private readonly postAttr = "post";

  async createStory(post: Status): Promise<void> {
    await this.putDynamo(this.tableName, {
      [this.aliasAttr]: post.user.alias,
      [this.timestampAttr]: post.timestamp,
      [this.postAttr]: post.post,
    });
  }

  async getStory(
    postAlias: string,
    timestamp: number,
  ): Promise<[string, string, number]> {
    return await this.getDynamo(
      this.tableName,
      {
        [this.aliasAttr]: postAlias,
        [this.timestampAttr]: timestamp,
      },
      (output: GetCommandOutput) => {
        if (output.Item === undefined) {
          throw new Error("No such story item exists");
        }
        return [
          output.Item[this.aliasAttr],
          output.Item[this.postAttr],
          output.Item[this.timestampAttr],
        ];
      },
    );
  }

  async getPageOfStories(
    postAlias: string,
    lastStoryItem: Status | null,
    pageSize: number,
  ): Promise<
    [aliases: string[], posts: string[], times: number[], hasMore: boolean]
  > {
    const params = {
      KeyConditionExpression: this.aliasAttr + " = :u",
      ExpressionAttributeValues: {
        ":u": postAlias,
      },
      TableName: this.tableName,
      Limit: pageSize,
      ExclusiveStartKey: !!lastStoryItem
        ? {
            [this.aliasAttr]: lastStoryItem.user.alias,
            [this.timestampAttr]: lastStoryItem.timestamp,
          }
        : undefined,
    };
    const data = await this.client.send(new QueryCommand(params));
    const hasMore = data.LastEvaluatedKey !== undefined;
    if (data.Items === undefined) {
      throw Error("no story items found");
    }
    const aliases: string[] = [];
    const posts: string[] = [];
    const timestamps: number[] = [];
    data.Items.forEach((item) => {
      aliases.push(item[this.aliasAttr]);
      posts.push(item[this.postAttr]);
      timestamps.push(item[this.timestampAttr]);
    });
    return [aliases, posts, timestamps, hasMore];
  }
}
