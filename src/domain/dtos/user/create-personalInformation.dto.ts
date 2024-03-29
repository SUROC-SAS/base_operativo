import { GENERATOR, Validator } from '#/config/adapters/validator';

interface Constructor {
  dv?: number;
  firstName?: string;
  middleName?: string;
  firstSurname?: string;
  secondSurname?: string;
  businessName?: string;
  documentNumber: number;
  identificationId: number;
  taxLiabilityId?: number;
  personTypeId?: number;
}

export class CreatePersonalInformationDto {
  dv: Constructor['dv'];
  firstName: Constructor['firstName'];
  middleName: Constructor['middleName'];
  firstSurname: Constructor['firstSurname'];
  secondSurname: Constructor['secondSurname'];
  businessName: Constructor['businessName'];
  documentNumber: Constructor['documentNumber'];
  personTypeId: Constructor['personTypeId'];
  taxLiabilityId: Constructor['taxLiabilityId'];
  identificationId: Constructor['identificationId'];

  private constructor({
    dv,
    firstName,
    middleName,
    firstSurname,
    businessName,
    secondSurname,
    documentNumber,
    personTypeId,
    taxLiabilityId,
    identificationId,
  }: Constructor) {
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

  static create(object: Record<string, unknown>): [string?, CreatePersonalInformationDto?] {
    const [error, response] = Validator.validateObject<CreatePersonalInformationDto>(this.getSchema(), object);
    if (error) {
      return [error];
    }

    const {
      dv,
      firstName,
      middleName,
      firstSurname,
      secondSurname,
      businessName,
      documentNumber,
      personTypeId,
      taxLiabilityId,
      identificationId,
    } = response!;
    const dto = new CreatePersonalInformationDto({
      dv,
      firstName,
      middleName,
      firstSurname,
      secondSurname,
      businessName,
      documentNumber,
      personTypeId,
      taxLiabilityId,
      identificationId,
    });

    return [undefined, dto];
  }

  static getSchema(): Record<string, unknown> {
    return {
      dv: GENERATOR.number().optional().nullable(),
      firstName: GENERATOR.string().trim().optional().nullable(),
      middleName: GENERATOR.string().trim().optional().nullable(),
      personTypeId: GENERATOR.number().optional().nullable(),
      firstSurname: GENERATOR.string().trim().optional().nullable(),
      secondSurname: GENERATOR.string().trim().optional().nullable(),
      documentNumber: GENERATOR.number().required(),
      identificationId: GENERATOR.number().required(),
      businessName: GENERATOR.string().trim().optional().nullable(),
      taxLiabilityId: GENERATOR.number().optional().nullable(),
    };
  }
}
