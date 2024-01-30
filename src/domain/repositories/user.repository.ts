import { SaveUserDtos, UpdateUserDtos, User } from '../interfaces';

export abstract class UserRepository {
  abstract createUser(saveUserDtos: SaveUserDtos): Promise<User>;
  abstract updateUser(saveUserDtos: UpdateUserDtos): Promise<User>;
}
