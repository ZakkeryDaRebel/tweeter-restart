import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { DAOService } from "../DAOService";
import { FollowDAO } from "./FollowDAO";

/*
 * Follow Table Description
 * Hash -> followee: string
 * Sort -> follower: string
 * INDEXED
 */

export class DynamoDBFollowDAO extends DAOService implements FollowDAO {
  private readonly tableName = "follow";
  private readonly followeeAttr = "followee";
  private readonly followerAttr = "follower";

  async createFollow(
    userAlias: string,
    selectedUserAlias: string,
  ): Promise<void> {
    await this.putDynamo(this.tableName, {
      [this.followeeAttr]: userAlias,
      [this.followerAttr]: selectedUserAlias,
    });
  }

  async getIsFollow(
    userAlias: string,
    selectedUserAlias: string,
  ): Promise<boolean> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.followeeAttr]: userAlias,
        [this.followerAttr]: selectedUserAlias,
      },
    };
    const output = await this.client.send(new GetCommand(params));
    return output.Item === undefined ? false : true;
  }

  async deleteFollow(
    userAlias: string,
    selectedUserAlias: string,
  ): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.followeeAttr]: userAlias,
        [this.followerAttr]: selectedUserAlias,
      },
    };
    await this.client.send(new DeleteCommand(params));
  }
}
