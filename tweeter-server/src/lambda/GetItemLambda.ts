import { PagedItemRequest, PagedItemResponse } from "tweeter-shared";

export const handler = async <T>(
  request: PagedItemRequest<T>,
  serviceOperation: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: T | null,
  ) => Promise<[T[], boolean]>,
): Promise<PagedItemResponse<T>> => {
  const [items, hasMore] = await serviceOperation(
    request.token,
    request.userAlias,
    request.pageSize,
    request.lastItem,
  );
  return {
    success: true,
    message: null,
    items: items,
    hasMore: hasMore,
  };
};
