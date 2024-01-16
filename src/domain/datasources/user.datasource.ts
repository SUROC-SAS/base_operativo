import { TransactionAdapter } from "#/config/transaction";
import { CreateUserDto } from "../dtos";

export abstract class UserDataSource {
  abstract createUser(createUserDto: CreateUserDto): Promise<any>;
  abstract createPersonalInformation(createPersonalInformationDto: any, transaction: TransactionAdapter): Promise<any>;
}