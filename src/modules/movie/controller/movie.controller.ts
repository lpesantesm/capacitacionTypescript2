import { Request , Response } from "express";

import { serviceResponse, wrapperError } from "../../../shared/helpers/response.helper";
import { MovieService } from "../services/movie.services";
import { GetAllMovieParams, MovieI } from "../interfaces/movie.interface";

export class MovieController {
  private movieService: MovieService;
  constructor(){
    this.movieService = new MovieService();
  }

  async getMovie(req: Request, res: Response){
    try {
      const id = Number(req.params.id);
      const response = await this.movieService.getMovie(id);

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

  async getAllMovies(req: Request, res: Response){
    try {
      const query: GetAllMovieParams =
      {
        limit: Number(req.query.limit),
        page:  Number(req.query.page),
        status: req.query.status as string,
      };
      const response = await this.movieService.getAllMovies(query);
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

  async createMovie(req: Request, res: Response){
    try {
      const body = req.body as MovieI;
      const response = await this.movieService.createMovie(body);

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

  async editMovie(req: Request, res: Response){
    try {
      const id = Number(req.params.id);
      const movie = req.body as MovieI;
      const response = await this.movieService.editMovie(id, movie);

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
      const status = req.query.status === 'true'? true : false;
      const response = await this.movieService.changesStatus(id, status);


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