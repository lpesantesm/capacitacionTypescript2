import { Request , Response } from "express";
import { UserService } from "../services/user.services";
import { serviceResponse, wrapperError } from "../../../shared/helpers/response.helper";
import { GetAllUserParams, UserI, UserLoginInterface } from "../interfaces/user.interface";

export class UserController {
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

  async getUser(req: Request, res: Response){
    try {
      const userService = new UserService();
      const id = req.params.id;
      const response = await userService.getUser(Number(id));

      serviceResponse({
        req,
        res,
        data: response
      });
    } catch (error: any) {
      console.log(error);
      wrapperError({
        req,
        res,
        error
      })
    }
  }

  async getAllUsers(req: Request, res: Response){
    try {
      const query = req.query as unknown as GetAllUserParams;

      const userService = new UserService();
      const response = await userService.getAllUsers(query);

      serviceResponse({
        req,
        res,
        data: response
      });
    } catch (error: any) {
      wrapperError({
        req,
        res,
        error
      })
    }
  }

  async createUser(req: Request, res: Response){
    try {
      const body = req.body as UserI;
      const userService = new UserService();
      const response = await userService.createUser(body);

      serviceResponse({
        req,
        res,
        data: response
      });
    } catch (error: any) {
      wrapperError({
        req,
        res,
        error
      })
    }
  }

  async editUser(req: Request, res: Response){
    try {
      const id = Number(req.params.id);
      const body = req.body as UserI;
      const userService = new UserService();
      const response = await userService.editUser(id, body);

      serviceResponse({
        req,
        res,
        data: response
      });
    } catch (error: any) {
      wrapperError({
        req,
        res,
        error
      })
    }
  }

  async changeStatus(req: Request, res: Response){
    try {
      const id = Number(req.params.id);
      const body = req.body as Partial<UserI>;
      const status = body.status ? true : false;
      const userService = new UserService();
      const response = await userService.changeStatus(id, status);

      serviceResponse({
        req,
        res,
        data: response
      });
    } catch (error: any) {
      wrapperError({
        req,
        res,
        error
      })
    }
  }

}