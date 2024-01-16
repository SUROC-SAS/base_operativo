import { CreateUserDto } from "../dtos";
import { TransactionAdapter } from "#/config/transaction";
import { PersonTypeMapperModel } from "#/infrastructure/mappers/user/person-type.mapper";
import { CreatePersonalInformationDto } from "../dtos/user/create-personal-information.dto";
import { IdentificationMapperModel } from "#/infrastructure/mappers/user/Identification.mapper";
import { TaxLiabilityMapperModel } from "#/infrastructure/mappers/user/tax-liability.mapper";

export abstract class UserDataSource {
  abstract createUser(createUserDto: CreateUserDto): Promise<any>;
  abstract createPersonalInformation(createPersonalInformationDto: CreatePersonalInformationDto, userId: number, transactionAdapter: TransactionAdapter): Promise<any>;
  abstract getPersonTypeById(id: number): Promise<PersonTypeMapperModel>;
  abstract getTaxLiabilityById(id: number): Promise<TaxLiabilityMapperModel>;
  abstract getIdentificationById(id: number): Promise<IdentificationMapperModel>;
  abstract validateExistence(documentNumber: number, identificationId: number, userId?: number): Promise<boolean>
}