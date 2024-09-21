import { Router } from "express"
import { UserController } from '../controller/user.controller';
import { jwtMiddleware } from "../../../shared/middleware/jwt.middleware";

export class UserRoutes {
    static get routes(): Router {
    const router = Router()
    const userController = new UserController();    


    router.get(
      "/",
      [jwtMiddleware],
      userController.get.bind(userController) 
    )    

    router.post(
      "/login",
      userController.login.bind(userController) 
    )    


    return router
    }
}