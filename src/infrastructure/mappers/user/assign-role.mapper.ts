import { CustomError } from '#/domain/errors/custom.error';
import { AssignRoleEntity } from '#/domain/entities/user/assign-role.entity';

export const AssignRoleMapper = (model: Record<string, unknown>): AssignRoleEntity => {
  const { id, userId, roleId } = model;

  if (!id || typeof id !== 'number') {
    throw CustomError.badRequest('Id is required');
  }

  if (!userId || typeof userId !== 'number') {
    throw CustomError.badRequest('User id is required');
  }

  if (!roleId || typeof roleId !== 'number') {
    throw CustomError.badRequest('Role id is required');
  }

  return new AssignRoleEntity(id, userId, roleId);
};
