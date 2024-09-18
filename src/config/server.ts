import  { cleanEnv, host, port }  from "envalid"
import * as dotenv from "dotenv"

dotenv.config()

export const config = {
    server: cleanEnv(process.env ,{
        HOST: host(),
        PORT: port(),
    })
}