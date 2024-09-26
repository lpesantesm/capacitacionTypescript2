import { Router } from "express";
import { UserController } from "../controller/user.controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const userController = new UserController();

    router.post(
      "/login",
      userController.login.bind(userController)
    )

    router.get(
      "/:id",
      userController.getUser.bind(userController)
    )

    router.get(
      "/",
      userController.getAllUsers.bind(userController)
    )

    router.post(
      "/",
      userController.createUser.bind(userController)
    )

    router.put(
      "/:id",
      userController.editUser.bind(userController)
    )

    router.patch(
      "/:id",
      userController.changeStatus.bind(userController)
    )

    return router;
  }
}