import { UserDataSourceImpl } from "#/infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "#/infrastructure/repositories/user.repository.impl";
import { Router } from "express";
import { UserController } from "./controller";
import EmailService from "#/presentation/services/mail.service";
import { envs } from "#/config";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const { SMTP_HOST, PORT, SMTP_USER, SMTP_PASSWORD } = envs
    const database = new UserDataSourceImpl();
    const repository = new UserRepositoryImpl(database);
    const emailService = new EmailService({ host: SMTP_HOST, port: PORT, user: SMTP_USER, pass: SMTP_PASSWORD });
    const controller = new UserController(repository, emailService);

    router.post('/', controller.createUser);
    return router;
  }
}