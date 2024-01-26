import { Token } from './token';
import { Address } from './address';
import { ContactInformation } from './contactInformation';
import { PersonalInformation } from './personalInformation';
import { CreateAddressDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto } from '#/domain/dtos';

export interface User {
  id: number;
  uid: string;
  email: string;
  address?: Address;
  contactInformation?: ContactInformation;
  personalInformation?: PersonalInformation;
}

export interface CreateUserDtos {
  createUserDto: CreateUserDto;
  createAddressDto: CreateAddressDto;
  createContactInformationDto: CreateContactInformationDto;
  createPersonalInformationDto: CreatePersonalInformationDto;
}

export interface RecoveryPassword {
  user: User,
  token: Token
}