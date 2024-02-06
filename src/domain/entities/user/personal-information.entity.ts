import { CreatePersonalInformationDto } from '#/domain/dtos';
import { CustomError } from '#/domain/errors/custom.error';
import { Identifications } from '#/domain/interfaces';

type Constructor = {
  id: number;
  dv?: number;
  firstName?: string;
  middleName?: string;
  firstSurname?: string;
  secondSurname?: string;
  businessName?: string;
  documentNumber: number;
  identificationId: number;
  taxLiabilityId: number;
  personTypeId: number;
}

export class PersonalInformationEntity {
  id: number;
  dv?: number;
  firstName?: string;
  middleName?: string;
  firstSurname?: string;
  secondSurname?: string;
  businessName?: string;
  documentNumber: number;
  personTypeId: number;
  taxLiabilityId: number;
  identificationId: number;

  constructor({
    id,
    dv,
    firstName,
    middleName,
    firstSurname,
    secondSurname,
    businessName,
    documentNumber,
    identificationId,
    taxLiabilityId,
    personTypeId,
  }: Constructor) {
    this.id = id;
    this.dv = dv;
    this.firstName = firstName;
    this.middleName = middleName;
    this.firstSurname = firstSurname;
    this.secondSurname = secondSurname;
    this.businessName = businessName;
    this.documentNumber = documentNumber;
    this.identificationId = identificationId;
    this.taxLiabilityId = taxLiabilityId;
    this.personTypeId = personTypeId;
  }

  getFullName(): string {
    const { firstName, firstSurname, businessName } = this;
    if ((!firstName && !firstSurname) && !businessName) {
      throw CustomError.internal('User does not have personal information');
    }

    if (!businessName) {
      return `${firstName} ${firstSurname}`;
    }

    return businessName;
  }

  static validateDto(createPersonalInformationDto: CreatePersonalInformationDto, code: Identifications): string | null {
    const error: string[] = [];
    if (code === Identifications.NIT) {
      if (!createPersonalInformationDto.dv) error.push('Missing dv');
      if (!createPersonalInformationDto.businessName) error.push('Missing businessName');
      if (!createPersonalInformationDto.personTypeId) error.push('Missing personTypeId');
      if (!createPersonalInformationDto.taxLiabilityId) error.push('Missing taxLiabilityId');

      createPersonalInformationDto.firstName = undefined;
      createPersonalInformationDto.middleName = undefined;
      createPersonalInformationDto.firstSurname = undefined;
      createPersonalInformationDto.secondSurname = undefined;
    } else if (code === Identifications.NIT_PAIS) {
      if (!createPersonalInformationDto.businessName) error.push('Missing businessName');

      createPersonalInformationDto.dv = undefined;
      createPersonalInformationDto.firstName = undefined;
      createPersonalInformationDto.middleName = undefined;
      createPersonalInformationDto.firstSurname = undefined;
      createPersonalInformationDto.secondSurname = undefined;
      createPersonalInformationDto.personTypeId = undefined;
      createPersonalInformationDto.taxLiabilityId = undefined;
    } else {
      if (!createPersonalInformationDto.firstName) error.push('Missing firstName');
      if (!createPersonalInformationDto.firstSurname) error.push('Missing firstSurname');
      if (!createPersonalInformationDto.personTypeId) error.push('Missing personTypeId');

      createPersonalInformationDto.dv = undefined;
      createPersonalInformationDto.businessName = undefined;
      createPersonalInformationDto.taxLiabilityId = undefined;
    }

    if (error.length) {
      const message = new Intl.ListFormat('en').format(error);
      return message.toString();
    }

    return null;
  }
}