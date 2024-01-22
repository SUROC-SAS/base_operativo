import { ICreateUserDtos, User } from "../interfaces";

export abstract class UserRepository {
  abstract createUser(createUserDtos: ICreateUserDtos): Promise<User>;
}