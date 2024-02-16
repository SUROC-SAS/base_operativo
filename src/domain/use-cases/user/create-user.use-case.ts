import { CreateUserDtos, User } from '#/domain/interfaces';
import { UserRepository } from '#/domain/repositories/user.repository';
import { UserEntity } from '#/domain/entities/user/user.entity';
interface CreateUserUseCase {
  execute(createUserDtos: CreateUserDtos): Promise<User>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDtos: CreateUserDtos): Promise<UserEntity> {
    const user = await this.userRepository.createUser(createUserDtos);
    return user;
  }
}
