import { UserDataSource, UserRepository } from '#/domain';
import { CreateUserDtos, User } from '#/domain/interfaces';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  async createUser(createUserDtos: CreateUserDtos): Promise<User> {
    return this.userDataSource.createUser(createUserDtos);
  }
}
