import { ICreateUserDtos, User } from "../interfaces";

export abstract class UserDataSource {
  abstract createUser(createUserDtos: ICreateUserDtos): Promise<User>;
}