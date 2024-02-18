import { UpdateUserDtos, User } from '#/domain/interfaces';
import { UserRepository } from '#/domain/repositories/user.repository';
import { UserEntity } from '#/domain/entities/user/user.entity';

interface UpdateUserUseCase {
  execute(updateUserDto: UpdateUserDtos): Promise<User>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(updateUserDto: UpdateUserDtos): Promise<UserEntity> {
    const user = await this.userRepository.updateUser(updateUserDto);
    return user;
  }
}
