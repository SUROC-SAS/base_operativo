import { Router } from 'express';
import { UserRoutes } from './user/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/user', UserRoutes.routes);
    return router;
  }
}
