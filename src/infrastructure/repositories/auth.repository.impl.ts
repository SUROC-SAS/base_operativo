import { AuthDto } from '#/domain/dtos';
import { AuthDataSource, AuthRepository } from '#/domain';
import { User } from '#/domain/interfaces';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) { }

  async auth(authDto: AuthDto): Promise<string> {
    return this.authDataSource.auth(authDto);
  }

  authWithToken(decoded: Record<string, unknown>): Promise<User> {
    return this.authDataSource.authWithToken(decoded);
  }
}
