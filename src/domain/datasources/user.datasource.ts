import { SaveUserDtos, User } from '../interfaces';

export abstract class UserDataSource {
  abstract createUser(createUserDtos: SaveUserDtos): Promise<User>;
  abstract updateUser(updateUserDtos: SaveUserDtos): Promise<User>;
}
