import { UserRepository } from "#/domain";
import { CreateAddressDto, CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";
import { CreateUser } from "#/domain/use-cases";
import { Request, Response } from 'express';
import { handleError } from "../error";

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  createUser = (req: Request, res: Response) => {
    const [errUserDto, createUserDto] = CreateUserDto.create(req.body);
    const [errAddressDto, createAddressDto] = CreateAddressDto.create(req.body?.address);
    const [errPersonalDto, createPersonalInformationDto] = CreatePersonalInformationDto.create(req.body?.personalInformation);

    const err = errUserDto || errPersonalDto || errAddressDto;
    if (err) {
      return res.status(400).json({ err });
    }

    new CreateUser(this.userRepository)
      .execute({
        createUserDto: createUserDto!,
        createAddressDto: createAddressDto!,
        createPersonalInformationDto: createPersonalInformationDto!
      })
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        handleError(err, res);
      });
  }
}