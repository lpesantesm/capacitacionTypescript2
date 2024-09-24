import { DataSource } from "typeorm";
import { config } from "./server";
import { UserEntity } from "@/entities/user.entity";
import { MovieEntity } from "@/entities/movies.entity";

export class DataBaseConfig {
      private static cnx: DataSource;
   
      public static async  connect(){
      try {
          this.cnx = new DataSource({
          type: "postgres",
          host: config.POSTGRES.DB_HOST,
          port: config.POSTGRES.DB_PORT,
          username: config.POSTGRES.DB_username,
          password: config.POSTGRES.DB_password,
          database: config.POSTGRES.DB_NAME,
          synchronize: config.POSTGRES.DB_synchronize,
          entities: [UserEntity,MovieEntity]
        });
  
        if(!this.cnx.isInitialized){
          await this.cnx.initialize();
          console.info("Conectados a la base")
        }
  
      } catch(error: any){
        console.error(error);
        throw new Error(error);
      }
    }

    public static async getConnection(){
       return this.cnx
    }


    public static async disconnect(){
            if(this.cnx){
               await this.cnx.destroy() 
            }
        }

}


process.on('SIGINT', async () => {
  await DataBaseConfig.disconnect();
  process.exit();
})

process.on('SIGTERM', async () => {
  await DataBaseConfig.disconnect();
  process.exit();
})
