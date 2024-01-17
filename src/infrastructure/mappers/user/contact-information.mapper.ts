import { CustomError } from "#/domain/errors/custom.error";

export interface ContactInformationMapperModel {
  id: number;
  mobile: number;
  phoneOne?: number;
  phoneTwo?: number;
};

export const ContactInformationMapper = (model: Record<string, any>): ContactInformationMapperModel => {
  const {
    id,
    mobile,
    phoneOne,
    phoneTwo,
  } = model;

  if (!id) {
    throw CustomError.badRequest("ContactInformation id is required");
  }

  return {
    id,
    mobile,
    phoneOne,
    phoneTwo,
  };
};