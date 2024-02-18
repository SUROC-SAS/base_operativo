import { handleError } from '../error';
import { AuthRepository } from '#/domain';
import { JWTAdapter } from '#/domain/interfaces';
import { CustomError } from '#/domain/errors/custom.error';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { AppRequest } from '#/infrastructure/interfaces';

export class AuthMiddleware {
  constructor(
    private readonly jwtAdapter: JWTAdapter,
    private readonly authRepository: AuthRepository
  ) { }

  isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'No token provided' });
    if (!authorization.startsWith('Bearer')) return res.status(401).json({ error: 'Invalid token' });
    const token = authorization.split(' ').at(1) || '';

    try {
      if (!token) throw CustomError.unauthorized('No tienes acceso aquí');
      const decoded = this.jwtAdapter.verify(token);
      const user = await this.authRepository.authWithToken(decoded);
      if (!user) throw CustomError.unauthorized('No tienes acceso aquí');

      (req as AppRequest).user = user;
      next();
    } catch (error) {
      handleError(error, res);
    }
  };
}
