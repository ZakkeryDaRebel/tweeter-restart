import { AuthDAO } from "../auth/AuthDAO";
import { FollowDAO } from "../follow/FollowDAO";
import { ImageDAO } from "../image/ImageDAO";
import { StoryDAO } from "../story/StoryDAO";
import { UserDAO } from "../user/UserDAO";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBUserDAO } from "../user/DynamoDBUserDAO";
import { DynamoDBAuthDAO } from "../auth/DynamoDBAuthDAO";
import { DynamoDBFollowDAO } from "../follow/DynamoDBFollowDAO";

export class DAOFactory {
  private constructor() {}
  public static readonly dynamoDBClient = DynamoDBDocumentClient.from(
    new DynamoDBClient(),
  );

  public static readonly authDAO: AuthDAO = new DynamoDBAuthDAO(
    this.dynamoDBClient,
  );
  public static readonly followDAO: FollowDAO = new DynamoDBFollowDAO(
    this.dynamoDBClient,
  );
  public static readonly imageDAO: ImageDAO;
  public static readonly storyDAO: StoryDAO;
  public static readonly userDAO: UserDAO = new DynamoDBUserDAO(
    this.dynamoDBClient,
  );
}
