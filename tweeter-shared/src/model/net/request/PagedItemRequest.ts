import { TokenedAliasRequest } from "./TokenedAliasRequest";

export interface PagedItemRequest<T> extends TokenedAliasRequest {
  readonly pageSize: number;
  readonly lastItem: T | null;
}
