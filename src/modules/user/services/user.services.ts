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
    const response = await  new UserRepository().getFindOne('id', id);
    return response;
  }

  async getAllUsers(query: GetAllUserParams){
    const allUsers = await  new UserRepository().getAllUsers(query);
    return allUsers;
  }

  async createUser(user: UserI) {
    const userRepository = new UserRepository();
    const exist = await userRepository.getFindOne('name', user.name);
    if(exist){
      throw new Error(`Ya existe el usuario con nombre: ${exist.name}`);
    }
    const response = await  new UserRepository().createUser(user);

    return response;
  }

  async editUser(id: number, user: UserI){
    const userRepository = new UserRepository();
    const existId = await userRepository.getFindOne('id', id);
    if(!existId){
      throw new Error('No existe el usuario');
    }
    const existName = await userRepository.getFindOne('name', user.name, id);

    if(existName){
      throw new Error(`Ya existe el usuario con nombre: ${existName.name}`);
    }
    const updated = userRepository.editUser(id, user);
    return updated;
  }

  async changeStatus(id: number, status: boolean){
    const userRepository = new UserRepository();
    const exist = await userRepository.getFindOne('id', id);
    if(!exist){
      throw new Error('No existe el usuario');
    }
    const updated = userRepository.changeStatusUser(id, status);
    return updated;
  }
}