import { TokenedAliasRequest } from "./TokenedAliasRequest";

export interface PostStatusRequest extends TokenedAliasRequest {
  post: string;
}
