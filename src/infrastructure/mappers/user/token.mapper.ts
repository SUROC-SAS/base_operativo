import { Token } from '#/domain/interfaces';
import { CustomError } from '#/domain/errors/custom.error';

export const TokenMapper = (model: Record<string, any>): Token => {
  const { id, used, token, userId, expire, tokenTypeId } = model;

  if (!id) {
    throw CustomError.badRequest('Token id is required');
  }

  return {
    id,
    used,
    token,
    expire,
    userId,
    tokenTypeId,
  };
};
