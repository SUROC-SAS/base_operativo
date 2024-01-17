import { TransactionAdapter } from "#/config/transaction";
import { UserDataSource, UserRepository } from "#/domain";
import { AddressMapperModel } from "../mappers/user/address.mapper";
import { CreateAddressDto } from "#/domain/dtos/user/create-address.dto";
import { CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";
import { ContactInformationMapperModel } from "../mappers/user/contact-information.mapper";
import { PersonalInformationMapperModel } from "../mappers/user/personal-information.mapper";
import { CreateContactInformationDto } from "#/domain/dtos/user/create-contact-information.dto";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) { }


  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return this.userDataSource.createUser(createUserDto);
  }

  async createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<PersonalInformationMapperModel> {
    return this.userDataSource.createPersonalInformation(createPersonalInformationDto, userId, transactionAdapter);
  }

  createContactInformation(createPersonalInformationDto: CreateContactInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<ContactInformationMapperModel> {
    return this.userDataSource.createContactInformation(createPersonalInformationDto, userId, transactionAdapter);
  }
  createAddress(createPersonalInformationDto: CreateAddressDto, userId: number, transactionAdapter: TransactionAdapter): Promise<AddressMapperModel> {
    return this.userDataSource.createAddress(createPersonalInformationDto, userId, transactionAdapter);
  }
}