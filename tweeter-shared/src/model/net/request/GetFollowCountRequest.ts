import { AuthenticatedRequest } from "./AuthenticatedRequest";

export interface GetFollowCountRequest extends AuthenticatedRequest {
  userAlias: string;
}
