import { UserDto } from "../../dto/UserDto";
import { AuthenticatedRequest } from "./AuthenticatedRequest";
import { TweeterRequest } from "./TweeterReqest";

export interface FollowCommandRequest extends AuthenticatedRequest {
  userToInteract: UserDto;
}
