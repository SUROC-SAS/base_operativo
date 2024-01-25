import { Address } from '#/domain/interfaces';
import { CustomError } from '#/domain/errors/custom.error';

export const AddressMapper = (model: Record<string, any>): Address => {
  const { id, address, stateId, countryId, stateName, postalCode, municipalityId } = model;

  if (!id) {
    throw CustomError.badRequest('Address id is required');
  }

  return {
    id,
    address,
    stateId,
    countryId,
    stateName,
    postalCode,
    municipalityId,
  };
};
