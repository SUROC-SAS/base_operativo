import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  email: string;
  password: string;
}

export class AuthDto {
  email: Constructor['email'];
  password: Constructor['password'];

  private constructor({ email, password }: Constructor) {
    this.email = email;
    this.password = password;
  }

  static create(object: Record<string, unknown>): [string?, AuthDto?] {
    const [error, response] = Validator.validateObject<AuthDto>(this.getSchema(), object);
    if (error) {
      return [error];
    }

    const { email, password } = response!;
    return [
      undefined,
      new AuthDto({
        email,
        password,
      }),
    ];
  }

  static getSchema(): Record<string, unknown> {
    return {
      email: GENERATOR.string().email().required(),
      password: GENERATOR.string().min(8).required(),
    };
  }
}
