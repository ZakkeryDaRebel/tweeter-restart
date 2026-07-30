import { FollowDAO } from "./FollowDAO";

/*
 * Follow Table Description
 * Hash -> followee: string
 * Sort -> follower: string
 * INDEXED
 */

export class DynamoDBFollowDAO implements FollowDAO {
  createFollow(userAlias: string, selectedUserAlias: string): void {
    //code
  }

  getIsFollow(userAlias: string, selectedUserAlias: string): boolean {
    // code
    return false;
  }

  deleteFollow(userAlias: string, selectedUserAlias: string): void {
    //code
  }
}
