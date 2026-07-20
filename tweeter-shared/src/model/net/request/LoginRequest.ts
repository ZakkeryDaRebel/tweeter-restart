import { TweeterRequest } from "./TweeterReqest";

export interface LoginRequest extends TweeterRequest {
  alias: string;
  password: string;
}
