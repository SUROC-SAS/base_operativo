import { UserDataSource, UserRepository } from "#/domain";
import { AuthDto } from "#/domain/dtos";
import { CreateUserDtos, User } from "#/domain/interfaces";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) { }

  async auth(authDto: AuthDto): Promise<string> {
    return this.userDataSource.auth(authDto);
  }

  async createUser(createUserDtos: CreateUserDtos): Promise<User> {
    return this.userDataSource.createUser(createUserDtos);
  }
}