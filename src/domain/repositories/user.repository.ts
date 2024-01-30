import { SaveUserDtos, User } from '../interfaces';

export abstract class UserRepository {
  abstract createUser(saveUserDtos: SaveUserDtos): Promise<User>;
  abstract updateUser(saveUserDtos: SaveUserDtos): Promise<User>;
}
