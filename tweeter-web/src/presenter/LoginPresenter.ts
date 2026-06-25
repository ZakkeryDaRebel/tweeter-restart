import { UserService } from "../model.service/UserService";

export interface LoginView {}

export class LoginPresenter {
  private service: UserService;
  private view: LoginView;

  public constructor(view: LoginView) {
    this.view = view;
    this.service = new UserService();
  }
}
