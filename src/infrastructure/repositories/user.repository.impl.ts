import { UserDataSource, UserRepository } from "#/domain";
import { CreateUserDto } from "#/domain/dtos";
import { CreatePersonalInformationDto } from "#/domain/dtos/user/create-personalInformation.dto";
import { User } from "#/domain/interfaces";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) { }

  async createUser(userDto: CreateUserDto, personalInformationDto: CreatePersonalInformationDto): Promise<User> {
    return this.userDataSource.createUser(userDto, personalInformationDto);
  }
}