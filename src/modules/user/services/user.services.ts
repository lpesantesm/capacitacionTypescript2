import { JwtHelper } from "../../../shared/helpers/jwt.helper"
import { UserLoginInterface } from "../interfaces/user.interface";
import { UserRepositories } from "../repositories/user.repository";

export class UserService {
  async get() {
    
    const allUsers = await new UserRepositories().getAllUsers()
    return allUsers;
  }

  login(user: UserLoginInterface){
    const jwtHelper = new JwtHelper()

    return jwtHelper.create({
      data: user,
      date: new Date().toISOString()
    })
  }
}