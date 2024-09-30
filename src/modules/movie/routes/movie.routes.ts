import { Router } from "express";
import { MovieController } from "../controller/movie.controller";


export class MovieRoutes {
  static get routes(): Router {
    const router = Router();
    const movieController = new MovieController();

    router.get(
      "/:id",
      movieController.getUser.bind(movieController)
    )

    router.get(
      "/",
      movieController.getAllUsers.bind(movieController)
    )

    router.post(
      "/",
      movieController.createUser.bind(movieController)
    )

    router.put(
      "/:id",
      movieController.editUser.bind(movieController)
    )

    router.patch(
      "/:id",
      movieController.changeStatus.bind(movieController)
    )

    return router;
  }
}