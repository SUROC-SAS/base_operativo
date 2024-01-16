import { CustomError } from "#/domain/errors/custom.error";

export interface TaxLiabilityMapperModel {
  id: number;
  code: string;
  name: string;
};

export const TaxLiabilityMapper = (model: Record<string, any>): TaxLiabilityMapperModel => {
  const { id, code, name } = model;
  if (!id) {
    throw CustomError.badRequest("TaxLiability id is required");
  }

  if (!code) {
    throw CustomError.badRequest("TaxLiability code is required");
  }

  if (!name) {
    throw CustomError.badRequest("TaxLiability name is required");
  }

  return {
    id,
    code,
    name,
  };
};