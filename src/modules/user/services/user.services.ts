import { JwtHelper } from "../../../shared/helpers/jwt.helper"
import { UserLoginInterface } from "../interfaces/user.interface"

export class UserService {
    get(){
         
    }

    login(user: UserLoginInterface){
        const jwtHelper = new JwtHelper()

        return jwtHelper.create({
            data: user,
            date: new Date().toISOString()
        })
 
    }
}