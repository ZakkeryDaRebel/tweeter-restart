import { AuthenticatedRequest } from "./AuthenticatedRequest";

export interface PostStatusRequest extends AuthenticatedRequest {
  post: string;
  posterAlias: string;
}
