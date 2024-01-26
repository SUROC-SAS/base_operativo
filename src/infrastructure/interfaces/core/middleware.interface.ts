import { User } from '#/domain/interfaces';
import { Response, NextFunction, Request } from 'express-serve-static-core';

export type AppRequest = Request & {
  user: User;
  params?: { [k: string]: unknown };
  query?: { [k: string]: unknown };
};

export interface AuthMiddlewares {
  isAuth(req: AppRequest, res: Response, next: NextFunction): Promise<void>
}
