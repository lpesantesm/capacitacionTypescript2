import { DataBaseConfig } from "@/config/baseConfig"
import { UserEntity } from "@/entities/user.entity";
import { GetAllUserParams, UserI, UserPartialI } from "../interfaces/user.interface";
import { createSuccess } from "@/shared/constants";


export class UserRepository {
  /**
   * Método de obtener multiples usuarios con paginación
   * @param query es de tipo GetAllUserParams
   * @returns Un objeto con información del listado de usuario
   */
  async getAllUsers(query: GetAllUserParams) {
    try {
      const cnx = await DataBaseConfig.getConnection();

      const page = Number(query.page);
      const limit = Number(query.limit);
      const status = query.status === 'true';

      const queryBuilder = cnx.createQueryBuilder()
        .select([
          'user.id as "id"',
          `concat(user.name, ' ', user.lastName) as "fullName"`,
          'user.body as "body"'
        ])
        .from(UserEntity, "user")
        .where("user.status = :status", { status })
        .offset((page - 1) * limit)
        .limit(limit);

      const usersAll =  await queryBuilder.getRawMany<UserPartialI>();

      const total = await queryBuilder.getCount();

      const response = {
        records: usersAll,
        page: Number(page),
        total: total,
        totalPage: Math.ceil(total/ limit)
      }

      return response;
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }

  /**
   * 
   * @param id Id del Usuario que se busca
   * @returns ObJeto del usuario que se busca
   */
  async getFindOne(id: number) {
    try {
      const cnx = await DataBaseConfig.getConnection();
      const usersOne = await cnx.createQueryBuilder()
        .from(UserEntity, "user")
        .where("user.id = :paramsId", { paramsId: id })
        .getRawOne<UserI>()
      return usersOne;
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }

  /**
   * Método para crear un registro de Usuarios
   * @param user Objeto de Tipo UserI
   * @returns Retornamos el registro en base
   */
  async createUser(user: UserI) {
    try {
      const cnx = await DataBaseConfig.getConnection();

      const userRepository = cnx.getRepository(UserEntity);

      const newUser = userRepository.create(user);
      return await userRepository.save(newUser);
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }

  /**
   * Método para actualizar un usuario
   * @param id Id del usuario a editar
   * @param user Objeto con las propiedades a editar
   * @returns Retorna mensaje de Éxito o error
   */
  async editUser(id: number,user: UserI) {
    try {
      const cnx = await DataBaseConfig.getConnection();

      /*
      Método para utilizar el createQueryBuilder Y actualizar
      const userUpdated = await cnx.createQueryBuilder()
      .update(UserEntity)
      .set(user)
      .where('id = :id', { id })
      .execute()
      return await userRepository.save(newUser);
      */

      //Método para actualizar mediante los repositorios de typeOrm
      const userRepository = cnx.getRepository(UserEntity);

      const newUser = await userRepository.update(id ,user);
      if(newUser.affected !== 1){
        throw new Error('No se actualizo')
      }
      return createSuccess('usuario');
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }


}