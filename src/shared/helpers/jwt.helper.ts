import { config } from "../../config/server"
import jwt from "jsonwebtoken" 
import { JwtInterface } from "../interfaces/jwt.interface"

export class JwtHelper {
    private SECRET!: string

    constructor(){
        this.SECRET = config.server.JWT_SECRET
    }

    create(payload:JwtInterface<any> ){
        try{
            return jwt.sign(payload,this.SECRET,{
              expiresIn: "1m"  
            })
        } catch (error: any){
            throw new Error(error)
        }
    }

    validate(token: string){
        return jwt.verify(token, this.SECRET)
    }

    decode(token: string){
        return jwt.decode(token)
    }


}