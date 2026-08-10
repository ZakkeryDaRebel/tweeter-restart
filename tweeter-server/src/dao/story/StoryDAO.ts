import { Status } from "tweeter-shared";

export interface StoryDAO {
  createStory(post: Status): Promise<void>;
  getStory(
    postAlias: string,
    timestamp: number,
  ): Promise<[alias: string, post: string, timestamp: number]>;
  getPageOfStories(
    postAlias: string,
    lastStoryItem: Status | null,
    pageSize: number,
  ): Promise<
    [aliases: string[], posts: string[], times: number[], hasMore: boolean]
  >;
}
