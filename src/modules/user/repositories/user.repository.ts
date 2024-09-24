import { DataBaseConfig } from "@/config/baseConfig"
import { UserEntity } from "@/entities/user.entity";
import { UserController } from '../controller/user.controller';
import { UserI } from "../interfaces/user.interface";



export class UserRepositories{
    async getAllUsers(){
        try {
            const cnx = await DataBaseConfig
                              .getConnection();

            //Me devuelve todos los usuarios
            const usersAll = await cnx
                                .createQueryBuilder()
                                .select([
                                    'user.id as "id"',
                                    `concat(user.name, ' ', user.lastName ) as "fullName"`,
                                    'user.body as "body"'
                                ])
                                .from(UserEntity,"user")
                                .offset(1)
                                .limit(5)
                                .getRawMany<UserI>()
            
            return usersAll

        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    }

    async getFindOneUser(){
        try {
            const cnx = await DataBaseConfig
                              .getConnection();

            //Me devuelve solo un usuario
            const usersOne = await cnx
                                .createQueryBuilder()
                                .from(UserEntity,"user")
                                .getRawOne<UserI>()
            
            return usersOne

        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    }





}