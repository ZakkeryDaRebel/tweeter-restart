import { AliasRequest } from "./AliasRequest";
import { AuthenticatedRequest } from "./AuthenticatedRequest";

export interface TokenedAliasRequest
  extends AuthenticatedRequest, AliasRequest {}
