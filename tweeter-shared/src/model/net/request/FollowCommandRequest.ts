import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterReqest";

export interface FollowCommandRequest extends TweeterRequest {
  token: string;
  userToInteract: UserDto;
}
