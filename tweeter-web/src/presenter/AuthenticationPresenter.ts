import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import {
  LoadingView,
  NavigateView,
  Presenter,
  UpdateUserView,
} from "./Presenter";

export interface AuthenticationView
  extends LoadingView, NavigateView, UpdateUserView {}

export abstract class AuthenticationPresenter<
  T extends AuthenticationView,
> extends Presenter<T> {
  private _rememberMe: boolean;
  private _service: UserService;

  public constructor(view: T) {
    super(view);
    this._rememberMe = false;
    this._service = new UserService();
  }

  public get rememberMe() {
    return this._rememberMe;
  }

  public set rememberMe(value: boolean) {
    this._rememberMe = value;
  }

  public get service() {
    return this._service;
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
    firstName: string | undefined,
    lastName: string | undefined,
  ): Promise<[User, AuthToken]>;

  protected abstract authenticationDescription(): string;

  protected abstract getDestinationUrl(user: User): string;

  protected defaultDestinationUrl(user: User): string {
    return `/feed/${user.alias}`;
  }
}
