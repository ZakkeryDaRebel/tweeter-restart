import { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared";
import { handler as parentHandler } from "./GetUserItemLambda";

export const handler = async (
  request: PagedUserItemRequest,
): Promise<PagedUserItemResponse> =>
  parentHandler(request, (service, ...args) =>
    service.loadMoreFollowers(...args),
  );
