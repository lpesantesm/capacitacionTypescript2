export interface ServerInterface {
  routes(): void;
  middlewares(): void;
  config(): void;
  listen(): void;
}