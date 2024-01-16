import { CustomError } from "#/domain/errors/custom.error";

export interface IdentificationMapperModel {
  id: number;
  code: string;
  name: string;
};

export const IdentificationMapper = (model: Record<string, any>): IdentificationMapperModel => {
  const { id, code, name } = model;
  if (!id) {
    throw CustomError.badRequest("Identification id is required");
  }

  if (!code) {
    throw CustomError.badRequest("Identification code is required");
  }

  if (!name) {
    throw CustomError.badRequest("Identification name is required");
  }

  return {
    id,
    code,
    name,
  };
};