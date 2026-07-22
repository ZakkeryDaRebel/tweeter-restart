import {
  PagedStatusItemRequest,
  PagedStatusItemResponse,
} from "tweeter-shared";
import { handler as parentHandler } from "./GetStatusItemLambda";

export const handler = async (
  request: PagedStatusItemRequest,
): Promise<PagedStatusItemResponse> =>
  await parentHandler(request, (service, ...args) =>
    service.loadMoreFeedItems(...args),
  );
