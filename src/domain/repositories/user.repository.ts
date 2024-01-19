import { User } from "../interfaces";
import { CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto } from "../dtos";

export abstract class UserRepository {
  abstract createUser(createUserDto: CreateUserDto, personalInformationDto: CreatePersonalInformationDto, contactInformationDto: CreateContactInformationDto): Promise<User>;
}