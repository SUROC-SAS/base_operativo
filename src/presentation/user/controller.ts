import { UserRepository } from "#/domain";
import { CreateUserDto } from "#/domain/dtos";
import { CreateUser } from "#/domain/use-cases";
import { Request, Response } from 'express';
import { handleError } from "../error";

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  createUser = (req: Request, res: Response) => {
    const [err, createUserDto] = CreateUserDto.create(req.body);
    if (err) {
      return res.status(400).json({ err });
    }

    new CreateUser(this.userRepository)
      .execute(createUserDto!)
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        handleError(err, res);
      });
  }
}