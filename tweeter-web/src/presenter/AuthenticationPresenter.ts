import { AuthenticationView, Presenter } from "./Presenter";

export abstract class AuthenticationPresenter<
  T extends AuthenticationView,
> extends Presenter<T> {}
