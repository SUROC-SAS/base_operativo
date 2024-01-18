import { UserRepository } from "#/domain";
import { CreateUserDto } from "#/domain/dtos";
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

    const err = errUserDto || errPersonalDto;
    if (err) {
      return res.status(400).json({ err });
    }

    new CreateUser(this.userRepository)
      .execute(createUserDto!, createPersonalInformationDto!)
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        handleError(err, res);
      });
  }
}