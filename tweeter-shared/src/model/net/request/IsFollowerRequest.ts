import { TokenedAliasRequest } from "./TokenedAliasRequest";

export interface IsFollowerRequest extends TokenedAliasRequest {
  selectedUserAlias: string;
}
