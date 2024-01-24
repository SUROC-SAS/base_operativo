import { User } from "#/domain/interfaces";
import { CustomError } from "#/domain/errors/custom.error";

export const UserMapper = (model: Record<string, any>): User => {
  const { id, email } = model;
  if (!id) {
    throw CustomError.badRequest("User id is required");
  }

  if (!email) {
    throw CustomError.badRequest("User email is required");
  }

  return {
    id,
    email,
  };
};