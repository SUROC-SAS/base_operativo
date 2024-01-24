import { Router } from "express";
import { envs } from "#/config";
import { UserController } from "./controller";
import { UidAdapter } from "#/config/adapters/uid.adapter";
import EmailService from "#/presentation/services/mail.service";
import { MomentAdapter } from "#/config/adapters/moment.adapter";
import { UserDataSourceImpl } from "#/infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "#/infrastructure/repositories/user.repository.impl";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const { SMTP_HOST, PORT, SMTP_USER, SMTP_PASSWORD } = envs

    const uidAdapter = new UidAdapter();
    const momentAdapter = new MomentAdapter();
    const database = new UserDataSourceImpl(uidAdapter, momentAdapter);
    const repository = new UserRepositoryImpl(database);
    const emailService = new EmailService({ host: SMTP_HOST, port: PORT, user: SMTP_USER, pass: SMTP_PASSWORD });
    const controller = new UserController(repository, emailService);

    router.post('/', controller.createUser);
    return router;
  }
}