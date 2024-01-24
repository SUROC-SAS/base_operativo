import { Address } from "./address";
import { AssignedRole } from "./assigned-role";
import { ContactInformation } from "./contactInformation";
import { PersonalInformation } from "./personalInformation";
import { CreateAddressDto, CreateAssignedRoleDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

export interface User {
  id: number;
  email: string;
  address?: Address;
  assignedRoles?: AssignedRole[];
  contactInformation?: ContactInformation;
  personalInformation?: PersonalInformation;
};

export interface CreateUserDtos {
  createUserDto: CreateUserDto,
  createAddressDto: CreateAddressDto,
  createAssignedRoleDto: CreateAssignedRoleDto,
  createContactInformationDto: CreateContactInformationDto,
  createPersonalInformationDto: CreatePersonalInformationDto,
};
