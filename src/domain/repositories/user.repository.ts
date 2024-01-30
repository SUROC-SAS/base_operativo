import { SaveUserDtos, SaveUserDtos, User } from '../interfaces';

export abstract class UserRepository {
  abstract createUser(createUserDtos: SaveUserDtos): Promise<User>;
  abstract updateUser(updateUserDtos: SaveUserDtos): Promise<User>;
}
