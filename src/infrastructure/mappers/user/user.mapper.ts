import { CustomError } from '#/domain/errors/custom.error';
import { UserEntity } from '#/domain/entities/user/user.entity';

export const UserMapper = (model: Record<string, any>): UserEntity => {
  const { id, uid, email } = model;
  if (!id) {
    throw CustomError.badRequest('User id is required');
  }

  if (!email) {
    throw CustomError.badRequest('User email is required');
  }

  return new UserEntity(id, uid, email);
};
