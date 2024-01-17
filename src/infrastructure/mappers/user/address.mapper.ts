import { CustomError } from "#/domain/errors/custom.error";

export interface AddressMapperModel {
  id: number;
  address: string;
  countryId?: number;
  stateName?: string;
  postalCode?: number;
  municipalityId?: number;
};

export const AddressMapper = (model: Record<string, any>): AddressMapperModel => {
  const {
    id,
    address,
    stateName,
    countryId,
    postalCode,
    municipalityId,
  } = model;

  if (!id) {
    throw CustomError.badRequest("Address id is required");
  }

  return {
    id,
    address,
    stateName,
    countryId,
    postalCode,
    municipalityId,
  };
};