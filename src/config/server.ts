import { cleanEnv, host, makeValidator, port, str, bool } from "envalid";
import * as dotenv from "dotenv";

dotenv.config();

const minLength = makeValidator((value: string) => {
  if(value.length <= 25 ){
    throw new Error('La variable debe tener mínimo 25 caracteres');
  }

  return value;
});

export const config = {
  server: cleanEnv(process.env, {
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