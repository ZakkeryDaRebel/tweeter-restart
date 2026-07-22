import {
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  StatusDto,
} from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { handler as parentHandler } from "../../GetItemLambda";

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
  return await parentHandler(request, (...args) =>
    serviceOperation(statusService, ...args),
  );
};
