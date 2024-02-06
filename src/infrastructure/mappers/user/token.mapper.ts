import { CustomError } from '#/domain/errors/custom.error';
import { TokenEntity } from '#/domain/entities/user/token.entity';

export const TokenMapper = (model: Record<string, any>): TokenEntity => {
  const { id, used, token, userId, expire, tokenTypeId } = model;
  if (!id || typeof id !== 'number') {
    throw CustomError.badRequest('Token id is required');
  }

  if ([null, undefined].includes(used) || typeof used !== 'boolean') {
    throw CustomError.badRequest('Token used is required');
  }

  if (!token || typeof token !== 'string') {
    throw CustomError.badRequest('Token is required');
  }

  if (!userId || typeof userId !== 'number') {
    throw CustomError.badRequest('User id is required');
  }

  if (!expire || !(expire instanceof Date)) {
    throw CustomError.badRequest('Token expire is required');
  }

  if (!tokenTypeId || typeof tokenTypeId !== 'number') {
    throw CustomError.badRequest('Token type id is required');
  }

  return new TokenEntity(id, used, token, expire, userId, tokenTypeId);
};
