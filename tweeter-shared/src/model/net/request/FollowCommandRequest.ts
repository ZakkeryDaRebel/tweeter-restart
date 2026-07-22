import { AliasRequest } from "./AliasRequest";
import { AuthenticatedRequest } from "./AuthenticatedRequest";

export interface FollowCommandRequest
  extends AuthenticatedRequest, AliasRequest {}
