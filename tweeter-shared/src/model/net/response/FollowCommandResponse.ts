import { TweeterResponse } from "./TweeterResponse";

export interface FollowCommandResponse extends TweeterResponse {
  followerCount: number;
  followeeCount: number;
}
