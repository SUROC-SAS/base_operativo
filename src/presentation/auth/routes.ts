import { Router } from 'express';
import { AuthController } from './controller';
import { JwtAdapter } from '#/config/adapters/jwt.adapter';
import { BcryptAdapter } from '#/config/adapters/bcrypt.adapter';
import { AuthDataSourceImpl } from '#/infrastructure/datasources/auth.datasource.impl';
import { AuthRepositoryImpl } from '#/infrastructure/repositories/auth.repository.impl';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const jwtAdapter = new JwtAdapter();
    const bcryptAdapter = new BcryptAdapter();
    const database = new AuthDataSourceImpl(jwtAdapter, bcryptAdapter);
    const repository = new AuthRepositoryImpl(database);
    const controller = new AuthController(repository);

    router.post('/auth', controller.auth);
    return router;
  }
}
