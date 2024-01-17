import { TransactionAdapter } from "#/config/transaction";
import { UserMapperModel } from "#/infrastructure/mappers";
import { CreateAddressDto } from "../dtos/user/create-address.dto";
import { CreatePersonalInformationDto, CreateUserDto } from "../dtos";
import { AddressMapperModel } from "#/infrastructure/mappers/user/address.mapper";
import { CreateContactInformationDto } from "../dtos/user/create-contact-information.dto";
import { ContactInformationMapperModel } from "#/infrastructure/mappers/user/contact-information.mapper";
import { PersonalInformationMapperModel } from "#/infrastructure/mappers/user/personal-information.mapper";

interface createdUserResult {
  user: UserMapperModel,
  transactionAdapter: TransactionAdapter
}

export abstract class UserRepository {
  abstract createUser(createUserDto: CreateUserDto): Promise<any>;
  abstract createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<PersonalInformationMapperModel>;
  abstract createContactInformation(createPersonalInformationDto: CreateContactInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<ContactInformationMapperModel>;
  abstract createAddress(createPersonalInformationDto: CreateAddressDto, userId: number, transactionAdapter: TransactionAdapter): Promise<AddressMapperModel>;
}