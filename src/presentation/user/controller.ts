import { handleError } from "../error";
import { UserRepository } from "#/domain";
import { Request, Response } from 'express';
import { CreateUser } from "#/domain/use-cases";
import { CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  createUser = async (req: Request, res: Response) => {
    const [errUserDto, createUserDto] = CreateUserDto.create(req.body);
    const [errPersonalInformationDto, createPersonalInformationDto] = await CreatePersonalInformationDto.create(req.body, this.userRepository);

    if (errUserDto) return res.status(400).json({ err: errUserDto });
    if (errPersonalInformationDto) return res.status(400).json({ err: errPersonalInformationDto });

    new CreateUser(this.userRepository)
      .execute(createUserDto!, createPersonalInformationDto!)
      .then((user) => res.status(201).json(user))
      .catch((err) => handleError(err, res));
  }
}