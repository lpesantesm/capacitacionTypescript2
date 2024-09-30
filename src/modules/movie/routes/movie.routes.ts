import { Router } from "express";
import { MovieController } from "../controller/movie.controller";


export class MovieRoutes {
  static get routes(): Router {
    const router = Router();
    const movieController = new MovieController();

    router.get(
      "/:id",
      movieController.getMovie.bind(movieController)
    )

    router.get(
      "/",
      movieController.getAllMovies.bind(movieController)
    )

    router.post(
      "/",
      movieController.createMovie.bind(movieController)
    )

    router.put(
      "/:id",
      movieController.editMovie.bind(movieController)
    )

    router.patch(
      "/:id",
      movieController.changeStatus.bind(movieController)
    )

    return router;
  }
}