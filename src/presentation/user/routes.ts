import { Router } from "express";
import { UserController } from "./controller";
import { UidAdapter } from "#/config/adapters/uid.adapter";
import { MomentAdapter } from "#/config/adapters/moment.adapter";
import { UserDataSourceImpl } from "#/infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "#/infrastructure/repositories/user.repository.impl";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const database = new UserDataSourceImpl(new UidAdapter(), new MomentAdapter());
    const repository = new UserRepositoryImpl(database);
    const controller = new UserController(repository);

    router.post('/', controller.createUser);
    return router;
  }
}