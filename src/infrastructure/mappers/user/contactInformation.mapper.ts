import { ContactInformation } from "#/domain/interfaces";
import { CustomError } from "#/domain/errors/custom.error";

export const ContactInformationMapper = (model: Record<string, any>): ContactInformation => {
  const {
    id,
    mobile,
    phoneOne,
    phoneTwo,
  } = model;

  if (!id) {
    throw CustomError.badRequest("Contact Information id is required");
  }

  return {
    id,
    mobile,
    phoneOne,
    phoneTwo,
  };
};