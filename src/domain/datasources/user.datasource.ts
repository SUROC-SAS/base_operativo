import { UserEntity } from '../entities/user/user.entity';
import { CreateUserDtos } from '../interfaces';
export abstract class UserDataSource {
  abstract createUser(createUserDtos: CreateUserDtos): Promise<UserEntity>;
}
