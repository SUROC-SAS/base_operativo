import { handleError } from '../error';
import { UserRepository } from '#/domain';
import { Request, Response } from 'express';
import { CreateUser, UpdateUser } from '#/domain/use-cases';
import { MailService } from '#/domain/interfaces/services/email.service';
import {
  SaveUserDto,
  SaveAddressDto,
  SaveContactInformationDto,
  SavePersonalInformationDto,
} from '#/domain/dtos';

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: MailService
  ) { }

  createUser = (req: Request, res: Response) => {
    const [errUserDto, saveUserDto] = SaveUserDto.save(req.body);
    const [errAddressDto, saveAddressDto] = SaveAddressDto.save(req.body?.address);
    const [errPersonalDto, savePersonalInformationDto] = SavePersonalInformationDto.save(req.body?.personalInformation);
    const [errContactDto, saveContactInformationDto] = SaveContactInformationDto.save(req.body?.contactInformation);

    const err = errUserDto || errPersonalDto || errAddressDto || errContactDto;
    if (err) {
      return res.status(400).json({ err });
    }

    new CreateUser(this.emailService, this.userRepository)
      .execute({
        saveUserDto: saveUserDto!,
        saveAddressDto: saveAddressDto!,
        saveContactInformationDto: saveContactInformationDto!,
        savePersonalInformationDto: savePersonalInformationDto!,
      })
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        handleError(err, res);
      });
  };

  updateUser = (req: Request, res: Response) => {
    const [errUserDto, saveUserDto] = SaveUserDto.save({ ...req.body, ...req.params });
    const [errAddressDto, saveAddressDto] = SaveAddressDto.save(req.body?.address);
    const [errPersonalDto, savePersonalInformationDto] = SavePersonalInformationDto.save(req.body?.personalInformation);
    const [errContactDto, saveContactInformationDto] = SaveContactInformationDto.save(req.body?.contactInformation);

    const err = errUserDto || errPersonalDto || errAddressDto || errContactDto;
    if (err) {
      return res.status(400).json({ err });
    }

    new UpdateUser(this.userRepository)
      .execute({
        saveUserDto: saveUserDto!,
        saveAddressDto: saveAddressDto!,
        saveContactInformationDto: saveContactInformationDto!,
        savePersonalInformationDto: savePersonalInformationDto!,
      })
      .then((user) => res.status(201).json(user))
      .catch((err) => handleError(err, res));
  };
}
