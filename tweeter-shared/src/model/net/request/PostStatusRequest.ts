import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterReqest";

export interface PostStatusRequest extends TweeterRequest {
  token: string;
  newStatus: StatusDto;
}
