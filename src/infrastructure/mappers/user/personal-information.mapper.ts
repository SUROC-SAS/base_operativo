import { CustomError } from "#/domain/errors/custom.error";

export interface PersonalInformationMapperModel {
  id: number;
  dv?: number;
  firstName?: string;
  middleName?: string;
  personTypeId: number;
  businessName?: string;
  firstSurname?: string;
  secondSurname?: string;
  documentNumber: number;
  taxLiabilityId: number;
  identificationId: number;
};

export const PersonalInformationMapper = (model: Record<string, any>): PersonalInformationMapperModel => {
  const {
    id,
    dv,
    firstName,
    middleName,
    businessName,
    firstSurname,
    personTypeId,
    secondSurname,
    taxLiabilityId,
    documentNumber,
    identificationId,
  } = model;

  if (!id) {
    throw CustomError.badRequest("PersonalInformation id is required");
  }

  return {
    id,
    dv,
    firstName,
    middleName,
    firstSurname,
    personTypeId,
    businessName,
    secondSurname,
    taxLiabilityId,
    documentNumber,
    identificationId,
  };
};