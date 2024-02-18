import { envs } from '#/config';
import { Router } from 'express';
import { UserController } from './controller';
import EmailService from '../services/email/email.service';
import { UidAdapter } from '#/config/adapters/uid.adapter';
import { MomentAdapter } from '#/config/adapters/moment.adapter';
import { BcryptAdapter } from '#/config/adapters/bcrypt.adapter';
import { UserDataSourceImpl } from '#/infrastructure/datasources/user.datasource.impl';
import { UserRepositoryImpl } from '#/infrastructure/repositories/user.repository.impl';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthDataSourceImpl } from '#/infrastructure/datasources/auth.datasource.impl';
import { JwtAdapter } from '#/config/adapters/jwt.adapter';
import { AuthRepositoryImpl } from '#/infrastructure/repositories/auth.repository.impl';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = envs;

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const jwtAdapter = new JwtAdapter();
    const uidAdapter = new UidAdapter();
    const momentAdapter = new MomentAdapter();
    const bcryptAdapter = new BcryptAdapter();

    const emailService = new EmailService({ host: SMTP_HOST, port: SMTP_PORT, user: SMTP_USER, pass: SMTP_PASSWORD });
    const database = new UserDataSourceImpl(emailService, uidAdapter, momentAdapter, bcryptAdapter);
    const repository = new UserRepositoryImpl(database);

    const authRepositoryDataSource = new AuthDataSourceImpl(jwtAdapter, bcryptAdapter);
    const authRepository = new AuthRepositoryImpl(authRepositoryDataSource);
    const authMiddleware = new AuthMiddleware(jwtAdapter, authRepository);

    const controller = new UserController(repository);
    router.post('/', controller.createUser);
    router.post('/update', [authMiddleware.isAuth], controller.updateUser);
    return router;
  }
}
