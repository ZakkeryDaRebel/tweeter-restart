import { UserService } from "../model.service/UserService";

export interface RegisterView {}

export class RegisterPresenter {
  private service: UserService;
  private view: RegisterView;

  public constructor(view: RegisterView) {
    this.service = new UserService();
    this.view = view;
  }
}
