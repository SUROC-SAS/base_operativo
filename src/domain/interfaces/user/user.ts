import { Address } from "./address";
import { PersonalInformation } from "./personalInformation";
import { CreateAddressDto, CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

export interface User {
  id: number;
  email: string;
  personalInformation?: PersonalInformation
  address?: Address
};

export interface ICreateUserDtos {
  createUserDto: CreateUserDto,
  createAddressDto: CreateAddressDto,
  createPersonalInformationDto: CreatePersonalInformationDto,
}