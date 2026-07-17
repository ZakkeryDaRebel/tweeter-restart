import { TweeterRequest } from "./TweeterReqest";

export interface GetUserRequest extends TweeterRequest {
  token: string;
  alias: string;
}
