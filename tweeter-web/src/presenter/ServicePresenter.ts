import { Service } from "../model.service/Service";
import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";

export abstract class ServicePresenter<
  T extends View,
  U extends Service,
> extends Presenter<T> {
  private _service: U;

  public constructor(view: T) {
    super(view);
    this._service = this.serviceFactory();
  }

  protected get service() {
    return this._service;
  }

  protected abstract serviceFactory(): U;
}

export class UserServicePresenter<T extends View> extends ServicePresenter<
  T,
  UserService
> {
  protected serviceFactory(): UserService {
    return new UserService();
  }
}
