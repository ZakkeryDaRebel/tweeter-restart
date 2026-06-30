import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";

export class UserServicePresenter<T extends View> extends Presenter<T> {
  private _userService: UserService;

  public constructor(view: T) {
    super(view);
    this._userService = new UserService();
  }

  protected get userService() {
    return this._userService;
  }
}
