import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { FollowDAO } from "./FollowDAO";

/*
 * Follow Table Description
 * Hash -> followee: string
 * Sort -> follower: string
 * INDEXED
 */

export class DynamoDBFollowDAO implements FollowDAO {
  private readonly tableName = "follow";
  private readonly followeeAttr = "followee";
  private readonly followerAttr = "follower";

  private readonly client: DynamoDBDocumentClient;

  public constructor(client: DynamoDBDocumentClient) {
    this.client = client;
  }

  async createFollow(
    userAlias: string,
    selectedUserAlias: string,
  ): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.followeeAttr]: userAlias,
        [this.followerAttr]: selectedUserAlias,
      },
    };
    await this.client.send(new PutCommand(params));
  }

  getIsFollow(userAlias: string, selectedUserAlias: string): boolean {
    // code
    return false;
  }

  deleteFollow(userAlias: string, selectedUserAlias: string): void {
    //code
  }
}
