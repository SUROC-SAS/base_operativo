import { handleError } from "../error";
import { UserRepository } from "#/domain";
import { Request, Response } from 'express';
import { CreateUser } from "#/domain/use-cases";
import { CreateAssignedRoleDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  createUser = (req: Request, res: Response) => {
    const [errUserDto, createUserDto] = CreateUserDto.create(req.body);
    const [errPersonalDto, createPersonalInformationDto] = CreatePersonalInformationDto.create(req.body?.personalInformation);
    const [errContactDto, createContactInformationDto] = CreateContactInformationDto.create(req.body?.contactInformation);
    const [errAssignedRoleDto, createAssignedRoleDto] = CreateAssignedRoleDto.create(req.body);

    const err = errUserDto || errPersonalDto || errAssignedRoleDto || errContactDto;

    if (err) {
      return res.status(400).json({ err });
    }

    new CreateUser(this.userRepository)
      .execute({
        createUserDto: createUserDto!,
        createAssignedRoleDto: createAssignedRoleDto!,
        createContactInformationDto: createContactInformationDto!,
        createPersonalInformationDto: createPersonalInformationDto!,
      })
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        handleError(err, res);
      });
  }
}