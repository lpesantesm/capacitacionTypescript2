import { DataBaseConfig } from "@/config/baseConfig";
import { MovieEntity } from "@/entities/movies.entity";
import { GetAllMovieParams, MovieI } from "../interfaces/movie.interface";
import { UserEntity } from "@/entities/user.entity";

export class MovieRepository {
  async getAllMovie(query: GetAllMovieParams) {
    try {
      const { page, limit } = query;
      const status = query.status === 'true' ? true : false;

      console.log({ page, limit, status });
      const cnx = await DataBaseConfig.getConnection();

      const queryBuilder = cnx.createQueryBuilder()
        .select([
          'movie.id as "id"',
          'movie.name as "name"',
          'movie.user_id as "userId"',
          'movie.description as "description"',
          'movie.status as "status"',
          'movie.create_at as "createAt"',
          'movie.update_at as "updatedAt"',
          'user.id as "userId"',
          `concat(user.name, ' ', user.lastName) as "fullName"`
        ])
        .from(MovieEntity, 'movie')
        .innerJoin(UserEntity, "user", "movie.user_id = user.id")
        .where("movie.status = :status", { status })
        .andWhere("user.status = :status",{ status})
        .offset((page - 1) * limit)
        .limit(limit)
        .orderBy('user.id', "DESC");

      const sql = queryBuilder.getQueryAndParameters();
      console.log({ sql });
      const movieAll = await queryBuilder.getRawMany<MovieI>();

      const total = await queryBuilder.getCount();

      console.log({
        movieAll,
        total
      });
      const response = {
        records: movieAll,
        page: Number(page),
        total: total,
        totalPage: Math.ceil(total / limit)
      }

      return response;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }
}