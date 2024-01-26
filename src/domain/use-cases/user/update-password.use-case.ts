import { UpdatePasswordDto } from '#/domain/dtos';
import { UserRepository } from '#/domain/repositories/user.repository';

interface UpdatePasswordUseCase {
  execute(updatePasswordDto: UpdatePasswordDto): Promise<string>;
}

export class UpdatePassword implements UpdatePasswordUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(updatePasswordDto: UpdatePasswordDto): Promise<string> {
    await this.userRepository.updatePassword(updatePasswordDto);

    return 'Contraseña actualizada con exito.';
  }
}
