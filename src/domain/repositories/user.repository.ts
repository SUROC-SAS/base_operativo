import { TransactionAdapter } from "#/config/transaction";
import { UserMapperModel } from "#/infrastructure/mappers";
import { CreatePersonalInformationDto, CreateUserDto } from "../dtos";
import { PersonTypeMapperModel } from "#/infrastructure/mappers/user/person-type.mapper";
import { IdentificationMapperModel } from "#/infrastructure/mappers/user/Identification.mapper";
import { TaxLiabilityMapperModel } from "#/infrastructure/mappers/user/tax-liability.mapper";
import { PersonalInformationMapperModel } from "#/infrastructure/mappers/user/personal-information.mapper";

interface createdUserResult {
  user: UserMapperModel,
  transactionAdapter: TransactionAdapter
}

export abstract class UserRepository {
  abstract createUser(createUserDto: CreateUserDto): Promise<createdUserResult>;
  abstract createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<PersonalInformationMapperModel>;
  abstract getPersonTypeById(id: number): Promise<PersonTypeMapperModel>;
  abstract getTaxLiabilityById(id: number): Promise<TaxLiabilityMapperModel>;
  abstract getIdentificationById(id: number): Promise<IdentificationMapperModel>;
  abstract validateExistence(documentNumber: number, identificationId: number, userId?: number): Promise<boolean>;
}