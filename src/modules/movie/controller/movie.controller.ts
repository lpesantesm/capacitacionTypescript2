import { Request , Response } from "express";

import { serviceResponse, wrapperError } from "../../../shared/helpers/response.helper";
import { MovieService } from "../services/movie.services";
import { GetAllMovieParams } from "../interfaces/movie.interface";

export class MovieController {
  async getUser(req: Request, res: Response){
    try {
      const response = 'ok';

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
      const query: GetAllMovieParams =
      {
        limit: Number(req.query.limit),
        page:  Number(req.query.page),
        status: req.query.status as string,
      };
      const response = await new MovieService().getAllUsers(query);
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
      const response = 'ok';

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
      const response = 'ok';

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
      const response = 'ok';

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