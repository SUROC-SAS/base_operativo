import { CustomError } from '#/domain/errors/custom.error';
import { ContactInformationEntity } from '#/domain/entities/user/contact-information.entity';

export const ContactInformationMapper = (model: Record<string, any>): ContactInformationEntity => {
  const { id, mobile, phoneOne, phoneTwo } = model;

  if (!id) {
    throw CustomError.badRequest('Contact Information id is required');
  }

  return new ContactInformationEntity(id, mobile, phoneOne, phoneTwo);
};
