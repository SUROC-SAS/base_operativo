import { TransactionAdapter } from "#/config/transaction";
import { UserDataSource, UserRepository } from "#/domain";
import { PersonTypeMapperModel } from "../mappers/user/person-type.mapper";
import { CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";
import { IdentificationMapperModel } from "../mappers/user/Identification.mapper";
import { TaxLiabilityMapperModel } from "../mappers/user/tax-liability.mapper";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) { }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return this.userDataSource.createUser(createUserDto);
  }

  async createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transaction: TransactionAdapter): Promise<any> {
    return this.userDataSource.createPersonalInformation(createPersonalInformationDto, userId, transaction);
  }

  async getPersonTypeById(id: number): Promise<PersonTypeMapperModel> {
    return this.userDataSource.getPersonTypeById(id);
  }

  async getTaxLiabilityById(id: number): Promise<TaxLiabilityMapperModel> {
    return this.userDataSource.getTaxLiabilityById(id);
  }

  async getIdentificationById(id: number): Promise<IdentificationMapperModel> {
    return this.userDataSource.getIdentificationById(id);
  }

  async validateExistence(documentNumber: number, identificationId: number, userId?: number): Promise<boolean> {
    return this.userDataSource.validateExistence(documentNumber, identificationId, userId);
  }
}