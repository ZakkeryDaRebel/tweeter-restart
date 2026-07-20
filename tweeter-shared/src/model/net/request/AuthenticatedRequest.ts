import { TweeterRequest } from "./TweeterReqest";

export interface AuthenticatedRequest extends TweeterRequest {
  token: string;
}
