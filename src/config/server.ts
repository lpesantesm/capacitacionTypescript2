import  { cleanEnv, host, makeValidator, port, str, bool }  from "envalid"
import dotenv from "dotenv"

dotenv.config()

const minLength = makeValidator((value: string) =>{
    if(value.length <=15){
        throw new Error ('La variable debe tener minimo 15 caracteres')
    }
    return value
})

export const config = {
    server: cleanEnv(process.env ,{
        HOST: host(),
        PORT: port(),
        JWT_SECRET: minLength()
    }),
    POSTGRES: cleanEnv(process.env, {
        DB_HOST: host(),
        DB_PORT: port(),
        DB_NAME: str(),
        DB_username: str(),
        DB_password: str(),
        DB_synchronize: bool(),
      }),
}
