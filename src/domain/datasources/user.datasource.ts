import { SaveUserDtos, User } from '../interfaces';

export abstract class UserDataSource {
  abstract createUser(saveUserDtos: SaveUserDtos): Promise<User>;
  abstract updateUser(saveUserDtos: SaveUserDtos): Promise<User>;
}
