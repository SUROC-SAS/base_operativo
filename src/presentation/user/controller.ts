import { UserRepository } from "#/domain";
import { CreateAssignedRoleDto, CreateUserDto } from "#/domain/dtos";
import { CreateUser } from "#/domain/use-cases";
import { Request, Response } from 'express';
import { handleError } from "../error";
import { CreatePersonalInformationDto } from "#/domain/dtos/user/create-personalInformation.dto";

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  createUser = (req: Request, res: Response) => {
    const [errUserDto, createUserDto] = CreateUserDto.create(req.body);
    const [errPersonalDto, createPersonalInformationDto] = CreatePersonalInformationDto.create(req.body?.personalInformation);
    const [errAssignedRoleDto, createAssignedRoleDto] = CreateAssignedRoleDto.create(req.body);

    const err = errUserDto || errPersonalDto || errAssignedRoleDto;
    if (err) {
      return res.status(400).json({ err });
    }

    new CreateUser(this.userRepository)
      .execute({
        createUserDto: createUserDto!,
        createPersonalInformationDto: createPersonalInformationDto!,
        createAssignedRoleDto: createAssignedRoleDto!
      })
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        handleError(err, res);
      });
  }
}