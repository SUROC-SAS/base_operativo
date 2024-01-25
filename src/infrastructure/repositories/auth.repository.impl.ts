import { AuthDto } from '#/domain/dtos';
import { AuthDataSource, AuthRepository } from '#/domain';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) { }

  async auth(authDto: AuthDto): Promise<string> {
    return this.authDataSource.auth(authDto);
  }
}
