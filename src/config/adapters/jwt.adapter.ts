import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { envs } from '../envs';
import { User } from '#/domain/interfaces';
import { UjwtAdapter } from '#/domain/interfaces/adapters/jwt.adapter.interface';

const { SECRET } = envs;

export class JwtAdapter implements UjwtAdapter {
  async compare(passDb: string, passDto: string): Promise<boolean> {
    return bcrypt.compare(passDb, passDto);
  }

  generate(user: User) {
    const token = jwt.sign(
      {
        uid: user.uid,
        email: user.email.toLocaleLowerCase(),
      },
      SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '1y',
      }
    );

    return token;
  }
}