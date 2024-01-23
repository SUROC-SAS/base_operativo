import { AssignedRole } from "./assigned-role";
import { ContactInformation } from "./contactInformation";
import { PersonalInformation } from "./personalInformation";
import { CreateAssignedRoleDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

export interface User {
  id: number;
  email: string;
  assignedRoles?: AssignedRole[]
  contactInformation?: ContactInformation;
  personalInformation?: PersonalInformation;
};

export interface ICreateUserDtos {
  createUserDto: CreateUserDto,
  createAssignedRoleDto: CreateAssignedRoleDto,
  createContactInformationDto: CreateContactInformationDto,
  createPersonalInformationDto: CreatePersonalInformationDto,
};
