import { envs } from '#/config';
import { RecoveryPasswordDto } from '#/domain/dtos';
import { UserRepository } from '#/domain/repositories/user.repository';
import { MailService } from '#/domain/interfaces/services/email.service';

const { API_URL } = envs;

interface RecoveryPasswordUseCase {
  execute(recoveryPassword: RecoveryPasswordDto): Promise<string>;
}

export class RecoveryPassword implements RecoveryPasswordUseCase {
  constructor(
    private readonly emailService: MailService,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(recoveryPassword: RecoveryPasswordDto): Promise<string> {
    const { user, token } = await this.userRepository.recoveryPassword(recoveryPassword);
    const data = {
      fullName: `${user.personalInformation?.firstName} ${user.personalInformation?.firstSurname}`,
      link: `${API_URL}/portal/user/update-password?token=${token.token}`,
    };
    const html = this.emailService.prepareHtml('recoverPassword', data);

    await this.emailService.sendEmail('Cambio de contraseña.', [user.email], html);

    return 'mensaje de recuperación enviado, por favor revise su correo electrónico.';
  }
}
