import { UserDto } from "../../dto/UserDto";
import { AuthenticatedRequest } from "./AuthenticatedRequest";

export interface IsFollowerRequest extends AuthenticatedRequest {
  user: UserDto;
  selectedUser: UserDto;
}
