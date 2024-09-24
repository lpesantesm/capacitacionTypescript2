import { DataBaseConfig } from "@/config/baseConfig"
import { UserEntity } from "@/entities/user.entity";

export class UserRepository{
    async getAllUsers(){
        try {
            const cnx = await DataBaseConfig.getConnection();

            //Me devuelve todos los usuarios
            const users = await cnx.createQueryBuilder().from(UserEntity,"user").getRawMany()
            return users
            //cnx.getRepository()

        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    }
}