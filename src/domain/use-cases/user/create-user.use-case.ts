import { UserRepository } from "#/domain/repositories/user.repository";
import { CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

interface CreateUserUseCase {
  execute(registerUserDto: CreateUserDto, registerPersonalInformationDto: CreatePersonalInformationDto): Promise<any>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(registerUserDto: CreateUserDto, registerPersonalInformationDto: CreatePersonalInformationDto): Promise<any> {
    const userCreated = await this.userRepository.createUser(registerUserDto);
    const personalInformation = await this.userRepository.createPersonalInformation(registerPersonalInformationDto, userCreated.user.id, userCreated.transaction);

    return { ...userCreated.user, personalInformation };
  }
}