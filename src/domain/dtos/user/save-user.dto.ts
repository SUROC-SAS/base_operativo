import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  id?: number;
  email: string;
  password: string;
  active: boolean;
  lastAccess?: Date | null;
  emailValidate: boolean;
}

export class SaveUserDto {
  id: Constructor['id'];
  email: Constructor['email'];
  active: Constructor['active'];
  password: Constructor['password'];
  lastAccess: Constructor['lastAccess'];
  emailValidate: Constructor['emailValidate'];

  private constructor({ id, email, password, active = true, lastAccess = null, emailValidate = false }: Constructor) {
    this.id = id;
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

    const { id, email, password } = response!;
    return [
      undefined,
      new SaveUserDto({
        id,
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
      id: GENERATOR.number().positive().nullable().default(null),
    };
  }

  validateUpdate(): string | null {
    const error: string[] = [];
    if (!this.id) error.push('Missing Id');

    if (error.length) {
      const message = new Intl.ListFormat('en').format(error);
      return message.toString();
    }

    return null;
  }
}
