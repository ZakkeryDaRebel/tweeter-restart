import { AuthToken } from "tweeter-shared";
import { MessageView, NavigateView } from "./Presenter";
import { UserServicePresenter } from "./UserServicePresenter";

export interface LogoutView extends MessageView, NavigateView {
  clearUserInfo: () => void;
}

export class LogoutPresenter extends UserServicePresenter<LogoutView> {
  public async logOut(authToken: AuthToken) {
    const loggingOutToastId = this.view.displayInfoMessage("Logging Out...", 0);
    await this.doFailureReportingOperation(async () => {
      await this.userService.logout(authToken!);

      this.view.deleteMessage(loggingOutToastId);
      this.view.clearUserInfo();
      this.view.navigate("/login");
    }, "log user out");
  }
}
