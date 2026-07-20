import { UserDto } from "../../dto/UserDto";
import { AuthenticatedRequest } from "./AuthenticatedRequest";

export interface FollowCommandRequest extends AuthenticatedRequest {
  userToInteract: UserDto;
}
