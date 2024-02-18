import { AssignRoleDto, CreateAddressDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto, UpdateUserDto } from '#/domain/dtos';

export interface User {
  id: number;
  uid: string;
  email: string;
}

export interface CreateUserDtos {
  createUserDto: CreateUserDto;
  assignRolesDto: AssignRoleDto[];
  createAddressDto: CreateAddressDto;
  createContactInformationDto: CreateContactInformationDto;
  createPersonalInformationDto: CreatePersonalInformationDto;
}

export interface UpdateUserDtos {
  updateUserDto: UpdateUserDto;
  assignRolesDto?: AssignRoleDto[];
  createAddressDto: CreateAddressDto;
  createContactInformationDto: CreateContactInformationDto;
  createPersonalInformationDto: CreatePersonalInformationDto;
}