import { AuthenticatedRequest } from "./AuthenticatedRequest";

export interface FollowCommandRequest extends AuthenticatedRequest {
  userAliasToInteract: string;
}
