import { TransactionAdapter } from "#/config/transaction";
import { sequelize } from "#/data/postgreSQL";
import User from "#/data/postgreSQL/models/User.model";
import { UserDataSource } from "#/domain";
import { CreateUserDto } from "#/domain/dtos";
import { CustomError } from "#/domain/errors/custom.error";
import { UserMapper, UserMapperModel } from "../mappers";

export class UserDataSourceImpl implements UserDataSource {
  async createUser(createUserDto: CreateUserDto): Promise<UserMapperModel> {
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

      await transactionAdapter.rollback(transaction);
      return UserMapper(user);
    } catch (error) {
      console.log(error);
      await transactionAdapter.rollback(transaction);
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internal();
    }
  }


  createPersonalInformation(createPersonalInformationDto: any, transaction: TransactionAdapter): Promise<any> {
    throw new Error("Method not implemented.");
  }
}