import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  email: string;
}

export class RecoveryPasswordDto {
  email: Constructor['email'];

  private constructor({ email }: Constructor) {
    this.email = email;
  }

  static validate(object: Record<string, unknown>): [string?, RecoveryPasswordDto?] {
    const [error, response] = Validator.validateObject<RecoveryPasswordDto>(this.getSchema(), object);
    if (error) return [error];

    const { email } = response!;

    return [
      undefined,
      new RecoveryPasswordDto({ email }),
    ];
  }

  static getSchema = (): Record<string, unknown> => ({
    email: GENERATOR.string().email().required(),
  });
}
