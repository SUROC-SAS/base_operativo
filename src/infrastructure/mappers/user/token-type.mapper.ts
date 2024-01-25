import { TokenType } from '#/domain/interfaces';
import { CustomError } from '#/domain/errors/custom.error';

export const TokenTypeMapper = (model: Record<string, any>): TokenType => {
  const { id, code, name } = model;

  if (!id) {
    throw CustomError.badRequest('Token Type Information id is required');
  }

  return {
    id,
    code,
    name,
  };
};
