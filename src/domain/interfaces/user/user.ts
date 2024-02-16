import { AssignRoleDto, CreateAddressDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto } from '#/domain/dtos';

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
