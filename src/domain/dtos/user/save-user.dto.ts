import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  email: string;
  password: string;
  active: boolean;
  lastAccess?: Date | null;
  emailValidate: boolean;
}

export class SaveUserDto {
  email: Constructor['email'];
  active: Constructor['active'];
  password: Constructor['password'];
  lastAccess: Constructor['lastAccess'];
  emailValidate: Constructor['emailValidate'];

  private constructor({ email, password, active = true, lastAccess = null, emailValidate = false }: Constructor) {
    this.email = email;
    this.active = active;
    this.password = password;
    this.lastAccess = lastAccess;
    this.emailValidate = emailValidate;
  }

  static save(object: Record<string, unknown>): [string?, SaveUserDto?] {
    const [error, response] = Validator.validateObject<SaveUserDto>(this.getSchema(), object);
    if (error) {
      return [error];
    }

    const { email, password } = response!;
    return [
      undefined,
      new SaveUserDto({
        email,
        password,
        active: true,
        emailValidate: false,
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