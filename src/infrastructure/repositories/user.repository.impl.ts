import { User } from "#/domain/interfaces";
import { UserDataSource, UserRepository } from "#/domain";
import { CreateContactInformationDto, CreateUserDto } from "#/domain/dtos";
import { CreatePersonalInformationDto } from "#/domain/dtos/user/create-personalInformation.dto";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) { }

  async createUser(userDto: CreateUserDto, personalInformationDto: CreatePersonalInformationDto, contactInformationDto: CreateContactInformationDto): Promise<User> {
    return this.userDataSource.createUser(userDto, personalInformationDto, contactInformationDto);
  }
}