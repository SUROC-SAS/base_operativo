import { UserDataSource, UserRepository } from '#/domain';
import { SaveUserDtos, SaveUserDtos, User } from '#/domain/interfaces';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  async createUser(createUserDtos: SaveUserDtos): Promise<User> {
    return this.userDataSource.createUser(createUserDtos);
  }

  async updateUser(updateUserDtos: SaveUserDtos): Promise<User> {
    return this.userDataSource.updateUser(updateUserDtos);
  }
}
