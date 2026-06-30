import { AuthToken, User } from "tweeter-shared";
import { LoadingView, NavigateView, UpdateUserView } from "./Presenter";
import { UserServicePresenter } from "./UserServicePresenter";

export interface AuthenticationView
  extends LoadingView, NavigateView, UpdateUserView {}

export abstract class AuthenticationPresenter<
  T extends AuthenticationView,
> extends UserServicePresenter<T> {
  private _rememberMe: boolean;

  public constructor(view: T) {
    super(view);
    this._rememberMe = false;
  }

  public get rememberMe() {
    return this._rememberMe;
  }

  public set rememberMe(value: boolean) {
    this._rememberMe = value;
  }

  public async doAuthentication(
    alias: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ) {
    this.doFailureAndFinallyReportingOperation(
      async () => {
        this.view.setIsLoading(true);

        const [user, authToken] = await this.authenticationOperation(
          alias,
          password,
          firstName,
          lastName,
        );

        this.view.updateUserInfo(user, user, authToken, this.rememberMe);

        this.view.navigate(this.getDestinationUrl(user));
      },
      this.authenticationDescription(),
      () => {
        this.view.setIsLoading(false);
      },
    );
  }

  protected abstract authenticationOperation(
    alias: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ): Promise<[User, AuthToken]>;

  protected abstract authenticationDescription(): string;

  protected abstract getDestinationUrl(user: User): string;

  protected defaultDestinationUrl(user: User): string {
    return `/feed/${user.alias}`;
  }
}
