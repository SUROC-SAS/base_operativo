import { AuthDto } from "../dtos";
import { CreateUserDtos, User } from "../interfaces";

export abstract class UserRepository {
  abstract createUser(createUserDtos: CreateUserDtos): Promise<User>;
  abstract auth(authDto: AuthDto): Promise<string>;
}