import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterReqest";

export interface IsFollowerRequest extends TweeterRequest {
  token: string;
  user: UserDto;
  selectedUser: UserDto;
}
