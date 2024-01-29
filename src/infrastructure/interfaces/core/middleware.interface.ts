import { User } from '#/domain/interfaces';
import { Request } from 'express-serve-static-core';

export type AppRequest = Request & {
  user: User;
  params?: { [k: string]: unknown };
  query?: { [k: string]: unknown };
};