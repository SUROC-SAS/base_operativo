import { RecoveryPasswordDto, UpdatePasswordDto } from '../dtos';
import { CreateUserDtos, RecoveryPassword, User } from '../interfaces';

export abstract class UserDataSource {
  abstract createUser(createUserDtos: CreateUserDtos): Promise<User>;
  abstract updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<void>;
  abstract recoveryPassword(recoveryPasswordDto: RecoveryPasswordDto): Promise<RecoveryPassword>;
}
