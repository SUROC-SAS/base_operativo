import { AuthDto } from '../dtos';

export abstract class AuthRepository {
  abstract auth(authDto: AuthDto): Promise<string>;
}
