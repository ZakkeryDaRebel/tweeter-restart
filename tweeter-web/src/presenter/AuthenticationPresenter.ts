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
> extends Presenter<T> {}
