export interface FollowDAO {
  createFollow(userAlias: string, selectedUserAlias: string): Promise<void>;
  getIsFollow(userAlias: string, selectedUserAlias: string): Promise<boolean>;
  deleteFollow(userAlias: string, selectedUserAlias: string): Promise<void>;
}
