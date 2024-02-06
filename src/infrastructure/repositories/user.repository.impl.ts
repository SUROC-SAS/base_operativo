import { UserDataSource, UserRepository } from '#/domain';
import { UserEntity } from '#/domain/entities/user/user.entity';
import { CreateUserDtos } from '#/domain/interfaces';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) { }

  async createUser(createUserDtos: CreateUserDtos): Promise<UserEntity> {
    return this.userDataSource.createUser(createUserDtos);
  }
}
