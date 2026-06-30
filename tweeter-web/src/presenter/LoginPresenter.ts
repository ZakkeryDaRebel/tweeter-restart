import { User, AuthToken } from "tweeter-shared";
import {
  AuthenticationPresenter,
  AuthenticationView,
} from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter<AuthenticationView> {
  private originalUrl: string | undefined;

  public constructor(
    view: AuthenticationView,
    originalUrl: string | undefined,
  ) {
    super(view);
    this.originalUrl = originalUrl;
  }

  protected async authenticationOperation(
    alias: string,
    password: string,
    firstName: string | undefined,
    lastName: string | undefined,
  ): Promise<[User, AuthToken]> {
    return await this.service.login(alias, password);
  }

  protected authenticationDescription(): string {
    return "log user in";
  }

  protected getDestinationUrl(user: User): string {
    return !!this.originalUrl
      ? this.originalUrl
      : this.defaultDestinationUrl(user);
  }
}
