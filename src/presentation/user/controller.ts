import { handleError } from '../error';
import { UserRepository } from '#/domain';
import { Request, Response } from 'express';
import { CreateUser, UpdateUser } from '#/domain/use-cases';
import { AssignRoleDto, CreateAddressDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto, UpdateUserDto } from '#/domain/dtos';
import { AppRequest } from '#/infrastructure/interfaces';
import { RolesCodes } from '#/domain/interfaces';

export class UserController {
  constructor(private readonly userRepository: UserRepository) { }

  createUser = (req: Request, res: Response) => {
    const [errUserDto, createUserDto] = CreateUserDto.create(req.body);
    const [errAddressDto, createAddressDto] = CreateAddressDto.create(req.body?.address);
    const [errAssignRoleDto, assignRolesDto] = AssignRoleDto.create(req.body?.roles);
    const [errPersonalDto, createPersonalInformationDto] = CreatePersonalInformationDto.create(req.body?.personalInformation);
    const [errContactDto, createContactInformationDto] = CreateContactInformationDto.create(req.body?.contactInformation);

    const err = errUserDto || errAssignRoleDto || errPersonalDto || errAddressDto || errContactDto;
    if (err) {
      return res.status(400).json({ err });
    }

    new CreateUser(this.userRepository)
      .execute({
        createUserDto: createUserDto!,
        assignRolesDto: assignRolesDto!,
        createAddressDto: createAddressDto!,
        createContactInformationDto: createContactInformationDto!,
        createPersonalInformationDto: createPersonalInformationDto!,
      })
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        handleError(err, res);
      });
  };

  updateUser = (req: Request, res: Response) => {
    const user = (req as AppRequest).user;
    const is_admin = user.roles!.some((role) => role.code === RolesCodes.GERENCIA);

    let [errAssignRoleDto, assignRolesDto]: [string?, AssignRoleDto[]?] = [undefined, undefined];
    const [errUserDto, updateUserDto] = UpdateUserDto.create(req.body);
    const [errAddressDto, createAddressDto] = CreateAddressDto.create(req.body?.address);
    const [errPersonalDto, createPersonalInformationDto] = CreatePersonalInformationDto.create(req.body?.personalInformation);
    const [errContactDto, createContactInformationDto] = CreateContactInformationDto.create(req.body?.contactInformation);

    if (req.body?.roles && is_admin) {
      [errAssignRoleDto, assignRolesDto] = AssignRoleDto.create(req.body?.roles);
    }

    const err = errUserDto || errAssignRoleDto || errPersonalDto || errAddressDto || errContactDto;
    if (err) {
      return res.status(400).json({ err });
    }

    new UpdateUser(this.userRepository)
      .execute({
        updateUserDto: updateUserDto!,
        assignRolesDto: assignRolesDto!,
        createAddressDto: createAddressDto!,
        createContactInformationDto: createContactInformationDto!,
        createPersonalInformationDto: createPersonalInformationDto!,
      })
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        handleError(err, res);
      });
  };
}
