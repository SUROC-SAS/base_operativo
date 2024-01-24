import { AuthDto } from "../dtos";
import { CreateUserDtos, User } from "../interfaces";

export abstract class UserDataSource {
  abstract createUser(createUserDtos: CreateUserDtos): Promise<User>;
  abstract auth(authDto: AuthDto): Promise<string>;
}