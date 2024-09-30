import express from 'express';
import { config } from './config/server';
import helmet from 'helmet';
import cors from "cors";
import { UserRoutes } from './modules/user/routes/user.routes';
import { ServerInterface } from './shared/interfaces/server.interface';
import morgan from 'morgan';
import { jwtMiddleware } from './shared/middleware/jwt.middleware';
import { DataBaseConfig } from './config/baseConfig';
import { MovieRoutes } from './modules/movie/routes/movie.routes';



class Server implements ServerInterface {
  public app!: express.Application;
  private host!: string;
  private port!: number;
  private paths = {
    user: '/user',
    movie: '/movie'
  }

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.config();
  }

  routes() {
    this.app.use(this.paths.user, UserRoutes.routes);
    this.app.use(this.paths.movie, MovieRoutes.routes);
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('combined'));
    this.app.use(express.json());
    this.app.use(jwtMiddleware);
  }

  config() {
    this.port = config.server.PORT;
    this.host = config.server.HOST;
    DataBaseConfig.connect();
  }


  listen() {
    this.app.listen(this.port, this.host, () => {
      console.log(`Servidor levantado en ${this.host}:${this.port}`);
    });
  }
}


const servidor = new Server()
servidor.listen();

