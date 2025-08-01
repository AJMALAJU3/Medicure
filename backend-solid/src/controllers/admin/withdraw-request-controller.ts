import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IAdminWithdrawRequestService } from "@/services";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { Request, Response } from "express";
import { HTTP_STATUS } from "@/constants";
import { IAdminWithdrawRequestController } from "../interfaces";
import { IWithdrawRequestStatus } from "@/interfaces";

@injectable()
export class AdminWithdrawRequestController implements IAdminWithdrawRequestController {
  constructor(
    @inject(TYPES.AdminWithdrawRequestService) private readonly WithdrawRequestService: IAdminWithdrawRequestService
  ) {}

  getWithdrawRequests = async (req: Request, res: Response): Promise<void> => {
    console.log('its admin');
    
    const { status } = req.query;
    const pagination = getPaginationParams(req)
    const { requests, total } = await this.WithdrawRequestService.getWithdrawRequests( status as IWithdrawRequestStatus, pagination);
    const meta = buildPaginationMeta(total, pagination.skip)
    successResponse(
      res,
      HTTP_STATUS.OK,
      "WithdrawRequests fetched successfully.",
      requests, meta
    );
  };
}
