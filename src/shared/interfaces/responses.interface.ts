import { Request, Response } from "express"
import { HTTPCODE } from "shared/enum/http.code"

export interface ServicesResponsesInterface {
    req: Request,
    res: Response,
    data?: any,
    message?: string,
    statusCode?: HTTPCODE
}