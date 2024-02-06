import { CustomError } from '#/domain/errors/custom.error';
import { PersonalInformationEntity } from '#/domain/entities/user/personal-information.entity';

export const PersonalInformationMapper = (model: Record<string, any>): PersonalInformationEntity => {
  const {
    id,
    dv,
    firstName,
    middleName,
    firstSurname,
    secondSurname,
    businessName,
    personTypeId,
    documentNumber,
    taxLiabilityId,
    identificationId,
  } = model;

  if (!id) {
    throw CustomError.badRequest('User id is required');
  }

  return new PersonalInformationEntity({
    id,
    dv,
    firstName,
    middleName,
    firstSurname,
    secondSurname,
    businessName,
    personTypeId,
    documentNumber,
    taxLiabilityId,
    identificationId,
  });
};
