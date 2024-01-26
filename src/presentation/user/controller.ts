import { handleError } from '../error';
import { UserRepository } from '#/domain';
import { Request, Response } from 'express';
import { MailService } from '#/domain/interfaces/services/email.service';
import { CreateUser, RecoveryPassword, UpdatePassword } from '#/domain/use-cases';
import { CreateAddressDto, CreateContactInformationDto, CreatePersonalInformationDto, CreateUserDto, RecoveryPasswordDto, UpdatePasswordDto } from '#/domain/dtos';

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: MailService,
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

  recoveryPassword = (req: Request, res: Response) => {
    const [errRecoveryPasswordDto, recoveryPasswordDto] = RecoveryPasswordDto.validate(req.body);

    if (errRecoveryPasswordDto) return res.status(400).json({ err: errRecoveryPasswordDto });

    new RecoveryPassword(this.emailService, this.userRepository)
      .execute(recoveryPasswordDto!)
      .then((response) => res.status(201).send(response))
      .catch((err) => handleError(err, res));
  };

  updatePassword = (req: Request, res: Response) => {
    const [errUpdatePasswordDto, updatePasswordDto] = UpdatePasswordDto.updatePassword({ ...req.body, ...req.query });

    if (errUpdatePasswordDto) return res.status(400).json({ err: errUpdatePasswordDto });

    new UpdatePassword(this.userRepository)
      .execute(updatePasswordDto!)
      .then((response) => res.status(201).send(response))
      .catch((err) => handleError(err, res));
  };
}
