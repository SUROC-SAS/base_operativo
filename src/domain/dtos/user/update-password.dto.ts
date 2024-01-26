import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  token: string;
  password: string;
}

export class UpdatePasswordDto {
  token: Constructor['token'];
  password: Constructor['password'];

  private constructor({ password, token }: Constructor) {
    this.token = token;
    this.password = password;
  }

  static updatePassword(object: Record<string, unknown>): [string?, UpdatePasswordDto?] {
    const [error, response] = Validator.validateObject<UpdatePasswordDto>(this.getSchema(), object);
    if (error) return [error];

    const { token, password } = response!;

    return [
      undefined,
      new UpdatePasswordDto({ token, password }),
    ];
  }

  static getSchema = (): Record<string, unknown> => ({
    token: GENERATOR.string().trim().required(),
    password: GENERATOR.string().trim().min(8).required(),
  });
}
