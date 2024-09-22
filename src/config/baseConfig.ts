import { DataSource } from "typeorm";
import { config } from "./server";

export class DataBaseConfig {
      cnx!: DataSource;
   
      async connect(){
      try {
          this.cnx = new DataSource({
          type: "postgres",
          host: config.POSTGRES.DB_HOST,
          port: config.POSTGRES.DB_PORT,
          username: config.POSTGRES.DB_username,
          password: config.POSTGRES.DB_password,
          database: config.POSTGRES.DB_NAME,
          synchronize: config.POSTGRES.DB_synchronize,
          entities: []
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

    async disconnect(){
            if(this.cnx){
               await this.cnx.destroy() 
            }
        }

}