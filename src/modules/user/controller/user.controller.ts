import { Request, Response } from "express"
import { UserService } from "../services/user.services"

export class UserController {
    get(req: Request, res: Response){
        try {
            const userService = new UserService()
            const response = userService.get()
            res.status(200).json(response)
        } catch (error: any ){
            throw new Error(error)
        }
    }
}