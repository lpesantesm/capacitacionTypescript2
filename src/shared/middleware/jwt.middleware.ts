import { NextFunction, Request, Response } from "express";
import { HTTP_CODE } from "../enum/http.code.enum"
import { JwtHelper, wrapperError } from "../helpers";
import { unAuthorization } from "@constants/index";


const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  const jwtHelper = new JwtHelper();
  const publicPath = [
    "/login",
  ];

  const inValid = publicPath.filter((path) => {
    if(req.url.includes(path)){
      return true;
    }
  })

  if (inValid.length === 0) {
    const code = authorization?.split(" ")[1];
    try {
      if(!authorization?.startsWith("Bearer ") || !code){
        throw new Error(unAuthorization)
      }
      const status = jwtHelper.validate(code);
      console.log({ status });
      if (status) {
        next();
      }
    } catch (error) {
      wrapperError({
        req,
        res,
        statusCode: HTTP_CODE.unAuthorized,
        message: unAuthorization
      })
    }
  } else {
    next();
  }
}

export { jwtMiddleware };