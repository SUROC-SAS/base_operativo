import { TransactionAdapter } from "#/config/transaction";
import { CreatePersonalInformationDto, CreateUserDto } from "../dtos";

export abstract class UserRepository {
  abstract createUser(createUserDto: CreateUserDto): Promise<any>;
  abstract createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<any>;
}