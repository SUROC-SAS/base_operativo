import bcrypt from 'bcrypt';
import { UbcryptAdapter } from '#/domain/interfaces/adapters/bcrypt.adapter.interface';

export class BcryptAdapter implements UbcryptAdapter {
  encrypt(value: string, length = 10): string {
    return bcrypt.hashSync(value, length);
  }
  async compare(passDto: string, passDb: string,): Promise<boolean> {
    return bcrypt.compare(passDto, passDb);
  }
}