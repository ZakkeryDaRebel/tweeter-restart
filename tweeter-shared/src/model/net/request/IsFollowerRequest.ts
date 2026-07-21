import { AuthenticatedRequest } from "./AuthenticatedRequest";

export interface IsFollowerRequest extends AuthenticatedRequest {
  userAlias: string;
  selectedUserAlias: string;
}
