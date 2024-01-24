import { handleError } from "../error";
import { UserRepository } from "#/domain";
import { Request, Response } from 'express';
import { CreateUser, Auth } from "#/domain/use-cases";
import { AuthDto, CreateAddressDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto } from "#/domain/dtos";

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  createUser = (req: Request, res: Response) => {
    const [errUserDto, createUserDto] = CreateUserDto.create(req.body);
    const [errAddressDto, createAddressDto] = CreateAddressDto.create(req.body?.address);
    const [errPersonalDto, createPersonalInformationDto] = CreatePersonalInformationDto.create(req.body?.personalInformation);
    const [errContactDto, createContactInformationDto] = CreateContactInformationDto.create(req.body?.contactInformation);

    const err = errUserDto || errPersonalDto || errAddressDto || errContactDto;
    if (err) {
      return res.status(400).json({ err });
    }

    new CreateUser(this.userRepository)
      .execute({
        createUserDto: createUserDto!,
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
  }

  auth = (req: Request, res: Response) => {
    const [errAuthDto, authDto] = AuthDto.create(req.body);

    if (errAuthDto) return res.status(400).json({ errAuthDto });

    new Auth(this.userRepository)
      .execute(authDto!)
      .then((user) => res.status(201).json(user))
      .catch((err) => handleError(err, res));
  }
}