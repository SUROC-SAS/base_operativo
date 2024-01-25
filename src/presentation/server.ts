import express from 'express';
import { AppRoutes } from './routes';

interface Options {
  port?: number;
}

export class Server {
  public readonly app = express();
  private readonly port: number;

  constructor(option: Options) {
    this.port = option?.port || 8080;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(AppRoutes.routes);

    this.app.listen(this.port, () => {
      console.log(`Server is running ${this.port}`);
    });
  }
}
