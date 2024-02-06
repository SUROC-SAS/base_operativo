import { CustomError } from '#/domain/errors/custom.error';
import { AddressEntity } from '#/domain/entities/user/address.entity';

export const AddressMapper = (model: Record<string, any>): AddressEntity => {
  const { id, address, stateId, countryId, stateName, postalCode, municipalityId } = model;

  if (!id) {
    throw CustomError.badRequest('Address id is required');
  }

  return new AddressEntity({
    id,
    address,
    stateId,
    countryId,
    stateName,
    postalCode,
    municipalityId,
  });
};
