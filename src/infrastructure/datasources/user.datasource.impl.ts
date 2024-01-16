import { UserMapper } from "../mappers";
import { UserDataSource } from "#/domain";
import { sequelize } from "#/data/postgreSQL";
import User from "#/data/postgreSQL/models/User.model";
import { TransactionAdapter } from "#/config/transaction";
import { CustomError } from "#/domain/errors/custom.error";
import { CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";
import PersonalInformation from "#/data/postgreSQL/models/PersonalInformation.model";
import { PersonalInformationMapper } from "../mappers/user/personal-information.mapper";

export class UserDataSourceImpl implements UserDataSource {
  async createUser(createUserDto: CreateUserDto): Promise<any> {
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

      await transactionAdapter.commit(transaction);

      return { user: UserMapper(user), transactionAdapter: transactionAdapter };
    } catch (error) {
      console.log(error);
      await transactionAdapter.rollback(transaction);
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internal();
    }
  }


  async createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<any> {
    try {
      const personalInformation = await PersonalInformation.create({
        firstName: createPersonalInformationDto.firstName,
        middleName: createPersonalInformationDto.middleName,
        firstSurname: createPersonalInformationDto.firstSurname,
        secondSurname: createPersonalInformationDto.secondSurname,
        businessName: createPersonalInformationDto.businessName,
        documentNumber: createPersonalInformationDto.documentNumber,
        dv: createPersonalInformationDto.dv,
        documentTypeId: createPersonalInformationDto.documentTypeId,
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
}