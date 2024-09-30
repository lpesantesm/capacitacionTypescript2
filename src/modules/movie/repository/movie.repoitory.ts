import { DataBaseConfig } from "@/config/baseConfig";
import { MovieEntity } from "@/entities/movies.entity";
import { GetAllMovieParams, MovieI } from "../interfaces/movie.interface";
import { UserEntity } from "@/entities/user.entity";
import { ResponsesPaginationI } from "@/shared/interfaces";
import { DataSource, EntityManager } from "typeorm";
import { failedUpdated, updatedSuccess } from "@/shared/constants";

export class MovieRepository {

  async getMovie(cnx: DataSource, id: number) {
    const repo = cnx.getRepository(MovieEntity);

    const find = await repo.findOne({ where: { id }});

    return find;
  }

  async getAllMovie(query: GetAllMovieParams): Promise<ResponsesPaginationI<MovieI>> {
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
        .leftJoin(UserEntity, "user", "movie.user_id = user.id")
        .where("movie.status = :status", { status })
        .andWhere("user.status = :status", { status })
        .orWhere("movie.status = :status", { status: false })

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

  async createMovie(cnx: EntityManager, movieObj: MovieI) {

    const movieRepo = cnx.getRepository(MovieEntity);

    const movie = movieRepo.create(movieObj);

    const save = await movieRepo.save(movie);
    return save;
  }

  async editMovie(cnx: EntityManager, id: number, movie: MovieI){
    const updated = await cnx.createQueryBuilder()
    .update(MovieEntity)
    .set(movie)
    .where("id = :paramId", { paramId: id })
    .execute();

    if (updated.affected !== 1) {
      throw new Error(failedUpdated(`actualizar la Movie con id: ${id}`))
    }

    return updatedSuccess('Movie')
  }

  async changesStatus(id: number, status: boolean) {
    try {
      const cnx = await DataBaseConfig.getConnection();

      const updated = await cnx.createQueryBuilder()
        .update(MovieEntity)
        .set({
          status
        })
        .where("id = :paramId", { paramId: id })
        .execute();

      const action = status ? 'Activar' : 'Desactivar';

      if (updated.affected !== 1) {
        throw new Error(failedUpdated(action, `el Movie con id: ${id}`))
      }

      return updatedSuccess('estado del Movie')
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }
}