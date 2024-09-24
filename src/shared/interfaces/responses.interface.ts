import { Request, Response } from "express";
import { HTTP_CODE } from "shared/enum/http.code.enum";

export interface ServicesResponsesInterface {
  req: Request,
  res: Response,
  data?: any,
  message?: string,
  statusCode?: HTTP_CODE
}