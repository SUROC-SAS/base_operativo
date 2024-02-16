import { handleError } from '../error';
import { UserRepository } from '#/domain';
import { Request, Response } from 'express';
import { CreateUser } from '#/domain/use-cases';
import { AssignRoleDto, CreateAddressDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto } from '#/domain/dtos';

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
}
