import { SaveUserDtos, UpdateUserDtos, User } from '../interfaces';

export abstract class UserDataSource {
  abstract createUser(saveUserDtos: SaveUserDtos): Promise<User>;
  abstract updateUser(saveUserDtos: UpdateUserDtos): Promise<User>;
}
