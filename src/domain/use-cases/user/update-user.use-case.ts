import { SaveUserDtos, User } from '#/domain/interfaces';
import { UserRepository } from '#/domain/repositories/user.repository';

interface UpdateUserUseCase {
  execute(saveUserDtos: SaveUserDtos): Promise<User>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(saveUserDtos: SaveUserDtos): Promise<User> {
    const user = await this.userRepository.updateUser(saveUserDtos);
    return user;
  }
}
