import { JwtHelper } from "../../../shared/helpers/jwt.helper"

export class UserService {
    get(){
       const jwtHelper = new JwtHelper()

       return jwtHelper.create({
                    nombre: "Nombre",
                    apellido: "Apellido"
               })
         
    }
}