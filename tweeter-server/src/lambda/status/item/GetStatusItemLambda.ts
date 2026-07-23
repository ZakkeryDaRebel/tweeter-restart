import {
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  StatusDto,
} from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { ServiceFactory } from "../../factory/ServiceFactory";
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
  return await parentHandler(request, (...args) =>
    serviceOperation(ServiceFactory.statusService, ...args),
  );
};
