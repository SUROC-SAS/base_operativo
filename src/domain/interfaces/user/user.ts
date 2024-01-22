import { AssignedRole } from "./assigned-role";
import { PersonalInformation } from "./personalInformation";
import { CreateAssignedRoleDto, CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

export interface User {
  id: number;
  email: string;
  personalInformation?: PersonalInformation
  assignedRoles?: AssignedRole[]
};

export interface ICreateUserDtos {
  createUserDto: CreateUserDto,
  createAssignedRoleDto: CreateAssignedRoleDto,
  createPersonalInformationDto: CreatePersonalInformationDto,
}