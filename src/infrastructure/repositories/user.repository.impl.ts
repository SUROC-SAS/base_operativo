import { UserDataSource, UserRepository } from '#/domain';
import { SaveUserDtos, UpdateUserDtos, User } from '#/domain/interfaces';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) { }

  async createUser(saveUserDtos: SaveUserDtos): Promise<User> {
    return this.userDataSource.createUser(saveUserDtos);
  }

  async updateUser(saveUserDtos: UpdateUserDtos): Promise<User> {
    return this.userDataSource.updateUser(saveUserDtos);
  }
}
