import { GENERATOR, Validator } from '#/config/adapters/validator';

interface Constructor {
  id: number;
  email: string;
  active?: boolean;
}

export class UpdateUserDto {
  id: Constructor['id'];
  email: Constructor['email'];
  active: Constructor['active'];
  private constructor({ id, email, active }: Constructor) {
    this.id = id;
    this.email = email;
    this.active = active;
  }

  static create(object: Record<string, unknown>): [string?, UpdateUserDto?] {
    const [error, response] = Validator.validateObject<UpdateUserDto>(this.getSchema(), object);
    if (error) {
      return [error];
    }

    const { id, email, active } = response!;
    return [
      undefined,
      new UpdateUserDto({
        id,
        email,
        active,
      }),
    ];
  }

  static getSchema(): Record<string, unknown> {
    return {
      id: GENERATOR.number().required(),
      email: GENERATOR.string().email().required(),
      active: GENERATOR.boolean().optional(),
    };
  }
}
