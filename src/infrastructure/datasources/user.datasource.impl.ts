import { UserMapper } from "../mappers";
import { UserDataSource } from "#/domain";
import { sequelize } from "#/data/postgreSQL";
import User from "#/data/postgreSQL/models/user.model";
import { TransactionAdapter } from "#/config/transaction";
import { CustomError } from "#/domain/errors/custom.error";
import { AddressMapperModel } from "../mappers/user/address.mapper";
import { CreateAddressDto } from "#/domain/dtos/user/create-address.dto";
import { CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";
import PersonalInformation from "#/data/postgreSQL/models/personal-information.model";
import { PersonalInformationMapper } from "../mappers/user/personal-information.mapper";
import { ContactInformationMapperModel } from "../mappers/user/contact-information.mapper";
import { CreateContactInformationDto } from "#/domain/dtos/user/create-contact-information.dto";

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

      return { user: UserMapper(user), transactionAdapter };

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

  createContactInformation(createPersonalInformationDto: CreateContactInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<ContactInformationMapperModel> {
    throw new Error("Method not implemented.");
  }
  createAddress(createPersonalInformationDto: CreateAddressDto, userId: number, transactionAdapter: TransactionAdapter): Promise<AddressMapperModel> {
    throw new Error("Method not implemented.");
  }
}