import { User } from "../interfaces";
import { CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto } from "../dtos";
export abstract class UserDataSource {
  abstract createUser(createUserDto: CreateUserDto, personalInformationDto: CreatePersonalInformationDto, contactInformationDto: CreateContactInformationDto): Promise<User>;
}