import  { cleanEnv, host, makeValidator, port }  from "envalid"
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
    })
}