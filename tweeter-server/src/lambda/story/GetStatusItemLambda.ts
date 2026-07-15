import {
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  Status,
  StatusDto,
} from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";

export const handler = async (
  request: PagedStatusItemRequest,
  serviceOperation: (
    service: StatusService,
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null,
  ) => Promise<[StatusDto[], boolean]>,
): Promise<PagedStatusItemResponse> => {
  const statusService: StatusService = new StatusService();
  const [items, hasMore] = await serviceOperation(
    statusService,
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
