import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  id: number;
  email: string;
}

export class UpdateUserDto {
  id: Constructor['id'];
  email: Constructor['email'];

  private constructor({ id, email }: Constructor) {
    this.id = id;
    this.email = email;
  }

  static save(object: Record<string, unknown>): [string?, UpdateUserDto?] {
    const [error, response] = Validator.validateObject<UpdateUserDto>(this.getSchema(), object);
    if (error) return [error];

    const { id, email } = response!;
    return [
      undefined,
      new UpdateUserDto({
        id,
        email,
      }),
    ];
  }

  static getSchema(): Record<string, unknown> {
    return {
      id: GENERATOR.number().positive().required(),
      email: GENERATOR.string().email().required(),
    };
  }
}
