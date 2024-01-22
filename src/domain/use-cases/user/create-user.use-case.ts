import { CreateUserDto } from "#/domain/dtos";
import { UserRepository } from "#/domain/repositories/user.repository";
import EmailService from "#/presentation/services/mail.service";

interface CreateUserUseCase {
  execute(registerUserDto: CreateUserDto, emailService: EmailService): Promise<unknown>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(registerUserDto: CreateUserDto): Promise<unknown> {
    const user = await this.userRepository.createUser(registerUserDto);

    ///use service para enviar email
    //  this.emailService.sendEmail();

    return user;
  }
}