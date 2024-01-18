import { User } from "../interfaces";
import { CreateUserDto } from "../dtos";
import { CreatePersonalInformationDto } from "../dtos/user/create-personalInformation.dto";
export abstract class UserDataSource {
  abstract createUser(createUserDto: CreateUserDto, personalInformationDto: CreatePersonalInformationDto): Promise<User>;
}