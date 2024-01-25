import { CustomError } from '#/domain/errors/custom.error';
import { PersonalInformation } from '#/domain/interfaces/user/personalInformation';

export const PersonalInformationMapper = (model: Record<string, any>): PersonalInformation => {
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

  return {
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
  };
};
