import { Request, Response } from "express"

export interface ServicesResponsesInterface {
    req: Request,
    res: Response,
    data: any,
    message?: string,
}