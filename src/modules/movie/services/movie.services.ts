import { UserRepository } from "@/modules/user/repositories/user.repository";
import { GetAllMovieParams, MovieI } from "../interfaces/movie.interface";
import { MovieRepository } from "../repository/movie.repoitory";
import { DataBaseConfig } from "@/config/baseConfig";
import { EntityManager } from "typeorm";

export class MovieService {
  private movieRepo: MovieRepository
  constructor() {
    this.movieRepo = new MovieRepository();
  }

  async getMovie(id: number) {
    try {
      const cnx = await DataBaseConfig.getConnection();
      return await this.movieRepo.getMovie(cnx, id);
    } catch (error: any) {
      console.error(error)
      throw new Error(error);
    }
  }

  async getAllMovies(query: GetAllMovieParams) {
    const [allMovie, userAll] = await Promise.all(
      [
        this.movieRepo.getAllMovie(query),
        new UserRepository().getAllUsers({
          limit: 10,
          page: 1,
          status: 'true'
        }),
      ]
    );

    console.log({ allMovie, userAll });

    allMovie.records = allMovie.records.map((movie) => {
      const user = userAll.records.find((user) => user.id === movie.userId);
      return {
        ...movie,
        user,
      }
    });

    return allMovie;
  }

  async createMovie(movieObj: MovieI) {
    try {
      const cnx = await DataBaseConfig.getConnection();
      return await cnx.transaction(async (connection: EntityManager) => {
        const newMovie = await this.movieRepo.createMovie(connection, movieObj)

        return newMovie;
      });
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }

  async editMovie(id: number, movieObj: MovieI) {
    try {
      const cnx = await DataBaseConfig.getConnection();
      return await cnx.transaction(async (connection: EntityManager) => {
        const newMovie = await this.movieRepo.editMovie(connection, id, movieObj)

        return newMovie;
      });
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }

  async changesStatus(id:  number, status: boolean){
    try {
      return await this.movieRepo.changesStatus(id, status);
    } catch (error: any) {
      console.error(error);
      throw new Error(error)
    }
  }
}