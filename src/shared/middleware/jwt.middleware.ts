import { NextFunction, Response, Request } from "express";
import { HTTPCODE } from "../enum/http.code";
import { JwtHelper, wrapperError } from "../helpers";
import { unAuthorization } from "@constants/messages.constans";

const jwtMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const authorization = req.headers.authorization
    const excluyePath = [
        'login', ]
    const valid = excluyePath.filter((path) => {
                        if(!req.url.includes(path)){
                            return true
                        }
                   })   
    
    try{
        const jwtHelper = new JwtHelper()
 
        if(authorization?.startsWith("Bearer ") && valid){
            const code = authorization?.split(" ")[1]
            const status =jwtHelper.validate(code)
            console.log({status})
            if(status){
                next();
            }
        }
    }catch(error){
        wrapperError({
            req,
            res,
            statusCode: HTTPCODE.unAuthorized,
            message: unAuthorization
        })
    }


}
export { jwtMiddleware}