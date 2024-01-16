import { CustomError } from "#/domain/errors/custom.error";

export interface PersonalInformationMapperModel {
  id: number;
  firstName?: string;
  middleName?: string;
  firstSurname?: string;
  secondSurname?: string;
  businessName?: string;
  documentNumber: number;
  dv?: number;
  identificationId: number;
  taxLiabilityId: number;
  personTypeId: number;
};

export const PersonalInformationMapper = (model: Record<string, any>): PersonalInformationMapperModel => {
  const {
    id,
    firstName,
    middleName,
    firstSurname,
    secondSurname,
    businessName,
    documentNumber,
    dv,
    identificationId,
    taxLiabilityId,
    personTypeId,
  } = model;

  if (!id) {
    throw CustomError.badRequest("PersonalInformation id is required");
  }

  return {
    id,
    firstName,
    middleName,
    firstSurname,
    secondSurname,
    businessName,
    documentNumber,
    dv,
    identificationId,
    taxLiabilityId,
    personTypeId,
  };
};