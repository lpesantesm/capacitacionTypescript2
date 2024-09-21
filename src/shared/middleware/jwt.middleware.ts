import { NextFunction, Response, Request } from "express";
import { HTTPCODE } from "../enum/http.code";
import { JwtHelper } from "../helpers/jwt.helper";
import { wrapperError } from "../helpers/response.helper";

const jwtMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const authorization = req.headers.authorization
    const jwtHelper = new JwtHelper()

    if(authorization?.startsWith("Bearer ")){
        const code = authorization?.split(" ")[1]
        const status =jwtHelper.validate(code)
        console.log({status})
        if(status){
            next();
        }else{
            wrapperError({
                req,
                res,
                statusCode: HTTPCODE.unAuthorized
            })
        }
    }

}
export { jwtMiddleware}