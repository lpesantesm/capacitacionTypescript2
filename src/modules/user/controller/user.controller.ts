import { Request, Response } from "express"
import { UserService } from "../services/user.services"
import { serviceResponse } from "../../../shared/helpers/response.helper"

export class UserController {
    get(req: Request, res: Response){
        try {
            const userService = new UserService()
            const response = userService.get()
            serviceResponse({
              req,
              res,
              data: response  
            })
        } catch (error: any ){
            throw new Error(error)
        }
    }
}