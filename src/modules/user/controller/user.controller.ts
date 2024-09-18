import { Request, Response } from "express"
import { UserService } from "../services/user.services"
import { serviceResponse, wrapperError } from "../../../shared/helpers/response.helper"

export class UserController {
    get(req: Request, res: Response){
        try {
            const userService = new UserService()
            const response = userService.get()
            //throw new Error("ERROR") //Esta linea es solo para probar el error
            serviceResponse({
              req,
              res,
              data: response  
            })
        } catch (error: any ){
            wrapperError({
                req,
                res,
            })
        }
    }
}