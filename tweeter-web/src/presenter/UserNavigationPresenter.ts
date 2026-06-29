import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";

export interface UserNavigationView extends View {
  setDisplayedUser: (user: User) => void;
  navigate: (featureUrl: string) => void;
}

export class UserNavigationPresenter extends Presenter<UserNavigationView> {
  private service: UserService;

  public constructor(view: UserNavigationView) {
    super(view);
    this.service = new UserService();
  }

  public async navigateToUser(
    eventString: string,
    authToken: AuthToken,
    displayedUser: User,
  ): Promise<void> {
    try {
      const alias = this.extractAlias(eventString);
      const featurePath = this.extractPath(eventString);

      const toUser = await this.service.getUser(authToken, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          this.view.setDisplayedUser(toUser);
          this.view.navigate(`${featurePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get user because of exception: ${error}`,
      );
    }
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
