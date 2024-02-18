import { UserEntity } from '#/domain/entities/user';
import { Request } from 'express-serve-static-core';

export type AppRequest = Request & {
  user: UserEntity;
  params?: { [k: string]: unknown };
  query?: { [k: string]: unknown };
};
