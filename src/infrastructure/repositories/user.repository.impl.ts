import { UserDataSource, UserRepository } from "#/domain";
import { ICreateUserDtos, User } from "#/domain/interfaces";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) { }

  async createUser(createUserDtos: ICreateUserDtos): Promise<User> {
    return this.userDataSource.createUser(createUserDtos);
  }
}