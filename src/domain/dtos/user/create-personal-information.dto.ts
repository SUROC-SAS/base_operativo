import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  dv?: number;
  firstName?: string;
  middleName?: string;
  personTypeId: number;
  firstSurname?: string;
  secondSurname?: string;
  businessName?: string;
  taxLiabilityId: number;
  documentNumber: number;
  identificationId: number;
}

export class CreatePersonalInformationDto {
  dv: Constructor['dv'];
  firstName: Constructor['firstName'];
  middleName: Constructor['middleName'];
  personTypeId: Constructor['personTypeId'];
  firstSurname: Constructor['firstSurname'];
  businessName: Constructor['businessName'];
  secondSurname: Constructor['secondSurname'];
  taxLiabilityId: Constructor['taxLiabilityId'];
  documentNumber: Constructor['documentNumber'];
  identificationId: Constructor['identificationId'];

  private constructor({
    dv,
    firstName,
    middleName,
    firstSurname,
    businessName,
    secondSurname,
    documentNumber,
    taxLiabilityId,
    identificationId,
    personTypeId,
  }: Constructor) {
    this.dv = dv;
    this.firstName = firstName;
    this.middleName = middleName;
    this.businessName = businessName;
    this.firstSurname = firstSurname;
    this.personTypeId = personTypeId;
    this.secondSurname = secondSurname;
    this.taxLiabilityId = taxLiabilityId;
    this.documentNumber = documentNumber;
    this.identificationId = identificationId;
  }

  static async create(object: Record<string, unknown>): Promise<[string?, CreatePersonalInformationDto?]> {
    const [error, response] = Validator.validateObject<CreatePersonalInformationDto>(this.getSchema(), object);

    if (error) {
      return [error];
    }

    const {
      dv,
      firstName,
      middleName,
      firstSurname,
      businessName,
      personTypeId,
      secondSurname,
      documentNumber,
      taxLiabilityId,
      identificationId,
    } = response!;

    return [undefined, new CreatePersonalInformationDto({
      dv,
      firstName,
      middleName,
      businessName,
      personTypeId,
      firstSurname,
      secondSurname,
      taxLiabilityId,
      documentNumber,
      identificationId,
    })];
  }

  static getSchema = (): Record<string, unknown> => ({
    dv: GENERATOR.number().nullable().default(null),
    personTypeId: GENERATOR.number().nullable().default(null),
    documentTypeId: GENERATOR.number().nullable().default(null),
    taxLiabilityId: GENERATOR.number().nullable().default(null),
    documentNumber: GENERATOR.number().nullable().default(null),
    firstName: GENERATOR.string().trim().nullable().default(null),
    middleName: GENERATOR.string().trim().nullable().default(null),
    businessName: GENERATOR.string().trim().nullable().default(null),
    firstSurname: GENERATOR.string().trim().nullable().default(null),
    secondSurname: GENERATOR.string().trim().nullable().default(null),
  });
}