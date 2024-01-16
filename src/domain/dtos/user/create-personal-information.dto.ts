import { GENERATOR, Validator } from '#/config/validator';
import { IdentificationCodes, UserRepository } from '#/domain';
import { CustomError } from '#/domain/errors/custom.error';

interface Constructor {
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
}

export class CreatePersonalInformationDto {
  firstName: Constructor['firstName'];
  middleName: Constructor['middleName'];
  firstSurname: Constructor['firstSurname'];
  secondSurname: Constructor['secondSurname'];
  businessName: Constructor['businessName'];
  documentNumber: Constructor['documentNumber'];
  dv: Constructor['dv'];
  identificationId: Constructor['identificationId'];
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
    identificationId,
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
    this.identificationId = identificationId;
    this.taxLiabilityId = taxLiabilityId;
    this.personTypeId = personTypeId;
  }

  static async create(object: Record<string, unknown>, userRepository: UserRepository): Promise<[string?, CreatePersonalInformationDto?]> {
    const identification = await userRepository.getIdentificationById(object.identificationId as number);
    const code = identification.code as IdentificationCodes

    if (
      [
        IdentificationCodes.NIT,
        IdentificationCodes.CEDULA,
        IdentificationCodes.REGISTRO_CIVIL,
        IdentificationCodes.TARJETA_IDENTIDAD,
      ].includes(code)
    ) {

      const [error, response] = Validator.validateObject<CreatePersonalInformationDto>(
        IdentificationCodes.NIT === code ? this.getSchemaNitNational() : this.getSchemaNational(),
        object
      );

      if (error) {
        return [error];
      }

      const {
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
      } = response!;

      const exist = await userRepository.validateExistence(documentNumber, identificationId);

      if (exist) {
        return [CustomError.badRequest('Usuario con este numero de documento ya registrado.')];
      }

      return [undefined, new CreatePersonalInformationDto({
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
      })];
    }

    const [error, response] = Validator.validateObject<CreatePersonalInformationDto>(
      this.getSchemaNitForeign(),
      object
    );

    if (error) {
      return [error];
    }

    const {
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
    } = response!;

    const exist = await userRepository.validateExistence(documentNumber, identificationId);

    if (exist) {
      return [CustomError.badRequest('Usuario con este numero de documento ya registrado.')];
    }

    return [undefined, new CreatePersonalInformationDto({
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
    })];
  }

  static getSchemaNational = (): Record<string, unknown> => ({
    firstName: GENERATOR.string().trim().required(),
    middleName: GENERATOR.string().trim(),
    personTypeId: GENERATOR.number().required(),
    firstSurname: GENERATOR.string().trim().required(),
    secondSurname: GENERATOR.string().trim(),
    documentNumber: GENERATOR.number().required(),
    identificartionId: GENERATOR.number().required(),
  });

  static getSchemaNitForeign = (): Record<string, unknown> => ({
    businessName: GENERATOR.string().trim().required(),
    documentNumber: GENERATOR.number().required(),
    identificartionId: GENERATOR.number().required(),
  });

  static getSchemaNitNational = (): Record<string, unknown> => ({
    ...this.getSchemaNitForeign(),
    dv: GENERATOR.number().required(),
    personTypeId: GENERATOR.number().required(),
    taxLiabilityId: GENERATOR.number().required(),
  });
}