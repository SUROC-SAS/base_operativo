import { UserDataSource, UserRepository } from '#/domain';
import { CreateUserDtos, RecoveryPassword, User } from '#/domain/interfaces';
import { UpdatePasswordDto, RecoveryPasswordDto } from '#/domain/dtos';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) { }

  async createUser(createUserDtos: CreateUserDtos): Promise<User> {
    return this.userDataSource.createUser(createUserDtos);
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<void> {
    return this.userDataSource.updatePassword(updatePasswordDto);
  }

  async recoveryPassword(recoveryPasswordDto: RecoveryPasswordDto): Promise<RecoveryPassword> {
    return this.userDataSource.recoveryPassword(recoveryPasswordDto);
  }
}
