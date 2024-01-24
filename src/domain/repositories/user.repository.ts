import { CreateUserDtos, User } from "../interfaces";

export abstract class UserRepository {
  abstract createUser(createUserDtos: CreateUserDtos): Promise<User>;
}