import jwt from 'jsonwebtoken';
import { envs } from '../envs';
import { JWTAdapter } from '#/domain/interfaces/adapters/jwt.adapter.interface';

const { SECRET } = envs;
export class JwtAdapter implements JWTAdapter {
  generate(data: Record<string, unknown>, duration: string = '1y') {
    const token = jwt.sign(
      {
        uid: data.uid,
        email: (<string>data?.email)?.toLocaleLowerCase(),
      },
      SECRET,
      {
        algorithm: 'HS256',
        expiresIn: duration,
      }
    );

    return token;
  }

  verify(token: string): Record<string, unknown> {
    return jwt.verify(token, SECRET) as Record<string, unknown>;
  }
}
