import { TweeterRequest } from "./TweeterReqest";

export interface AliasRequest extends TweeterRequest {
  userAlias: string;
}
