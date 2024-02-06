import { CreateUserDtos, User } from '#/domain/interfaces';
import { UserRepository } from '#/domain/repositories/user.repository';
import { MailService } from '#/domain/interfaces/services/email.service';
import { UserEntity } from '#/domain/entities/user/user.entity';
interface CreateUserUseCase {
  execute(createUserDtos: CreateUserDtos): Promise<User>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly emailService: MailService,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(createUserDtos: CreateUserDtos): Promise<UserEntity> {
    const user = await this.userRepository.createUser(createUserDtos);
    const template = this.emailService.prepareHtml('welcome', {
      fullName: user.getFullName(),
      resetLink: this.emailService.resetLink(),
    });

    this.emailService.sendEmail('Welcome to our platform', user.email, template);
    return user;
  }
}
