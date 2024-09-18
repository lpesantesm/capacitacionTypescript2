import { Router } from "express"
import { UserController } from '../controller/user.controller';

export class UserRoutes {
    static get routes(): Router {
    const router = Router()
    const userController = new UserController();    


    router.get(
      "/",
      userController.get.bind(userController) 
    )    

    return router
    }
}