import { CreateUserDto } from "../dtos";
import { TransactionAdapter } from "#/config/transaction";
import { CreatePersonalInformationDto } from "../dtos/user/create-personal-information.dto";

export abstract class UserDataSource {
  abstract createUser(createUserDto: CreateUserDto): Promise<any>;
  abstract createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<any>;
}