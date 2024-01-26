import { AuthDto } from '../dtos';
import { User } from '../interfaces';

export abstract class AuthDataSource {
  abstract auth(authDto: AuthDto): Promise<string>;
  abstract authWithToken(decoded: Record<string, unknown>): Promise<User>;
}
