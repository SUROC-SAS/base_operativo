import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  firstName?: string;
  middleName?: string;
  firstSurname?: string;
  secondSurname?: string;
  businessName?: string;
  documentNumber: number;
  dv?: number;
  documentTypeId: number;
  taxLiabilityId: number;
  personTypeId: number;
}

export class CreatePersonalInformationDto {
  firstName: Constructor['firstName'];
  middleName: Constructor['middleName'];
  firstSurname: Constructor['firstSurname'];
  secondSurname: Constructor['secondSurname'];
  businessName: Constructor['businessName'];
  documentNumber: Constructor['documentNumber'];
  dv: Constructor['dv'];
  documentTypeId: Constructor['documentTypeId'];
  taxLiabilityId: Constructor['taxLiabilityId'];
  personTypeId: Constructor['personTypeId'];

  private constructor({
    firstName,
    middleName,
    firstSurname,
    secondSurname,
    businessName,
    documentNumber,
    dv,
    documentTypeId,
    taxLiabilityId,
    personTypeId,
  }: Constructor) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.firstSurname = firstSurname;
    this.secondSurname = secondSurname;
    this.businessName = businessName;
    this.documentNumber = documentNumber;
    this.dv = dv;
    this.documentTypeId = documentTypeId;
    this.taxLiabilityId = taxLiabilityId;
    this.personTypeId = personTypeId;
  }

  static create(object: Record<string, unknown>): [string?, CreatePersonalInformationDto?] {
    const [error, response] = Validator.validateObject<CreatePersonalInformationDto>(this.getSchema(), object);
    if (error) {
      return [error];
    }

    return [undefined, new CreatePersonalInformationDto(response as Constructor)];
  }

  static getSchema(): Record<string, unknown> {
    return {
      firstName: GENERATOR.string().trim().nullable().default(null),
      middleName: GENERATOR.string().trim().nullable().default(null),
      personTypeId: GENERATOR.number().nullable().default(null),
      firstSurname: GENERATOR.string().trim().nullable().default(null),
      secondSurname: GENERATOR.string().trim().nullable().default(null),
      documentNumber: GENERATOR.number().nullable().default(null),
      documentTypeId: GENERATOR.number().nullable().default(null),
      businessName: GENERATOR.string().trim().nullable().default(null),
      dv: GENERATOR.number().nullable().default(null),
      taxLiabilityId: GENERATOR.number().nullable().default(null),
    }
  }
}