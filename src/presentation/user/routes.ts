import { UserDataSourceImpl } from "#/infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "#/infrastructure/repositories/user.repository.impl";
import { Router } from "express";
import { UserController } from "./controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const database = new UserDataSourceImpl();
    const repository = new UserRepositoryImpl(database);
    const controller = new UserController(repository);

    router.post('/', controller.createUser);
    return router;
  }
}