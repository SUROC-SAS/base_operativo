import { CreateUserDto } from "#/domain/dtos";
import { CreatePersonalInformationDto } from "#/domain/dtos/user/create-personalInformation.dto";
import { User } from "#/domain/interfaces";
import { UserRepository } from "#/domain/repositories/user.repository";

interface CreateUserUseCase {
  execute(registerUserDto: CreateUserDto, personalInformationDto: CreatePersonalInformationDto): Promise<User>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(registerUserDto: CreateUserDto, personalInformationDto: CreatePersonalInformationDto): Promise<User> {
    const user = await this.userRepository.createUser(registerUserDto, personalInformationDto);
    return user;
  }
}