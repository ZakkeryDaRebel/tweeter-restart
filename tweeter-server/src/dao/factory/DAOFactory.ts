import { AuthDAO } from "../auth/AuthDAO";
import { FollowDAO } from "../follow/FollowDAO";
import { ImageDAO } from "../image/ImageDAO";
import { StoryDAO } from "../story/StoryDAO";
import { UserDAO } from "../user/UserDAO";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBUserDAO } from "../user/DynamoDBUserDAO";

export class DAOFactory {
  private constructor() {}
  public static readonly dynamoDBClient = DynamoDBDocumentClient.from(
    new DynamoDBClient(),
  );

  public static readonly authDAO: AuthDAO;
  public static readonly followDAO: FollowDAO;
  public static readonly imageDAO: ImageDAO;
  public static readonly storyDAO: StoryDAO;
  public static readonly userDAO: UserDAO = new DynamoDBUserDAO(
    this.dynamoDBClient,
  );
}
