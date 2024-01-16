import { CustomError } from "#/domain/errors/custom.error";

export interface PersonTypeMapperModel {
  id: number;
  code: string;
  name: string;
};

export const PersonTypeMapper = (model: Record<string, any>): PersonTypeMapperModel => {
  const { id, code, name } = model;
  if (!id) {
    throw CustomError.badRequest("PersonType id is required");
  }

  if (!code) {
    throw CustomError.badRequest("PersonType code is required");
  }

  if (!name) {
    throw CustomError.badRequest("PersonType name is required");
  }

  return {
    id,
    code,
    name,
  };
};