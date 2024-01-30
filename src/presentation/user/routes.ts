import { envs } from '#/config';
import { Router } from 'express';
import { UserController } from './controller';
import EmailService from '../services/email.service';
import { UidAdapter } from '#/config/adapters/uid.adapter';
import { MomentAdapter } from '#/config/adapters/moment.adapter';
import { BcryptAdapter } from '#/config/adapters/bcrypt.adapter';
import { UserDataSourceImpl } from '#/infrastructure/datasources/user.datasource.impl';
import { UserRepositoryImpl } from '#/infrastructure/repositories/user.repository.impl';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = envs;

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const uidAdapter = new UidAdapter();
    const momentAdapter = new MomentAdapter();
    const bcryptAdapter = new BcryptAdapter();
    const database = new UserDataSourceImpl(uidAdapter, momentAdapter, bcryptAdapter);
    const repository = new UserRepositoryImpl(database);
    const emailService = new EmailService({ host: SMTP_HOST, port: SMTP_PORT, user: SMTP_USER, pass: SMTP_PASSWORD });
    const controller = new UserController(repository, emailService);

    router.post('/', controller.createUser);
    router.put('/:id', controller.updateUser);
    return router;
  }
}
