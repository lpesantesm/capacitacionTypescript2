import  { cleanEnv, host, port, str }  from "envalid"
import dotenv from "dotenv"

dotenv.config()

export const config = {
    server: cleanEnv(process.env ,{
        HOST: host(),
        PORT: port(),
        JWT_SECRET: str()
    })
}