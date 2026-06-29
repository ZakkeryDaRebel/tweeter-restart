import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model.service/FollowService";
import { Location } from "react-router-dom";
import { LoadingMessageView, Presenter } from "./Presenter";

export interface UserInfoView extends LoadingMessageView {
  setIsFollower: (isFollower: boolean) => void;
  setFolloweeCount: (count: number) => void;
  setFollowerCount: (count: number) => void;
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
  private service: FollowService;

  public constructor(view: UserInfoView) {
    super(view);
    this.service = new FollowService();
  }

  public async setIsFollowerStatus(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User,
  ) {
    this.doFailureReportingOperation(async () => {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.service.getIsFollowerStatus(
            authToken!,
            currentUser!,
            displayedUser!,
          ),
        );
      }
    }, "determine follower status");
  }

  public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
    this.doFailureReportingOperation(async () => {
      this.view.setFolloweeCount(
        await this.service.getFolloweeCount(authToken, displayedUser),
      );
    }, "get followees count");
  }

  public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
    this.doFailureReportingOperation(async () => {
      this.view.setFollowerCount(
        await this.service.getFollowerCount(authToken, displayedUser),
      );
    }, "get followers count");
  }

  getBaseUrl = (location: Location): string => {
    const segments = location.pathname.split("/@");
    return segments.length > 1 ? segments[0] : "/";
  };

  followDisplayedUser = async (
    displayedUser: User,
    authToken: AuthToken,
  ): Promise<void> => {
    var followingUserToast = "";
    this.doFailureAndFinallyReportingOperation(
      async () => {
        this.view.setIsLoading(true);
        followingUserToast = this.view.displayInfoMessage(
          `Following ${displayedUser.name}...`,
          0,
        );

        const [followerCount, followeeCount] = await this.service.follow(
          authToken,
          displayedUser,
        );

        this.view.setIsFollower(true);
        this.view.setFollowerCount(followerCount);
        this.view.setFolloweeCount(followeeCount);
      },
      "follow user",
      () => {
        this.view.deleteMessage(followingUserToast);
        this.view.setIsLoading(false);
      },
    );
  };

  unfollowDisplayedUser = async (
    displayedUser: User,
    authToken: AuthToken,
  ): Promise<void> => {
    var unfollowingUserToast = "";
    this.doFailureAndFinallyReportingOperation(
      async () => {
        this.view.setIsLoading(true);
        unfollowingUserToast = this.view.displayInfoMessage(
          `Unfollowing ${displayedUser.name}...`,
          0,
        );

        const [followerCount, followeeCount] = await this.service.unfollow(
          authToken!,
          displayedUser!,
        );

        this.view.setIsFollower(false);
        this.view.setFollowerCount(followerCount);
        this.view.setFolloweeCount(followeeCount);
      },
      "unfollow user",
      () => {
        this.view.deleteMessage(unfollowingUserToast);
        this.view.setIsLoading(false);
      },
    );
  };
}
