import { handleError } from '../error';
import { UserRepository } from '#/domain';
import { Request, Response } from 'express';
import { CreateUser, UpdateUser } from '#/domain/use-cases';
import { MailService } from '#/domain/interfaces/services/email.service';
import {
  SaveAddressDto,
  SaveContactInformationDto,
  SavePersonalInformationDto,
  SaveUserDto,
  UpdateAddressDto,
  UpdateContactInformationDto,
  UpdatePersonalInformationDto,
  UpdateUserDto,
} from '#/domain/dtos';

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: MailService
  ) {}

  createUser = (req: Request, res: Response) => {
    const [errUserDto, createUserDto] = SaveUserDto.create(req.body);
    const [errAddressDto, createAddressDto] = SaveAddressDto.create(req.body?.address);
    const [errPersonalDto, createPersonalInformationDto] = SavePersonalInformationDto.create(req.body?.personalInformation);
    const [errContactDto, createContactInformationDto] = SaveContactInformationDto.create(req.body?.contactInformation);

    const err = errUserDto || errPersonalDto || errAddressDto || errContactDto;
    if (err) {
      return res.status(400).json({ err });
    }

    new CreateUser(this.emailService, this.userRepository)
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
  };

  updateUser = (req: Request, res: Response) => {
    const [errUserDto, updateUserDto] = UpdateUserDto.update({ ...req.body, ...req.params });
    const [errAddressDto, updateAddressDto] = UpdateAddressDto.update(req.body?.address);
    const [errPersonalDto, updatePersonalInformationDto] = UpdatePersonalInformationDto.update(req.body?.personalInformation);
    const [errContactDto, updateContactInformationDto] = UpdateContactInformationDto.update(req.body?.contactInformation);

    const err = errUserDto || errPersonalDto || errAddressDto || errContactDto;
    if (err) {
      return res.status(400).json({ err });
    }

    new UpdateUser(this.userRepository)
      .execute({
        updateUserDto: updateUserDto!,
        updateAddressDto: updateAddressDto!,
        updateContactInformationDto: updateContactInformationDto!,
        updatePersonalInformationDto: updatePersonalInformationDto!,
      })
      .then((user) => res.status(201).json(user))
      .catch((err) => handleError(err, res));
  };
}
