import bcrypt from 'bcrypt';
import { UbcryptAdapter } from '#/domain/interfaces/adapters/bcrypt.adapter.interface';

export class BcryptAdapter implements UbcryptAdapter {
  encrypt(value: string, length = 10): string {
    return bcrypt.hashSync(value, length);
  }
  async compare(passDb: string, passDto: string): Promise<boolean> {
    return bcrypt.compare(passDb, passDto);
  }
}