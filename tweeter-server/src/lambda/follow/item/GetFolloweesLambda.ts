import { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared";
import { handler as parentHandler } from "./GetUserItemLambda";

export const handler = async (
  request: PagedUserItemRequest,
): Promise<PagedUserItemResponse> =>
  await parentHandler(request, (service, ...args) =>
    service.loadMoreFollowees(...args),
  );
