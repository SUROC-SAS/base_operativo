import { AuthDto } from '#/domain/dtos';
import { AuthRepository } from '#/domain/repositories/auth.repository';

interface AuthUseCase {
  execute(authDto: AuthDto): Promise<{
    token: string
  }>;
}

export class Auth implements AuthUseCase {
  constructor(private readonly authRepository: AuthRepository) { }

  async execute(authDto: AuthDto): Promise<{
    token: string,
  }> {
    const token = await this.authRepository.auth(authDto);
    return {
      token,
    };
  }
}
