import { AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { View } from "./Presenter";

export interface LogoutView extends View {
  displayInfoMessage: (message: string, duration: number) => string;
  deleteMessage: (messageId: string) => void;
  clearUserInfo: () => void;
  navigate: (featureUrl: string) => void;
}

export class LogoutPresenter {
  private service: UserService;
  private view: LogoutView;

  public constructor(view: LogoutView) {
    this.service = new UserService();
    this.view = view;
  }

  public async logOut(authToken: AuthToken) {
    const loggingOutToastId = this.view.displayInfoMessage("Logging Out...", 0);

    try {
      await this.service.logout(authToken!);

      this.view.deleteMessage(loggingOutToastId);
      this.view.clearUserInfo();
      this.view.navigate("/login");
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`,
      );
    }
  }
}
