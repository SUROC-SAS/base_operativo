
import jwt from 'jsonwebtoken';
import { envs } from '../envs';
import { User } from '#/domain/interfaces';
import { UjwtAdapter } from '#/domain/interfaces/adapters/jwt.adapter.interface';

const { SECRET } = envs;

export class JwtAdapter implements UjwtAdapter {
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