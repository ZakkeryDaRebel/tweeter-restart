import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
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

  createFollow(userAlias: string, selectedUserAlias: string): void {
    const params = {
      TableName: this.tableName,
    };
  }

  getIsFollow(userAlias: string, selectedUserAlias: string): boolean {
    // code
    return false;
  }

  deleteFollow(userAlias: string, selectedUserAlias: string): void {
    //code
  }
}
