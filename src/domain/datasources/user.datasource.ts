import { CreateUserDtos, User } from "../interfaces";

export abstract class UserDataSource {
  abstract createUser(createUserDtos: CreateUserDtos): Promise<User>;
}