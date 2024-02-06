import { UserEntity } from '../entities/user/user.entity';
import { CreateUserDtos } from '../interfaces';

export abstract class UserRepository {
  abstract createUser(createUserDtos: CreateUserDtos): Promise<UserEntity>;
}
