import { CustomError } from "#/domain/errors/custom.error";

export interface UserMapperModel {
  id: number;
  email: string;
};

export const UserMapper = (model: Record<string, any>): UserMapperModel => {
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