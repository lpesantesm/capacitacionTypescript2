import { JwtHelper } from "@helpers/index"
import { GetAllUserParams, UserI, UserLoginInterface } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  login(user: UserLoginInterface) {
    const jwtHelper = new JwtHelper();

    return jwtHelper.create({
      data: user,
      date: new Date().toISOString(),
    });
  }

  async getUser(id: number) {
    const response = await  new UserRepository().getFindOne(id);
    return response;
  }

  async getAllUsers(query: GetAllUserParams){
    const allUsers = await  new UserRepository().getAllUsers(query);
    return allUsers;
  }

  async createUser(user: UserI) {
    const response = await  new UserRepository().createUser(user);
    return response;
  }

  async editUser(id: number, user: UserI){
    const updated = await new UserRepository().editUser(id, user);
    return updated;
  }

  async changeStatus(){

  }
}