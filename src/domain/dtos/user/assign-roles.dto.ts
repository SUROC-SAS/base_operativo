import { GENERATOR, Validator } from '#/config/adapters/validator';
import { ValidateArray } from '#/domain/interfaces/adapters/validator.adapter.interface';
import { RolesCodes } from '#/domain/interfaces/user/roles';

interface Constructor {
  code: string;
}

export class AssignRoleDto {
  code: Constructor['code'];

  private constructor({ code }: Constructor) {
    this.code = code;
  }

  static create(input: string[]): [string?, Array<AssignRoleDto>?] {
    const [error, response] = Validator.validateArray<string[]>(this.getSchema(), input);
    if (error) return [error];
    return [undefined, response?.map((response) => new AssignRoleDto({ code: response }))];
  }

  static getSchema = (): ValidateArray<unknown> => GENERATOR.array(GENERATOR.string().oneOf(Object.values(RolesCodes)));
}
