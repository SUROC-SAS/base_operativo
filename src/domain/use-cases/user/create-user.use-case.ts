import { SaveUserDtos, User } from '#/domain/interfaces';
import { UserRepository } from '#/domain/repositories/user.repository';
import { MailService } from '#/domain/interfaces/services/email.service';
interface CreateUserUseCase {
  execute(createUserDtos: SaveUserDtos): Promise<User>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly emailService: MailService,
    private readonly userRepository: UserRepository
  ) {}

  async execute(createUserDtos: SaveUserDtos): Promise<User> {
    const user = await this.userRepository.createUser(createUserDtos);
    return user;
  }
}
