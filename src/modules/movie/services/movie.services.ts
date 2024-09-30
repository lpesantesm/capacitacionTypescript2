import { UserRepository } from "@/modules/user/repositories/user.repository";
import { GetAllMovieParams } from "../interfaces/movie.interface";
import { MovieRepository } from "../repository/movie.repoitory";

export class MovieService {
  async getAllUsers(query: GetAllMovieParams){
    const allMovie = await new MovieRepository().getAllMovie(query);
    const userAll = await new UserRepository().getAllUsers({
      limit: 10,
      page: 1,
      status: 'true'
    });

    allMovie.records = allMovie.records.map((movie) => {
      const user = userAll.records.find((user) => user.id === movie.userId);
      return {
        ...movie,
        user,
      }
    });

    return allMovie;
  }
}