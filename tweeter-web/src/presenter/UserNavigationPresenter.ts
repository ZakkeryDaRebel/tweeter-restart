import { AuthToken, User } from "tweeter-shared";
import { NavigateView } from "./Presenter";
import { UserServicePresenter } from "./UserServicePresenter";

export interface UserNavigationView extends NavigateView {
  setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter extends UserServicePresenter<UserNavigationView> {
  public async navigateToUser(
    eventString: string,
    authToken: AuthToken,
    displayedUser: User,
  ): Promise<void> {
    this.doFailureReportingOperation(async () => {
      const alias = this.extractAlias(eventString);
      const featurePath = this.extractPath(eventString);

      const toUser = await this.userService.getUser(authToken, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          this.view.setDisplayedUser(toUser);
          this.view.navigate(`${featurePath}/${toUser.alias}`);
        }
      }
    }, "get user");
  }

  public extractAlias(value: string): string {
    const index = value.indexOf("@");
    return value.substring(index);
  }

  public extractPath(value: string): string {
    const index = value.indexOf("@");
    const beforeIndex = value.substring(0, index - 1);
    const slashIndex = beforeIndex.lastIndexOf("/");
    return beforeIndex.substring(slashIndex);
  }
}
