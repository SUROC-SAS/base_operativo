import { AuthDto } from "#/domain/dtos";
import { AuthDataSource, AuthRepository } from "#/domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly userDataSource: AuthDataSource) { }

  async auth(authDto: AuthDto): Promise<string> {
    return this.userDataSource.auth(authDto);
  }
}