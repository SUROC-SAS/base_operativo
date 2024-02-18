import { CustomError } from '#/domain/errors/custom.error';
import { RoleEntity } from '#/domain/entities/user';

export const RoleMapper = (model: Record<string, any>): RoleEntity => {
  const { id, name, code } = model;
  if (!id) {
    throw CustomError.badRequest('User id is required');
  }

  if (!name) {
    throw CustomError.badRequest('Role name is required');
  }

  if (!code) {
    throw CustomError.badRequest('Role code is required');
  }

  return new RoleEntity(id, name, code);
};
