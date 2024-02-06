import { AuthDto } from '../dtos';
import { UserEntity } from '../entities/user/user.entity';

export abstract class AuthRepository {
  abstract auth(authDto: AuthDto): Promise<string>;
  abstract authWithToken(decoded: Record<string, unknown>): Promise<UserEntity>;
}
