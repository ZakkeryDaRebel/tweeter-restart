import {
  PagedUserItemRequest,
  PagedUserItemResponse,
  UserDto,
} from "tweeter-shared";

export const handler = async (
  request: PagedUserItemRequest,
  serviceOperation: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null,
  ) => Promise<[UserDto[], boolean]>,
): Promise<PagedUserItemResponse> => {
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
