import { UserEntity } from '../entities/user/user.entity';
import { CreateUserDtos, UpdateUserDtos } from '../interfaces';

export abstract class UserRepository {
  abstract createUser(createUserDtos: CreateUserDtos): Promise<UserEntity>;
  abstract updateUser(updateUserDtos: UpdateUserDtos): Promise<UserEntity>;
}
