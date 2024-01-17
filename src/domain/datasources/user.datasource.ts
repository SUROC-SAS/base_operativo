import { CreateUserDto } from "../dtos";
import { TransactionAdapter } from "#/config/transaction";
import { CreateAddressDto } from "../dtos/user/create-address.dto";
import { AddressMapperModel } from "#/infrastructure/mappers/user/address.mapper";
import { CreateContactInformationDto } from "../dtos/user/create-contact-information.dto";
import { CreatePersonalInformationDto } from "../dtos/user/create-personal-information.dto";
import { ContactInformationMapperModel } from "#/infrastructure/mappers/user/contact-information.mapper";
import { PersonalInformationMapperModel } from "#/infrastructure/mappers/user/personal-information.mapper";

export abstract class UserDataSource {
  abstract createUser(createUserDto: CreateUserDto): Promise<any>;
  abstract createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<PersonalInformationMapperModel>;
  abstract createContactInformation(createPersonalInformationDto: CreateContactInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<ContactInformationMapperModel>;
  abstract createAddress(createPersonalInformationDto: CreateAddressDto, userId: number, transactionAdapter: TransactionAdapter): Promise<AddressMapperModel>;
}