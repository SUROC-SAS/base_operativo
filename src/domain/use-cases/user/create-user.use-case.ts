import { User } from "#/domain/interfaces";
import { UserRepository } from "#/domain/repositories/user.repository";
import { CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

interface CreateUserUseCase {
  execute(registerUserDto: CreateUserDto, personalInformationDto: CreatePersonalInformationDto, contactInformationDto: CreateContactInformationDto): Promise<User>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(registerUserDto: CreateUserDto, personalInformationDto: CreatePersonalInformationDto, contactInformationDto: CreateContactInformationDto): Promise<User> {
    const user = await this.userRepository.createUser(registerUserDto, personalInformationDto, contactInformationDto);
    return user;
  }
} 