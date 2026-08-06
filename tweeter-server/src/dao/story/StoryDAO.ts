import { Status } from "tweeter-shared";

export interface StoryDAO {
  createStory(post: Status): Promise<void>;
  getStory(postAlias: string, timestamp: number): Promise<Status>;
}
