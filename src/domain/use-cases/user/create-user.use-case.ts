import { User } from "#/domain";
import { UserRepository } from "#/domain/repositories/user.repository";
import { CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

interface CreateUserUseCase {
  execute(registerUserDto: CreateUserDto, registerPersonalInformationDto: CreatePersonalInformationDto): Promise<User>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(registerUserDto: CreateUserDto, registerPersonalInformationDto: CreatePersonalInformationDto): Promise<User> {
    const userCreated = await this.userRepository.createUser(registerUserDto);
    const personalInformation = await this.userRepository.createPersonalInformation(registerPersonalInformationDto, userCreated.user.id, userCreated.transactionAdapter);

    await userCreated.transactionAdapter.commit(userCreated.transactionAdapter.transaction);

    return { ...userCreated.user, personalInformation };
  }
}