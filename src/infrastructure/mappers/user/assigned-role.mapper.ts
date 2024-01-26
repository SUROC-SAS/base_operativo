import { AssignedRole } from '#/domain/interfaces';
import { CustomError } from '#/domain/errors/custom.error';

export const AssignedRoleMapper = (model: Record<string, any>): AssignedRole => {
  const {
    id,
    userId,
    roleId,
  } = model;

  if (!id) {
    throw CustomError.badRequest('Assigned Role id is required');
  }

  if (!roleId) {
    throw CustomError.badRequest('Role id is required');
  }

  if (!userId) {
    throw CustomError.badRequest('User id is required');
  }

  return {
    id,
    userId,
    roleId,
  };
};