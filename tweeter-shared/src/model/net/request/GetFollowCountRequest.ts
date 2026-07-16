import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterReqest";

export interface GetFollowCountRequest extends TweeterRequest {
  token: string;
  user: UserDto;
}
