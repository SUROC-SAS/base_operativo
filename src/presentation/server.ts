import express from 'express';
import { envs } from '#/config';
import { createServer } from 'http';
import { AppRoutes } from './routes';
import { subscribeChannel } from './sockets';
import { Server as ServerIO, ServerOptions } from 'socket.io';

const { DOMAIN_ALLOWED } = envs;

interface Options {
  port?: number;
}

export class Server {
  private readonly port: number;
  public readonly express = express();
  public readonly httpServer = createServer(this.express);

  constructor(option: Options) {
    this.port = option?.port || 8080;
  }

  initSocket() {
    const options: Partial<ServerOptions> = {
      cors: {
        origin: DOMAIN_ALLOWED.split('|'),
      },
      path: '/socket',
    };

    const io = new ServerIO(this.httpServer, options);
    subscribeChannel(io);
  }

  async start() {
    this.initSocket();

    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(AppRoutes.routes);

    this.httpServer.listen(this.port, () => {
      console.log(`Server is running ${this.port}`);
    });
  }
}
