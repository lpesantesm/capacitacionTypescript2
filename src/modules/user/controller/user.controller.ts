import { Request, Response } from "express"
import { UserService } from "../services/user.services"
import { serviceResponse, wrapperError } from "../../../shared/helpers/response.helper"
import { UserLoginInterface } from "../interfaces/user.interface"

export class UserController {
  async get(req: Request, res: Response){
    try {
      const userService = new UserService();
      const response = await userService.get();

      serviceResponse({
        req,
        res,
        data: response
      });
    } catch (error: any) {
      wrapperError({
        req,
        res,
      })
    }
  }

  login(req: Request, res: Response){
    try {
      const body = req.body as UserLoginInterface;
      const userService = new UserService();
      const response = userService.login(body);

      serviceResponse({
        req,
        res,
        data: response
      });
    } catch (error: any) {
      wrapperError({
        req,
        res,
      })
    }
  }

}