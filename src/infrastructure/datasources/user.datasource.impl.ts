import { UserMapper } from "../mappers";
import { UserDataSource } from "#/domain";
import { sequelize } from "#/data/postgreSQL";
import User from "#/data/postgreSQL/models/User.model";
import { TransactionAdapter } from "#/config/transaction";
import { CustomError } from "#/domain/errors/custom.error";
import PersonType from "#/data/postgreSQL/models/PersonType.model";
import { CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";
import PersonalInformation from "#/data/postgreSQL/models/PersonalInformation.model";
import { PersonalInformationMapper } from "../mappers/user/personal-information.mapper";
import { PersonTypeMapper, PersonTypeMapperModel } from "../mappers/user/person-type.mapper";
import { IdentificationMapper, IdentificationMapperModel } from "../mappers/user/Identification.mapper";
import { TaxLiabilityMapper, TaxLiabilityMapperModel } from "../mappers/user/tax-liability.mapper";
import { Op } from "sequelize";

export class UserDataSourceImpl implements UserDataSource {
  async createUser(createUserDto: CreateUserDto) {
    const transactionAdapter = new TransactionAdapter(sequelize);
    const transaction = await transactionAdapter.startTransaction();

    try {
      const user = await User.create({
        email: createUserDto.email,
        active: createUserDto.active,
        password: createUserDto.password,
        lastAccess: createUserDto.lastAccess,
        emailValidate: createUserDto.emailValidate,
      }, { transaction });

      return { user: UserMapper(user), transactionAdapter, transaction };
    } catch (error) {
      console.log(error);
      await transactionAdapter.rollback(transaction);
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internal();
    }
  }


  async createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transactionAdapter: TransactionAdapter) {
    try {
      const personalInformation = await PersonalInformation.create({
        firstName: createPersonalInformationDto.firstName,
        middleName: createPersonalInformationDto.middleName,
        firstSurname: createPersonalInformationDto.firstSurname,
        secondSurname: createPersonalInformationDto.secondSurname,
        businessName: createPersonalInformationDto.businessName,
        documentNumber: createPersonalInformationDto.documentNumber,
        dv: createPersonalInformationDto.dv,
        identificationId: createPersonalInformationDto.identificationId,
        taxLiabilityId: createPersonalInformationDto.taxLiabilityId,
        personTypeId: createPersonalInformationDto.personTypeId,
        userId
      }, { transaction: transactionAdapter.transaction });

      return PersonalInformationMapper(personalInformation);

    } catch (error) {
      console.log(error);
      await transactionAdapter.rollback(transactionAdapter.transaction);
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internal();
    }
  }

  async getPersonTypeById(id: number): Promise<PersonTypeMapperModel> {
    const personType = await PersonType.findByPk(id);

    if (!personType) throw CustomError.notFound('Tipo de persona no encontrado.')

    return PersonTypeMapper(personType!);
  }

  async getTaxLiabilityById(id: number): Promise<TaxLiabilityMapperModel> {
    const taxLiability = await PersonType.findByPk(id);

    if (!taxLiability) throw CustomError.notFound('Obligaciones de impuesto no encontrado.')

    return TaxLiabilityMapper(taxLiability!);
  }

  async getIdentificationById(id: number): Promise<IdentificationMapperModel> {
    const identification = await PersonType.findByPk(id);

    if (!identification) throw CustomError.notFound('Tipo de documento no encontrado.')

    return IdentificationMapper(identification!);
  }

  async validateExistence(documentNumber: number, identificationId: number, userId?: number): Promise<boolean> {
    const personalInformation = await PersonalInformation.findOne({
      where: {
        documentNumber,
        identificationId,
        ...(userId
          ? {
            userId: {
              [Op.ne]: userId,
            },
          }
          : {}),
      },
    });

    return !!personalInformation;
  }
}