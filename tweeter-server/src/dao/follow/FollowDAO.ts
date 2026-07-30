export interface FollowDAO {
  createFollow(userAlias: string, selectedUserAlias: string): void;
  getIsFollow(userAlias: string, selectedUserAlias: string): boolean;
  deleteFollow(userAlias: string, selectedUserAlias: string): void;
}
