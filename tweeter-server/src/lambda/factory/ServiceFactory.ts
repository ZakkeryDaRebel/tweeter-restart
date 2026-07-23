import { FollowService } from "../../model/service/FollowService";
import { StatusService } from "../../model/service/StatusService";
import { UserService } from "../../model/service/UserService";

export class ServiceFactory {
  static _followService: FollowService = new FollowService();
  static _statusService: StatusService = new StatusService();
  static _userService: UserService = new UserService();

  static get followService(): FollowService {
    return this._followService;
  }

  static get statusService(): StatusService {
    return this._statusService;
  }

  static get userService(): UserService {
    return this._userService;
  }
}
