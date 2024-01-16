import { TransactionAdapter } from "#/config/transaction";
import { UserDataSource, UserRepository } from "#/domain";
import { CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) { }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return this.userDataSource.createUser(createUserDto);
  }

  async createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transaction: TransactionAdapter): Promise<any> {
    return this.userDataSource.createPersonalInformation(createPersonalInformationDto, userId, transaction);
  }
}