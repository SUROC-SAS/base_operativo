import { handleError } from "../error";
import { AuthDto } from "#/domain/dtos";
import { AuthRepository } from "#/domain";
import { Auth } from "#/domain/use-cases";
import { Request, Response } from 'express';

export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository,
  ) { }

  auth = (req: Request, res: Response) => {
    const [errAuthDto, authDto] = AuthDto.create(req.body);
    if (errAuthDto) return res.status(400).json({ errAuthDto });

    new Auth(this.authRepository)
      .execute(authDto!)
      .then((user) => res.status(201).json(user))
      .catch((err) => handleError(err, res));
  }
}