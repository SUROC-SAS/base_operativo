import { AuthDto } from "#/domain/dtos";
import { UserRepository } from "#/domain/repositories/user.repository";

interface AuthUseCase {
  execute(authDto: AuthDto): Promise<string>;
}

export class Auth implements AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(authDto: AuthDto): Promise<string> {
    const token = await this.userRepository.auth(authDto);
    return token;
  }
} 