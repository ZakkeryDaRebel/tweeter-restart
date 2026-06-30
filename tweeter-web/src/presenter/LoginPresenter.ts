import { UserService } from "../model.service/UserService";
import { AuthenticationView, Presenter } from "./Presenter";

export class LoginPresenter extends Presenter<AuthenticationView> {
  private service: UserService;

  public constructor(view: AuthenticationView) {
    super(view);
    this.service = new UserService();
  }

  public async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl: string | undefined,
  ) {
    this.doFailureAndFinallyReportingOperation(
      async () => {
        this.view.setIsLoading(true);

        const [user, authToken] = await this.service.login(alias, password);

        this.view.updateUserInfo(user, user, authToken, rememberMe);

        if (!!originalUrl) {
          this.view.navigate(originalUrl);
        } else {
          this.view.navigate(`/feed/${user.alias}`);
        }
      },
      "log user in",
      () => {
        this.view.setIsLoading(false);
      },
    );
  }
}
