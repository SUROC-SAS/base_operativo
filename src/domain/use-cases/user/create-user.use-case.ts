import { CreateUserDtos, User } from '#/domain/interfaces';
import EmailService from '#/presentation/services/email.service';
import { UserRepository } from '#/domain/repositories/user.repository';
interface CreateUserUseCase {
  execute(createUserDtos: CreateUserDtos): Promise<User>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(createUserDtos: CreateUserDtos): Promise<User> {
    const user = await this.userRepository.createUser(createUserDtos);
    return user;
  }
}
