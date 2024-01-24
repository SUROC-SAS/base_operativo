import { Router } from "express";
import { UserController } from "./controller";
import { UidAdapter } from "#/config/adapters/uid.adapter";
import { JwtAdapter } from "#/config/adapters/jwt.adapter";
import { MomentAdapter } from "#/config/adapters/moment.adapter";
import { UserDataSourceImpl } from "#/infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "#/infrastructure/repositories/user.repository.impl";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const uidAdapter = new UidAdapter();
    const momentAdapter = new MomentAdapter();
    const jwtAdapter = new JwtAdapter();
    const database = new UserDataSourceImpl(uidAdapter, momentAdapter, jwtAdapter);
    const repository = new UserRepositoryImpl(database);
    const controller = new UserController(repository);

    router.post('/', controller.createUser);
    router.post('/auth', controller.auth);
    return router;
  }
}