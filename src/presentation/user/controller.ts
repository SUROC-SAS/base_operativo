import { UserRepository } from "#/domain";
import { CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";
import { CreateUser } from "#/domain/use-cases";
import { Request, Response } from 'express';
import { handleError } from "../error";

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  createUser = (req: Request, res: Response) => {
    const [errUserDto, createUserDto] = CreateUserDto.create(req.body);
    const [errPersonalInformationDto, createPersonalInformationDto] = CreatePersonalInformationDto.create(req.body);

    if (errUserDto) return res.status(400).json({ err: errUserDto });
    if (errPersonalInformationDto) return res.status(400).json({ err: errPersonalInformationDto });

    new CreateUser(this.userRepository)
      .execute(createUserDto!, createPersonalInformationDto!)
      .then((user) => res.status(201).json(user))
      .catch((err) => handleError(err, res));
  }
}