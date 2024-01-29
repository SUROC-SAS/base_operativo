import { handleError } from '../error';
import { AuthRepository } from '#/domain';
import { JWTAdapter } from '#/domain/interfaces';
import { CustomError } from '#/domain/errors/custom.error';
import { Response, NextFunction } from 'express-serve-static-core';
import { AppRequest, AuthMiddlewares } from '#/infrastructure/interfaces';

export class AuthMiddleware implements AuthMiddlewares {
  constructor(
    private readonly jwtAdapter: JWTAdapter,
    private readonly authRepository: AuthRepository,
  ) {
  }

  isAuth = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.headers?.authorization) throw CustomError.unauthorized('No tienes acceso aquí');

      const token = req.headers.authorization ? req.headers.authorization.split(' ').pop() : null;
      if (!token) throw CustomError.unauthorized('No tienes acceso aquí');

      const decoded = this.jwtAdapter.verify(token);
      const user = await this.authRepository.authWithToken(decoded);
      if (!user) throw CustomError.unauthorized('No tienes acceso aquí');

      req.user = user;
      next();
    } catch (error) {
      handleError(error, res);
    }
  };
}