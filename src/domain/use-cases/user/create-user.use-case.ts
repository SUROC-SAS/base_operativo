import { CreateUserDto } from "#/domain/dtos";
import { UserRepository } from "#/domain/repositories/user.repository";

interface CreateUserUseCase {
  execute(registerUserDto: CreateUserDto): Promise<unknown>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(registerUserDto: CreateUserDto): Promise<unknown> {
    const user = await this.userRepository.createUser(registerUserDto);
    return user;
  }
}